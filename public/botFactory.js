(function() {
  angular.module('botFactory', [])
    .factory('twitterBotFactory', twitterBotFactory) //['$scope', function($scope){}]

    twitterBotFactory.$inject = ['$http']  // ['$scope,'$http']

    function twitterBotFactory ($http) {

        var twitterBot = {}

        // twitterBot.botConnect = function(twitterUser) {
        //
        //         console.log("connecting to Bot to scrape: ", twitterUser)
        //
        //         var url = "http://127.0.0.1:8585"
        //
        //        return $http.post(url, '{twitterUser:' + twitterUser +'}', {withCredentials: true}, {'Content-Type': 'application/json; charset=utf-8'})
        //                    .then(function(response) {
        //
        //             console.log('twitterBot response: ', response)
        //             return response
        //         })
        // }

        twitterBot.botConnectNode = function(twitterUser) {

                console.log("connecting to Bot to scrape: ", twitterUser)

                var url = "http://127.0.0.1:8080/api/bot"

               return $http.post(url, {twitterUser: twitterUser })
                           .then(function(response) {

                    // console.log('twitterBot response: ', response)
                    return response
                })
        }

        return twitterBot
    }


}());
