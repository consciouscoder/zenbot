/****************************************************************
* modified from googlePagination.js  ->
* https://github.com/n1k0/casperjs/tree/master/samples
* 'Capture' the first 4 pages of BestBuy product
* use a counter, startPage
* Methods = capture(), thenClick(), waitFor(), waitForSelector()
*****************************************************************/

var casper = require("casper").create({
  verbose: true,
  logLevel: 'error', // debug, info, warning, error
  pageSettings: {
    // loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var fs = require('fs');
var url = 'http://www.bestbuy.com/site/dji-phantom-3-standard-quadcopter-white/4406800.p?id=1219743453736&skuId=4406800';

var currentPage = 1;
var ratings = [];
var dates = [];
var startPage = '';

function terminate() {
  this.echo('thats all folks. ').exit();
}

function startPageFn() {
  var startPage = document.querySelector('span.BVRRSelectedPageNumber');
  return Array.prototype.map.call(startPage, function(e) {
    return e.innerText;
  });
};

function getRatings() {
  var ratings = document.querySelectorAll('.BVRRRatingNormalImage img');
  return Array.prototype.map.call(ratings, function(e) {
    return e.getAttribute('title');
  });
};

function getDate() {
  var dates = document.querySelectorAll('span.BVRRValue.BVRRReviewDate');
  return Array.prototype.map.call(dates, function(e) {
    return e.innerText;
  });
};

var processPage = function() {
  casper.wait(1000, function() {
    console.log('waited 1 second');
  });
  this.echo("capturing page " + currentPage);
  this.capture("drone-results-p" + currentPage + ".png");

  // don't go too far down the rabbit hole
  if (currentPage > 3 || !this.exists(".BVRRRatingNormalImage")) {
    return terminate.call(casper);
  }

  currentPage++;
  this.echo("requesting next page: " + currentPage);
  this.thenClick('span.BVRRPageLink.BVRRNextPage a').then(function() {
    this.waitFor(function() {
      return startPage != 1;
    }, processPage, terminate);
  });
};

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.wait(2000, function() {
  console.log('waited 2 seconds');
});

casper.then(function() {
  this.click('li[aria-controls="reviews-tab"] a');
  console.log('clicked review tab');
});

casper.then(function() {
  startPage = this.evaluate(startPageFn);
});

casper.waitForSelector('.BVRRRatingNormalImage', processPage, terminate);

casper.run();