#!/usr/bin/env casperjs --local-to-remote-url-access=true

// I AM NOT NODEJS
// I AM CASPER JS
// I RUN IN QTWEBKIT, NOT V8

var casper = require('casper').create();
var server = require('webserver').create();
var ipAndPort = '127.0.0.1:8585';
var twitterUser = "";

// Casper Timeout to wait for element
casper.defaultWaitForTimeout = 10000
casper.exitOnError = false

console.log('listing on: ', ipAndPort)

server.listen(ipAndPort, function(request, response) {

  console.log(request.method)
  console.log('Request at ' + new Date());
  console.log(JSON.stringify(request, null, 4));


  if (request.method == 'POST') {
      console.log("POST params should be next: ");
      console.log(JSON.stringify(request.post));//dump
      console.log(request.post['twitterUser']);
      twitterUser = request.post['twitterUser']
      // code = response.statusCode = 200;
      // response.write(code);
  }

  // response.statusCode = 200;
    // response.headers = {
    //     'Cache': 'no-cache',
    //     'Content-Type': 'text/plain',
    //     'Connection': 'Keep-Alive',
    //     'Keep-Alive': 'timeout=5, max=100',
    //     'Content-Length': body.length
    // };

  response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept, Authorization, X-Auth-Token, X-Custom-Header");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  // response.headers();

  // console.log('request post: ', request.post)
  // console.log('request post Twitter User: ', request.post.twitterUser)
  console.log('request header Twitter User: ', request.headers.twitterUser)
  console.log('request POST for Twitter User: ', twitterUser)

  //fs = require('fs')

  var utils = require('utils'),
      tweet_account_name,
      nbLinks, outputfilename,
      header = "Tweet,Timestamp",
      stream, css, count = 0, images,
      casper = require('casper').create({
          viewportSize: {
              width: 480,
              height: 360
          },
          pageSettings: {
              loadImages: false,
              loadPlugins: false,
              userAgent: 'BlackBerry9700/5.0.0.351 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/123'
          }
      });

  var tweetsString = "";
  var tweetsArray = [];

  tweet_account_name = twitterUser;
  css = 0;
  images = 0;


  casper.options.onResourceRequested = function (casperjs, requestData, networkRequest) {
      if (css) {
          var did_css = requestData.url.indexOf(".css") > -1,
              vague_css = (/http[s]:\/\/.+?.css/gi).test(requestData.url);

          if (vague_css || did_css) networkRequest.abort();
      }

      if (images) {
          var dig = requestData.url.indexOf(".png") > -1 || requestData.url.indexOf(".gif") > -1,
              did_pix = dig || requestData.url.indexOf(".jpg") > -1,
              vague_pix = (/([^s]+(?=.(jpg|gif|png)).2)/gi).test(requestData.url);

          if (vague_pix || did_pix || requestData.url.indexOf(".jpeg") > -1) networkRequest.abort();
      }
  };

  casper.on('error', function (msg, backtrace) {
      this.echo(JSON.stringify({msg: msg, backtrace: backtrace}, null, 2));
      this.die('internal errors.');
  });


  // function processTweetLinks(text) {
  //     var exp = ""(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))
  //     text = text.replace(exp, "");
  //     return text;
  // }

  function RecursiveTriverse(thecasper, newurl, stream) {
      newurl = 'https://mobile.twitter.com' + newurl;

      thecasper.thenOpen(newurl, function () {
          //this.wait(3000);
          //this.wait(3);
          count += 1;

          var query = this.evaluate(function () {
              var data = [], checks = 'div.tweet-text div.dir-ltr a.twitter_external_link.dir-ltr.tco-link';

              [].forEach.call(document.querySelectorAll('table.tweet tbody'), function (item) {
                  var tweeted = item.querySelector('div.tweet-text').textContent.replace(/"/g, "'");
                  var time_stamp = item.querySelector('tr.tweet-header td.timestamp').textContent.trim();
                  var replace_links = item.querySelectorAll(checks);
                  tweeted = tweeted.replace(/\n/g, " ").trim();

                  //TODO: fix this 'if' part, it's not working
                  if (replace_links.length) {
                      for (var i = 0; i < replace_links.length; i++) {
                          tweeted.replace(replace_links[i].textContent.trim(), replace_links[i].href);
                      }
                  } //TODO: end of 'if' part that's not working

                  //data.push('"' + tweeted + '",' + time_stamp);
                  // data.push('"' + tweeted + '"');
                  data.push(tweeted);

              });

              return data;
          });

          for(var i=0; i < query.length; i++) {
            tweetsString = query[i].replace(/((bit\.ly|youtu\.be|pic\.twitter\.com|t\.co|lnkd\.in|tcrn\.ch|amp\.twimg\.com|twitter\.com|donaldjtrump\.com|facebook\.com|hrc\.io|nyti\.ms)\S*)\b/g, "");
            console.log('tweetsString [' + parseInt((i+1) + (count*20)) + ']: ', tweetsString)
            tweetsArray.push(tweetsString)
          }

          // tweetsString = query //.join('","') // .join('\n')
          // tweetsArray.push(tweetsString)

          // tweetsString = tweetsString.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
          // tweetsArray += '"' + tweetsString.split("\n") + '"'
          //tweetsArray += tweetsString.split("\\")

          // stream.writeLine(query.join('\n'));

          this.echo(count + ': ' + newurl + ' size: ' + query.length);

          if (this.exists("div.w-button-more")) {
              nbLinks = this.evaluate(function () {
                  return document.querySelector("div.w-button-more a").getAttribute('href');
              });

              // ======= Stop after 500 tweets ======
              if (count < 10) {
                  RecursiveTriverse(this, nbLinks, stream);
              }
          }
      });
  }

  casper.start('https://mobile.twitter.com/' + tweet_account_name, function () {
      //this.wait(500); // wait for twitter page load?

    this.waitForSelector('td.timestamp a',
        function pass () {
          this.then(function () {
            // ======= Stop after 500 tweets ======
            if (count < 10) {
              RecursiveTriverse(this, '/' + tweet_account_name, stream);
            }
          });
        },
        function fail () {
            console.log('ERROR: Did not find selector!')
        }
    );
  });

  casper.then(function () {
      this.echo('Done');
  });

  casper.run(function(){
      console.log('\n\nFinished')
      response.statusCode = 200;
      var body = JSON.stringify(tweetsArray)

      response.write(body);
      response.close();
  });


  console.log('listing on: ', ipAndPort)
});
