/****************************************************************
* Log in to Twitter
* Submit search query
* Capture the results
* Use emit(), on() Event Methods
*****************************************************************/

var casper = require('casper').create({
  verbose: true,
  loadImages: false,
loadPlugins: false,
webSecurityEnabled: false,
ignoreSslErrors: true,
  logLevel: "debug",
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
  }
});

var url = 'http://twitter.com/';

var twitterId = 'SmilingSimile';
var email = 'dladendorf@gmail.com';
var auth = 'joshua12';
var searchKey = 'trump'

casper.start(url  + twitterId, function(response) {
  // require('utils').dump(response);
  this.echo('title: ', this.getTitle());
  console.log('Starting location is ' + this.getCurrentUrl());
});
//First step is to open Twitter
// casper.start().thenOpen("http://twitter.com", function() {
//     console.log("Open Twitter");
// });

casper.then(function() {
  this.fillSelectors('form.js-front-signin', {
    'input[name="session[username_or_email]"]': email,
    'input[name="session[password]"]': auth
  }, true);
});

casper.then(function() {
  console.log('Authentication ok, new location is ' + this.getCurrentUrl());
  // Log Error if we hit the captcha
  if (/captcha/.test(this.getCurrentUrl())) {
    console.log('Please login and confirm your captcha.');
  }
});

casper.then(function() {
  this.fill('form#global-nav-search', {
    q: searchKey
  }, true);
});

casper.wait(3000, function() {
  console.log('waited 3 second');
});

casper.waitForSelector('.trends-inner', function() {
  console.log('.trend.location' + ' is loaded.');
});

casper.then(function() {
  this.emit('results.log');
});

casper.on('results.log', function() {
  this.captureSelector('twitPic.png', 'div.stream-container');
});

casper.run();
