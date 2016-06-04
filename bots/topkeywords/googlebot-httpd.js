var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  app = express(),
  port = 8586

//var ipAndPort = '127.0.0.1:8586';

    // this.name = name;
    // this.age = age;
    //
    // this.get_name = function() {
    //     return this.name;
    // }
    //
    // this.get_age = function() {
    //     return this.age;
    // }

		var googleQuery = "";

		// Casper Timeout to wait for element
		// casper.defaultWaitForTimeout = 10000
		// casper.exitOnError = false

		console.log('listing on: ', port)

		app.listen(port, function(request, response) {


			googleQuery = googleQuery.split(' ').join('+');



		  console.log('request POST for Google Query: ', googleQuery)

		  //fs = require('fs')

		  var utils = require('utils')

			var request = require("request"),
					cheerio = require("cheerio"),
				//url = "https://www.google.com/search?q=data+mining",
				url = "https://www.google.com/search?q=" + this.query,

				corpus = {},
				totalResults = 0,
				resultsDownloaded = 0;

			// Filter out common words / HTML tags and JS
			function wordOK(word) {
					switch (word) {
				    case 'ffffff':
				    case 'divubergridcell':
				    case 'isbn':
				    case 'width':
						case 'ubergrid':
						case 'ubergridcelltitle':
						case 'ubergridhover':
						case 'function':
						case 'backgroundcolor':
						case 'rgba':
						case 'left':
						case 'color':
						case 'with':
						case 'that':
						case 'they':
						case 'none':
						case 'this':
						case 'will':
						case 'more':
						case 'size':
						case 'have':
						case 'your':
						case 'from':
						case 'what':
						case 'their':
						case 'length':
						case 'also':
						case 'typeof':
						case 'undefined':
						case 'containerid':
						case 'contentid':
						case 'than':
						case 'them':
						case 'false':
						case 'true':
				        return false
						default:
								return true
					}
			}

			function callback (reponse) {
				resultsDownloaded++;

				if (resultsDownloaded !== totalResults) {
					return;
				}

				var words = [];

				// stick all words in an array
				for (prop in corpus) {
					if (wordOK(prop)) {
						words.push({
							key: prop,
							value: corpus[prop]
						});
					}
				}

				// sort array based on how often they occur
				// words.sort(function (a, b) {
				// 	return b.count - a.count;
				// });

				words.sort(function(a,b){
					return (a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0);
				});

				// finally, log the first 250 most popular words
				console.log(words.slice(0, 100));

				this.results = words.slice(0, 100)

				// return response.send(body)

				//return callbackback()

				//return this.results
			}

			request(url, function (error, response, body) {
				if (error) {
					console.log("Couldn’t get page because of error: " + error);
					return;
				}

				// load the body of the page into Cheerio so we can traverse the DOM
				var $ = cheerio.load(body),
					links = $(".r a");

				links.each(function (i, link) {
					// get the href attribute of each link
					var url = $(link).attr("href");

					// strip out unnecessary junk
					url = url.replace("/url?q=", "").split("&")[0];

					if (url.charAt(0) === "/") {
						return;
					}

					// this link counts as a result, so increment results
					totalResults++;

					// download that page
					request(url, function (error, response, body) {
						if (error) {
							console.log("Couldn’t get page because of error: " + error);
							return;
						}

						// load the page into cheerio
						var $page = cheerio.load(body),
							text = $page("body").text();

						// throw away extra whitespace and non-alphanumeric characters
						text = text.replace(/\s+/g, " ")
								   .replace(/[^a-zA-Z ]/g, "")
								   .toLowerCase();

						// split on spaces for a list of all the words on that page and
						// loop through that list
						text.split(" ").forEach(function (word) {
							// we don't want to include very short or long words, as they're
							// probably bad data
							if (word.length < 4 || word.length > 20) {
								return;
							}

							if (corpus[word]) {
								// if this word is already in our "corpus", our collection
								// of terms, increase the count by one
								corpus[word]++;
							} else {
								// otherwise, say that we've found one of that word so far
								corpus[word] = 1;
							}
						});

						// and when our request is completed, call the callback to wrap up!
						callback(response);
					});
				});
			});

		  // casper.then(function () {
		  //     this.echo('Done');
		  // });

		  // casper.run(function(){
		  //     console.log('\n\nFinished')
		  //     response.statusCode = 200;
		  //     var body = JSON.stringify(tweetsArray)
			//
		  //     response.write(body);
		  //     response.close();
		  // });


		  console.log('listing on: ', port)
		});



//}; // exports
