#!/usr/bin/env casperjs --local-to-remote-url-access=true

// I AM NOT NODEJS
// I AM CASPER JS
// I RUN IN QTWEBKIT, NOT V8

var casper = require('casper').create();
var server = require('webserver').create();
var ipAndPort = '127.0.0.1:8586';

// Casper Timeout to wait for element
casper.defaultWaitForTimeout = 10000
casper.exitOnError = false

console.log('listing on: ', ipAndPort)

server.listen(ipAndPort, function(request, response) {

  console.log(request.method)
  console.log('Request at ' + new Date());
  console.log(JSON.stringify(request, null, 4));

  var requestObject = {};
  var autoStartURL = "";
  var autoLogin = "";
  var autoPassword = "";
  var autoActionURL = "";
  var autoClassSelector = "";
  var autoAction = "";

  var upVotes = [];
  var upVoteCounter = 0;
  var screenCap = "";

  if (request.method == 'POST') {
      console.log("POST params should be next: ");
      console.log(JSON.stringify(request.post));//dump

      requestObject = request.post;

      autoStartURL = requestObject.autoStartURL;
      autoLogin = requestObject.autoLogin;
      autoPassword = requestObject.autoPassword;
      autoActionURL = requestObject.autoActionURL;
      autoClassSelector = requestObject.autoClassSelector;
      autoAction = requestObject.autoAction;

      console.log('autoStartURL: ', autoStartURL);
      console.log('autoLogin: ', autoLogin);
      console.log('autoPassword: ', autoPassword);
      console.log('autoActionURL: ', autoActionURL);
      console.log('autoClassSelector: ', autoClassSelector);
      console.log('autoAction: ', autoAction);
  }


  response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept, Authorization, X-Auth-Token, X-Custom-Header");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  // response.headers();

  // console.log('request POST for Twitter User: ', twitterUser)

  //fs = require('fs')

  // var utils = require('utils'),
  //     tweet_account_name,
  //     nbLinks, outputfilename,
  //     header = "Tweet,Timestamp",
  //     stream, css, count = 0, images

var casper = require('casper').create({
    viewportSize: {
        width: 480,
        height: 360
    },
    pageSettings: {
        loadImages: true,
        loadPlugins: false,
        userAgent: 'BlackBerry9700/5.0.0.351 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/123'
    },
});

// var username = 'FromAtoZen';
// var passwd = 'joshua12';

// var upVotes = [];
// var upVoteCounter = 0;
// var screenCap = ""


var x = require('casper').selectXPath;

casper.options.viewportSize = {width: 1024, height: 768};

// function getLinks() {
//     var links = document.querySelectorAll('div.midcol.unvoted div.arrow.up.login-required.access-required');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }

casper.start("https://www.reddit.com/login", function() {
	console.log('Opened page with title \"' + this.getTitle() + '"');

  // casper.then(function() {
  //   this.fillSelectors('form#login-form', {
  //     'input[id="user_login"]': username,
  //     'input[id="passwd_login"]': passwd
  //   }, true);
  // });

  // ============ ERROR CHECKING =========================================

  casper.on('error', function (msg, backtrace) {
      this.echo(JSON.stringify({msg: msg, backtrace: backtrace}, null, 2));

      // this.die('internal errors.'); // DO NOT DIE!
  });

  casper.then(function(){
      console.log("Login using username and password");
      this.evaluate(function(){
          document.getElementById("user_login").value="FromAtoZen";
          document.getElementById("passwd_login").value="dkny01";
          document.querySelector("#login-form div.c-clearfix.c-submit-group button").click();

      });

      // casper.wait(2000, function() {
      //     this.echo("I've waited for 3 seconds.");
      //     casper.capture("reddit.png");
      // });

  });

  casper.wait(2000, function() {
      this.echo("I've waited for 2 seconds.");
      casper.capture("reddit.png");
  });

  casper.thenOpen('https://www.reddit.com/r/all', function() {
       console.log('Opened page with title \"' + this.getTitle() + '"');
  });

  casper.wait(2000, function() {
      this.echo("I've waited for 2 seconds.");
      casper.capture("reddit.png");
  });

});

// casper.thenClick(){
//
// }
// function getRatings() {
//   var ratings = document.querySelectorAll('div.arrow.up.login-required.access-required');
//   return Array.prototype.map.call(ratings, function(e) {
//     return e.getAttribute('title');
//   });
// }
//getElementsByClassName


casper.then(function(){


  // upVoteCounter = document.getElementsByClassName('up').length;

  upVoteCounter = document.querySelectorAll("div.arrow.up.login-required.access-required").length;
  this.echo('upVoteCounter: ', upVoteCounter);

	var images = this.evaluate(function(){
		//var facebookImages = document.getElementsByTagName('img');
    upVotes = document.getElementsByClassName('up');

		for(var i = 0; i < upVotes.length; i++) {
			// if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				// allSrc.push(facebookImages[i].id);

        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();

        upVoteCounter = upVotes.length;

		}

    for(var i = 0; i < upVotes.length; i++) {
			// if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				// allSrc.push(facebookImages[i].id);

        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();

        upVoteCounter = upVotes.length;

		}

    for(var i = 0; i < upVotes.length; i++) {
			// if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				// allSrc.push(facebookImages[i].id);

        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();

        upVoteCounter = upVotes.length;

		}

    for(var i = 0; i < upVotes.length; i++) {
			// if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				// allSrc.push(facebookImages[i].id);

        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
		}

    for(var i = 0; i < upVotes.length; i++) {
			// if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				// allSrc.push(facebookImages[i].id);

        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
        upVotes[i].click();
        upVotes[i+1].click();
        upVotes[i+2].click();
        upVotes[i+3].click();
        upVotes[i+4].click();
        upVotes[i+5].click();
        upVotes[i+6].click();
		}

}); // evaluate


  console.log('upVotes.length: ', upVoteCounter)

  casper.wait(1000, function() {
      this.echo("I've waited for 3 seconds.");
      screenCap = "reddit-" + makeid() + ".png";
      casper.capture("../../public/screencaptures/" + screenCap);
  });

})

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 8; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

casper.run(function(){
    console.log('\n\nFinished')
    //this.die('All done!');

    response.statusCode = 200;

    console.log('upVoteCount : ', upVoteCounter)

    var body = { "upVoteCount" : upVoteCounter,
                 "screenCap"   : screenCap }

    //response.write(body);
      //JSON.stringify();
    response.write(JSON.stringify(body));
    response.close();
});


console.log('listing on: ', ipAndPort)

}); // server.listen



// casper.then(function(){
//     console.log("Login using username and password");
//     // this.evaluate(function(){
//     //var firstLink =
//
//
//
//     // console.log('test: ',getRatings())
//
//
//     // document.querySelectorAll("div.arrow.up.login-required.access-required")[2].click()
//     // document.querySelectorAll("div.arrow.up.login-required.access-required")[3].click()
//     // document.querySelectorAll("div.arrow.up.login-required.access-required")[4].click()
//     // document.querySelectorAll("div.arrow.up.login-required.access-required")[5].click()
//     // document.querySelectorAll("div.arrow.up.login-required.access-required")[6].click()
//
//     casper.wait(2000, function() {
//         this.echo("I've waited for 3 seconds.");
//         casper.capture("reddit.png");
//     });
//
//         //var up2 = document.querySelectorAll("div.arrow.up.login-required.access-required")[2];
//
//       //  casper.then(up2.click())
//
//
//         //
//         // document.querySelectorAll("div.arrow.up.login-required.access-required")[2].click()
//         // document.querySelectorAll("div.arrow.up.login-required.access-required")[3].click()
//         // document.querySelectorAll("div.arrow.up.login-required.access-required")[4].click()
//         // document.querySelectorAll("div.arrow.up.login-required.access-required")[5].click()
//         // document.querySelectorAll("div.arrow.up.login-required.access-required")[6].click()
//     // });
// });


//*[@id="login-form"]/div[4]/button
//#login-form div.c-clearfix.c-submit-group button

// WORKS!!!!!
  //document.querySelectorAll("div.arrow.up.login-required.access-required")[2].click()

  // casper.then(function(){
  //     console.log("Clicking UP votes NOW!");
  //
  //     casper.then(this.evaluate(document.querySelectorAll("div.arrow.up.login-required.access-required")[2].click()))
  //     casper.then(this.evaluate(document.querySelectorAll("div.arrow.up.login-required.access-required")[3].click()))
  //     casper.then(document.querySelectorAll("div.arrow.up.login-required.access-required")[4].click())
  //     casper.then(document.querySelectorAll("div.arrow.up.login-required.access-required")[5].click())
  //
  // });

        // document.querySelectorAll("li#credit")[0].click();

          //   upVotes = document.querySelectorAll("div.arrow.up.login-required.access-required");
          //
          // this.then(console.log(JSON.stringify(upVotes)));
          //
          // casper.wait(3000, function() {
          //     this.echo("I've waited for 3 seconds.");
          //     casper.capture("reddit.png");
          // });
          //
          //

          //#thing_t3_4mpjwo > div.midcol.unvoted > div.arrow.up.login-required.access-required
          //*[@id="thing_t3_4mpjwo"]/div[1]/div[1]

          //  div.midcol.likes > div.arrow.login-required.access-required.upmod
          //#thing_t3_4mq25f > div.midcol.unvoted > div.arrow.login-required.access-required.up

//           casper.waitForSelector("#thing_t3_4mq25f div.midcol.unvoted div.arrow.up.login-required.access-required",
//               function success() {
//                 document.querySelector("#thing_t3_4mq25f div.midcol.unvoted div.arrow.up.login-required.access-required").click();
//               },
//               function fail() {
// console.log('ERROR: Did not find selector!')
//           });
//           casper.waitForSelector("#thing_t3_4mpato .arrow.login-required.access-required.upmod",
//               function success() {
//
//                   this.click("#thing_t3_4mpato .arrow.login-required.access-required.upmod");
//               },
//               function fail() {
// console.log('ERROR: Did not find selector!')
//           });
//           casper.waitForSelector("#thing_t3_4mpoot .arrow.login-required.access-required.upmod",
//               function success() {
//
//                   this.click("#thing_t3_4mpoot .arrow.login-required.access-required.upmod");
//               },
//               function fail() {
// console.log('ERROR: Did not find selector!')
//           });

          // this.waitForSelector('div.arrow.up.login-required.access-required',
          //     function pass () {
          //       this.then(function () {
          //
          //
          //         console.log('FOUND selector!!')
          //         this.click('div.arrow.up.login-required.access-required')
          //
          //         casper.wait(2000, function() {
          //             this.echo("I've waited for 2 seconds.");
          //             casper.capture("reddit.png");
          //         });
          //
          //       });
          //     },
          //     function fail () {
          //         console.log('ERROR: Did not find selector!')
          //     }
          // );






        //console.log(JSON.stringify(upVotes))

        // this.then(function() {
        //   document.querySelector("div.midcol.unvoted div.arrow.up.login-required.access-required").click();
        //   console.log("Clicked!");
        //     //console.log(JSON.stringify(upVotes))
        // })

      // this.evaluate(function(){
        // for (var i = 0; i < upVotes.length; i++) {
        //     // upVotes[i].click();
        //     console.log(i);
        // }
      // });
  // });


  // casper.wait(3000, function() {
  //     this.echo("I've waited for 3 seconds.");
  //     casper.capture("reddit.png");
  // });


  // function getLinks() {
  //     var upVotes = document.querySelectorAll('div.midcol.unvoted div.arrow.up.login-required.access-required');
  //     return Array.prototype.map.call(links, function(e) {
  //         return e.getAttribute('href');
  //     });
  // }



// div.midcol.unvoted div.arrow.up.login-required.access-required



//#1up  #thing_t3_4mo34m div.midcol.unvoted > div.arrow.up.login-required.access-required
//#2up  #thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up

//   this.waitForSelector('#thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up',
//       function pass () {
//         this.then(function () {
//
// #thing_t3_4mo34m > div.midcol.unvoted > div.arrow.up.login-required.access-required
//
//           console.log('FOUND selector!!')
//           this.click('#thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up')
//
          // casper.wait(2000, function() {
          //     this.echo("I've waited for 2 seconds.");
          //     casper.capture("reddit.png");
          // });
//
//         });
//       },
//       function fail () {
//           console.log('ERROR: Did not find selector!')
//       }
//   );
//  })
//==================================================================


// casper.start("http://www.reddit.com/", function() {
// 	console.log('Opened page with title \"' + this.getTitle() + '"');
//
// //#1up  #thing_t3_4mo34m div.midcol.unvoted > div.arrow.up.login-required.access-required
// //#2up  #thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up
//
//   this.waitForSelector('#thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up',
//       function pass () {
//         this.then(function () {
//
// #thing_t3_4mo34m > div.midcol.unvoted > div.arrow.up.login-required.access-required
//
//           console.log('FOUND selector!!')
//           this.click('#thing_t3_4mnwuh div.midcol.unvoted div.arrow.login-required.access-required.up')
//
//           casper.wait(2000, function() {
//               this.echo("I've waited for 2 seconds.");
//           });
//
//           casper.capture("reddit.png");
//         });
//       },
//       function fail () {
//           console.log('ERROR: Did not find selector!')
//       }
//   );
//  })
