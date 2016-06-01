#!/usr/bin/env casperjs --web-security=no

// I AM NOT NODEJS
// I AM CASPER JS
// I RUN IN QTWEBKIT, NOT V8

var casper = require('casper').create();
var server = require('webserver').create();
var ipAndPort = '127.0.0.1:8585';

// res.setHeader("Access-Control-Allow-Origin", "*");

console.log('listing on: ', ipAndPort)

server.listen(ipAndPort, function(request, response) {

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.headers();

  console.log('request header Twitter User: ', request.headers.twitterUser)

    casper.start('http://casperjs.org/');
    casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36");

    casper.thenOpen('http://phantomjs.org', function() {
        this.echo(this.getTitle());
    });

    casper.then(function(){
        // lots of code here, and a few more cassper.then()s
    });

    casper.run(function(){
        console.log('\n\nFinished')
        response.statusCode = 200;
        var body = JSON.stringify({
            phoneNumber: '1800-YOLO-SWAG'
        })

        response.write(body);
        response.close();
    });
});
