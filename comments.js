// Create web server
// Start: node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create web server
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // Get query string
    var pathname = url.parse(_url, true).pathname; // Get path name

    // console.log(url.parse(_url, true));
    // console.log(queryData.id);
    // console.log(url.parse(_url, true).pathname);

    if(pathname === '/'){
        if(queryData.id === undefined){ // Home
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list = list + '</ul>';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template); // Send data to web browser
            });
        }else{ // Not home
            fs.readdir('./data', function(error, filelist){
                var title = queryData.id;
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list = list + '</ul>';
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">


