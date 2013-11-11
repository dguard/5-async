(function () {
    'use strict';

    var Queue = function () {
        this.data = [];
    };

    Queue.prototype.contains = function (value) {
        return this.data.indexOf(value) !== -1;
    };

    Queue.prototype.put = function (value) {
        this.data.push(value);
    };

    Queue.prototype.take = function (value) {
        var index;

        while (true) {
            index = this.data.indexOf(value);

            if (index === -1) {
                break;
            }

            this.data.splice(index, 1);
        }
    };

    Queue.prototype.isEmpty = function () {
        return this.data.length === 0;
    };

    Queue.prototype.empty = function () {
        this.data = [];
    };

    module.exports = Queue;
}());
