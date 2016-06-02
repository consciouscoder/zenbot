(function() {
  angular.module('botFactory', [])
    .factory('botDataFactory', botDataFactory)
    .factory('twitterBotFactory', twitterBotFactory) //['$scope', function($scope){}]

    botDataFactory.$inject = ['$http']

    function botDataFactory ($http) {
      var botData = {}

      botData.create = function(disc){
          console.log("from factory: ",disc)
          return $http.post('/api/datafactory', disc)
      }
      botData.update = function(disc, id){
          return $http.put('/api/datafactory/'+id, disc)
      }
      botData.delete = function(id){
          return $http.delete('/api/datafactory/'+id)
      }
      botData.showAll = function(){
          return $http.get('/api/datafactory')
      }
      botData.showOne = function(id){
          return $http.get('/api/datafactory/'+id)
      }
      return botData
    }


    twitterBotFactory.$inject = ['$http']  // ['$scope,'$http']

    function twitterBotFactory ($http) {

        var twitterBot = {}


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
