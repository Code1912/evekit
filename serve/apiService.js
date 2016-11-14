/**
 * Created by Code1912 on 2016/10/17.
 */
var url = require('url');
var apis={};
apis["/login"]=function (req, res) {
    response(res, { token:"abcde"})
};
apis["/user"]=function (req, res) {
    response(res, {
        success:true,
        result:{
            userName: "code1912",
            img: "assets/img/user1.jpg"
        }
    })
};

apis["/weather"]=function (req, res) {
    response(res, {
        success:true,
        result:{
            city:"成都",
            weather_data:[
                { temperature:"20℃",pm25:119,day:"10/20", weather:"晴天",wind:"微风", img:"http://cdn.moji.com/tianqi/assets/images/weather/w7.png"},
                { temperature:"10℃",pm25:250,day:"10/21",weather:"晴天",wind:"微风",img:"http://cdn.moji.com/tianqi/assets/images/weather/w1.png"},
                { temperature:"20℃",pm25:400,day:"10/22",weather:"晴天",wind:"微风",img:"http://cdn.moji.com/tianqi/assets/images/weather/w2.png"},
                { temperature:"21℃",pm25:300,day:"10/23",weather:"晴天",wind:"微风",img:"http://cdn.moji.com/tianqi/assets/images/weather/w3.png"},
                { temperature:"30℃",pm25:10,day:"10/24",weather:"晴天",wind:"微风",img:"http://cdn.moji.com/tianqi/assets/images/weather/w4.png"}
            ]
        }
    })
};
function response(res,data){
    setHeader(res);
    res.end(JSON.stringify(data));
}
function setHeader(res){
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With"
    });
    ;
}

exports.apiFactory=function (request, response) {
    var pathname = url.parse(request.url).pathname.toLocaleLowerCase();
    console.log(pathname)
    if(apis.hasOwnProperty(pathname)){
        apis[pathname].call(this,request,response);
        return;
    }
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.end('can\'t find this path\n');
}