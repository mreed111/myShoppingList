var http = require('http');
var url = require('url');
var items = [];


var server = http.createServer(function (req, res) {
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

    var getInputValue = function () {
        var item = '';
        var listItemValue = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        }); 
        req.on('end', function () {
            listItemValue = item;
        });
        return listItemValue;
    };
  
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
        debugger;
        if (getItem()) {
            items.splice(itemIndex,1,getInputValue());
            res.end('Item ' + itemIndex + ' updated to "' + items[itemIndex] + '"');
        }
        break;
    }
});


server.listen(9000, function(){
   console.log('listening on 9000');
});

