function wordFrequency(inputString) {

  	var sWords = inputString.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
  	var iWordsCount = sWords.length; // count w/ duplicates

  	// array of words to ignore
  	var ignore = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','have','if','&','-','@realdonaldtrump'];
  	ignore = (function(){
  		var o = {}; // object prop checking > in array checking
  		var iCount = ignore.length;
  		for (var i=0;i<iCount;i++){
  			o[ignore[i]] = true;
  		}
  		return o;
  	}());

  	var counts = {}; // object for math
  	for (var i=0; i<iWordsCount; i++) {
  		var sWord = sWords[i];
  		if (!ignore[sWord]) {
  			counts[sWord] = counts[sWord] || 0;
  			counts[sWord]++;
  		}
  	}

  	var arr = []; // an array of objects to return
  	for (sWord in counts) {
      if (counts[sWord] > 2) {
    		arr.push({
    			key: sWord,
    			value: counts[sWord]
    		})
      }
  	}

    // var returnArray = []
    //
    // returnArray = arr.sort(function(a, b) {
    //     return a.distance - b.distance;
    // });
    //
    // return returnArray

  	// sort array by descending frequency | http://stackoverflow.com/a/8837505
  	return arr.sort(function(a,b){
  		return (a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0);
  	});


  	// var iWordsCount = words.length; // count w/o duplicates
  	// for (var i=0; i<iWordsCount; i++) {
  	// 	var word = words[i];
  	// 	console.log(word.frequency, word.text);
  	// }
  }
