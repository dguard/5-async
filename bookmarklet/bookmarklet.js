javascript:(function(){;var%20numDependencies=0,loadedDependencies=0;function%20scriptLoaded()%7BloadedDependencies++;if(numDependencies===loadedDependencies)%7BafterDepsLoaded()%7D%7Dfunction%20afterDepsLoaded()%7B(function($)%7B%22use%20strict%22;var%20cache=%7B%7D,tree=%7B%7D;function%20getUser(url,parentNode,callback)%7Bif(cache.hasOwnProperty(url))%7Bcallback(cache%5Burl%5D,parentNode);return%7D$.get(url,function(document)%7Bvar%20$document=$(document),user=%7Burl:url,name:$document.find(%22h2.username%22).text(),img:$document.find('img%5Balt=%22avatar%22%5D').attr(%22src%22),parent:$document.find(%22#invited-by%22).attr(%22href%22),children:$document.find('%5Brel=%22friend%22%5D').map(function()%7Breturn%20$(this).attr(%22href%22)%7D)%7D;cache%5Burl%5D=user;callback(user,parentNode)%7D)%7Dfunction%20getUserCallback(user,parentNode)%7Bvar%20i;parentNode%5Buser.url%5D=%7B%7D;$(%22body%22).trigger(%22new_node%22,user);for(i=0;i%3Cuser.children.length;i+=1)%7BgetUser(user.children%5Bi%5D,parentNode%5Buser.url%5D,getUserCallback)%7D%7Dfunction%20findRoot(url,callback)%7BgetUser(url,%7B%7D,function(user)%7Bif(user.parent)%7BfindRoot(user.parent,callback)%7Delse%7Bcallback(user)%7D%7D)%7Dfunction%20objLength(obj)%7Bvar%20length=0,i;for(i%20in%20obj)%7Bif(obj.hasOwnProperty(i))%7Blength+=1%7D%7Dreturn%20length%7Dfunction%20drawLeaf(level,value,isLastChild)%7Bvar%20prefix=level===0?%22%22:isLastChild?%22%E2%94%97%20%22:%22%E2%94%9D%20%22;while(level%3E1)%7Bprefix=%22%E2%94%83%20%22+prefix;level-=1%7Dconsole.log(prefix+value)%7Dfunction%20drawTree(level,tree)%7Bvar%20length=objLength(tree),i;for(i%20in%20tree)%7Bif(tree.hasOwnProperty(i))%7Blength-=1;drawLeaf(level,cache%5Bi%5D.name,length===0);drawTree(level+1,tree%5Bi%5D)%7D%7D%7Dwindow.buildUsersTree=function(number)%7Bvar%20i,users=$(%22.username%20%3E%20a%22).slice(0,number).map(function()%7Breturn%20$(this).attr(%22href%22)%7D),mapCallback=function(user)%7BgetUser(user.url,tree,getUserCallback)%7D;for(i=0;i%3Cusers.length;i+=1)%7BfindRoot(users%5Bi%5D,mapCallback)%7D$(%22body%22).on(%22new_node%22,function()%7Bconsole.clear();drawTree(0,tree)%7D)%7D%7D)(jQuery);window.buildUsersTree(1)%7DafterDepsLoaded();})()