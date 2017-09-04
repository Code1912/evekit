/**
 * Created by Code1912 on 2016/10/17.
 */
var http = require('http');
var apiFactory=require("../serve/apiService").apiFactory;
http.createServer(function (request, response) {
    apiFactory(request,response);
}).listen(7777);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:7777/');