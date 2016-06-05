/*==============================================================================*/
/* Casper generated Sun Jun 05 2016 12:43:22 GMT-0600 (MDT) */
/*==============================================================================*/

var casper = require('casper').create({
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

// var username = 'FromAtoZen';
// var passwd = 'joshua12';

var x = require('casper').selectXPath;

casper.options.viewportSize = {width: 1024, height: 768};

casper.start("https://www.reddit.com/login", function() {
	console.log('Opened page with title \"' + this.getTitle() + '"');

  // casper.then(function() {
  //   this.fillSelectors('form#login-form', {
  //     'input[id="user_login"]': username,
  //     'input[id="passwd_login"]': passwd
  //   }, true);
  // });

  casper.then(function(){
      console.log("Login using username and password");
      this.evaluate(function(){
          document.getElementById("user_login").value="FromAtoZen";
          document.getElementById("passwd_login").value="dkny01";
          document.querySelector("#login-form div.c-clearfix.c-submit-group button").click();
      });
  });

//*[@id="login-form"]/div[4]/button
//#login-form div.c-clearfix.c-submit-group button

  casper.wait(5000, function() {
      this.echo("I've waited for 5 seconds.");
      casper.capture("reddit.png");
  });
})

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

 casper.run(function(){
     console.log('\n\nFinished')
     this.die('All done!');
 });
