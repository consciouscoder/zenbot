(function() {
  angular.module('botController', [])
    .controller('botCtrl', botCtrl)

    botCtrl.$inject = ['$state','$stateParams','twitterBotFactory','googleBotFactory','botDataFactory']

    function botCtrl ($state, $stateParams, twitterBotFactory, googleBotFactory, botDataFactory) {

      var bCtrl = this

      //====== Srape Twitter user and populate array ======
      bCtrl.twitterBotNode = function() {
          twitterBotFactory.botConnectNode(bCtrl.twitterUser).then(function(twitterBotResponse){
              console.log('twitterBotResponse: ', twitterBotResponse)

              bCtrl.twitterBotArray = twitterBotResponse.data
              // console.log('tweet array: ', logCtrl.twitterBotArray)
          })
      }


      //====== Srape Google query and populate array ======
      bCtrl.googleBotNode = function() {
          googleBotFactory.botConnectNode(bCtrl.googleQuery).then(function(googleBotResponse){
              console.log('googleBotResponse: ', googleBotResponse)

              bCtrl.googleBotArray = googleBotResponse.data
              console.log('google array: ', JSON.stringify(bCtrl.googleBotArray))
          })
      }


      //====== Save Twitter Scrape to Data Temple =======
      bCtrl.twitterSaveData = function() {

          bCtrl.twitterData = {
                           twitterName: bCtrl.twitterUser,
                                tweets: bCtrl.twitterBotArray }

          botDataFactory.create(bCtrl.twitterData)
      }

      //====== Word Cloud Visualization  =======

      bCtrl.twitterWordCloud = function() {
            // console.log('word freq: ', wordFrequency(bCtrl.twitterBotArray.join()))
            bCtrl.wordFrequencyArray = wordFrequency(bCtrl.twitterBotArray.join())
            console.log('twitter word freq: ', JSON.stringify(bCtrl.wordFrequencyArray))
            drawWordCloud(bCtrl.wordFrequencyArray)
      }

      //====== Word Cloud Visualization  =======

      bCtrl.googleWordCloud = function() {
            // console.log('word freq: ', wordFrequency(bCtrl.twitterBotArray.join()))
            // bCtrl.wordFrequencyArray = wordFrequency(bCtrl.googleBotArray.join())
            console.log('google word freq: ', JSON.stringify(bCtrl.googleBotArray))
            drawWordCloud(bCtrl.googleBotArray)
      }

      // bCtrl.page = $state.current.name
      //
      // if(bCtrl.page == 'edit'){
      //   botDataFactory.showOne($stateParams.id)
      //       .then(function(res) {
      //           console.log(res);
      //           bCtrl.newDataTemple = res.data
      //       })
      // }
      //
      // console.log($state.current);
      //
      // botDataFactory.showAll()
      //        .then(function(response){
      //     bCtrl.discs = response.data
      // })

      // bCtrl.submitBot = function(botData) {
      //   botDataFactory.create(botData)
      //     .then(function (res) {
      //       console.log("new bot : ", res)
      //     })
      // }
      //
      // bCtrl.createDataTemple = function(){
      //   bCtrl.page = "create"
      //   $state.go('create')
      // }
      // bCtrl.editDisc = function(id){
      //   bCtrl.page = "edit"
      //   $state.go('edit', {id: id})
      // }
    }

}());
