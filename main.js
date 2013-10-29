/*globals jQuery*/

(function ($) {
    'use strict';

    var cache = {},
        tree = {};

    function getUser(url, parentNode, callback) {
        if (cache.hasOwnProperty(url)) {
            callback(cache[url], parentNode);
            return;
        }

        $.get(url, function (document) {
            var $document = $(document),
                user = {
                    url: url,
                    name: $document.find('h2.username').text(),
                    img: $document.find('img[alt="avatar"]').attr('src'),
                    parent: $document.find('#invited-by').attr('href'),
                    children: $document.find('[rel="friend"]').map(function() {
                        return $(this).attr('href');
                    })
                };

            cache[url] = user;

            callback(user, parentNode);
        });
    }

    function getUserCallback(user, parentNode) {
        var i;

        parentNode[user.url] = {};

        $('body').trigger('new_node', user);

        for (i = 0; i < user.children.length; i += 1) {
            getUser(user.children[i], parentNode[user.url], getUserCallback);
        }
    }

    function findRoot(url, callback) {
        getUser(url, {}, function(user) {
            if (user.parent) {
                findRoot(user.parent, callback);
            } else {
                callback(user);
            }
        });
    }

    function objLength(obj) {
        var length = 0;

        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                length += 1;
            }
        }

        return length;
    }

    function drawTree(level, tree) {
        var length = objLength(tree);

        for (var i in tree) {
            if (tree.hasOwnProperty(i)) {
                length -= 1;

                drawLeaf(level, cache[i].name, length === 0);
                drawTree(level + 1, tree[i]);
            }
        }
    }

    function drawLeaf(level, value, isLastChild) {
        var prefix = level === 0 ? '' : (isLastChild ? '┗ ' : '┝ ');

        while (level > 1) {
            prefix = '┃ ' + prefix;
            level -= 1;
        }

        console.log(prefix + value);
    }

    var buildUsersTree = window.buildUsersTree = function (number) {
        var users = $('.username > a').slice(0, number).map (function () {
            return $(this).attr('href');
        });

        for (var i = 0; i < users.length; i += 1) {
            findRoot(users[i], function (user) {
                getUser(user.url, tree, getUserCallback);
            });
        }

        $('body').on('new_node', function (e, user) {
            console.clear();
            drawTree(0, tree);
        });
    }
}(jQuery));