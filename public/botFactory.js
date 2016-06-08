(function() {
  angular.module('botFactory', [])
    .factory('botDataFactory', botDataFactory)
    .factory('twitterBotFactory', twitterBotFactory) //['$scope', function($scope){}]
    .factory('googleBotFactory', googleBotFactory)
    .factory('autoBotFactory', autoBotFactory)

    botDataFactory.$inject = ['$http']

    // ===== Factory for Data Temples (save scrape data) =====

    function botDataFactory ($http) {
      var botData = {}

      botData.create = function(botData){
          console.log("from factory: ", botData)
          return $http.post('/api/datatemple', botData)
      }

      botData.createInvite = function(botData){
          console.log("from factory: ", botData)
          return $http.post('/api/invite', botData)
      }

      botData.update = function(disc, id){
          return $http.put('/api/datatemple/'+id, botData)
      }
      botData.delete = function(id){
          return $http.delete('/api/datatemple/'+id)
      }
      // Get all Twitter Data Temples
      botData.showAll = function(){
          return $http.get('/api/datatemple').then(function(response) {
            return response.data
          })
      }
      // Get all Google Data Temples
      botData.showAll2 = function(){
          return $http.get('/api/datatemple2').then(function(response) {
            return response.data
          })
      }
      botData.showOne = function(id){
          return $http.get('/api/datatemple/'+id)
      }
      return botData
    }


    // ===== Factory for Twitter Scraper =====

    twitterBotFactory.$inject = ['$http']

    function twitterBotFactory ($http) {

        var twitterBot = {}


        twitterBot.botConnectNode = function(twitterUser) {

                console.log("connecting to Bot to scrape: ", twitterUser)

                var url = "/api/bot/twitter"

               return $http.post(url, {twitterUser: twitterUser })
                           .then(function(response) {

                    // console.log('twitterBot response: ', response)
                    return response
                })
        }

        return twitterBot
    }


    googleBotFactory.$inject = ['$http']

    function googleBotFactory ($http) {

        var googleBot = {}


        googleBot.botConnectNode = function(googleQuery) {

                console.log("connecting to Bot to scrape: ", googleQuery)

                //var url = "/api/bot/google"
                var url = "http://192.168.173.165:80/api/bot/google"


               return $http.post(url, {googleQuery: googleQuery })
                           .then(function(response) {

                    console.log('googleBot response: ', response)
                    return response
                })
        }

        return googleBot
    }


    autoBotFactory.$inject = ['$http']

    function autoBotFactory ($http) {

        var autoBot = {}


        autoBot.botConnectNode = function(autoQuery) {

                console.log("connecting to Bot to scrape: ", autoQuery)

                var url = "/api/bot/auto"
                //var url = "http://192.168.173.165:80/api/bot/auto"


               return $http.post(url, autoQuery)
                           .then(function(response) {

                    console.log('autoBot response: ', response)
                    return response
                })
        }

        return autoBot
    }


}());


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
