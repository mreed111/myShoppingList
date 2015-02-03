var http = require('http');
var url = require('url');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');

var items = [];

var root = __dirname;

var server = http.createServer(function (req, res) {

    if(req.url == '/') {
        switch(req.method) {
            case 'GET':
                req.url = '/index.html';
                //getItems();
                //var myList = document.getElementById('shoppingList');
                //items = myList.getElementsByTagName('LI');
                debugger;
            break;
            case 'POST':
                var item = '';
                debugger;
                req.setEncoding('utf8');
                req.on('data', function(chunk){
                    item += chunk;
                });

                req.on('end', function(){
                    var obj = qs.parse(item);
                    debugger;
                    res.end('The item: "' + obj.item + '" was added successfully');
                });
            break;
        }
    }

    var getItems = function () {
        debugger;
        var parent = document.getElementById('shoppingList');
        items = parent.getElementsByTagName('LI');
        debugger;
    };

    var itemIndex;
  
    var getItem = function () {
        /* ... */
        var pathname = url.parse(req.url).pathname;
        itemIndex = parseInt(pathname.slice(1), 10);

        if (isNaN(itemIndex)) {
            res.statusCode = 400;
            res.end('Item id not valid');
            return false;
        }
        else if (!items[itemIndex]) {
            res.statusCode = 404;
            res.end('Item not found');
            return false;
        }
        return true;
    };

/*
    switch (req.method) {
    case 'POST':
        var item = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        }); 
        req.on('end', function () {
            items.push(item);
            res.end('Item added\n');
        });
        break;

    case 'GET':
        //debugger;
        items.forEach(function (item, itemIndex) {
            res.write(itemIndex + '. ' + item + '\n');
        });
        res.end();
        break;

    case 'DELETE':
        //debugger;
        if (getItem()) {
            items.splice(itemIndex,1);
            res.end('Item deleted successfully');
        }
        break;

    case 'PUT':
        if (getItem()) {
            debugger;
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            }); 
            req.on('end', function () {
                items.splice(itemIndex,1,item);
                res.end('Item ' + itemIndex + ' updated to "' + items[itemIndex] + '"');
            });
        }
        break;
    }
*/
});


server.listen(9000, function(){
   console.log('listening on 9000');
});

