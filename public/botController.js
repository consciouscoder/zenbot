(function() {
  angular.module('botController', [])
    .controller('botCtrl', botCtrl)

    botCtrl.$inject = ['$rootScope','$state','$stateParams','twitterBotFactory','googleBotFactory','autoBotFactory','botDataFactory']

    function botCtrl ($rootScope, $state, $stateParams, twitterBotFactory, googleBotFactory, autoBotFactory, botDataFactory) {

      var bCtrl = this

      console.log('current state: ', $state.current.name)

      bCtrl.autoStartURL = "http://www.reddit.com/login"
      bCtrl.autoLogin = "FromAtoZen"
      bCtrl.autoPassword = "******"
      bCtrl.autoActionURL = "https://www.reddit.com/r/all"
      bCtrl.autoClassSelector = "div.arrow.up.login-required.access-required"
      bCtrl.autoAction = "CLICK"

      bCtrl.checkLoading = function() {
          if (bCtrl.isLoading) {
            console.log('isLoading: TRUE')
            return true
          } else {
            console.log('isLoading: FALSE')
            return false
          }
      }

      //====== Srape Twitter user and populate array ======
      bCtrl.twitterBotNode = function() {

        if (bCtrl.twitterUser) {

            bCtrl.isLoading = true
            $rootScope.isLoading = true
            bCtrl.twitterBotArray = []
            bCtrl.twitterWordCloud = false

            console.log('bCtrl.isLoading: ', bCtrl.isLoading)

            twitterBotFactory.botConnectNode(bCtrl.twitterUser).then(function(twitterBotResponse){
                console.log('twitterBotResponse: ', twitterBotResponse)

                bCtrl.twitterBotArray = twitterBotResponse.data
                // console.log('tweet array: ', logCtrl.twitterBotArray)

                $rootScope.isLoading = false
                bCtrl.isLoading = false
            })

        }
      }


      //====== Srape Google query and populate array ======

      bCtrl.googleBotNode = function() {

        if (bCtrl.googleQuery) {

            bCtrl.isLoading = true
            bCtrl.googleBotArray = ""
            bCtrl.googleWordCloud = false

            googleBotFactory.botConnectNode(bCtrl.googleQuery).then(function(googleBotResponse){
                console.log('googleBotResponse: ', googleBotResponse)

                bCtrl.googleBotArray = googleBotResponse.data
                console.log('google array: ', JSON.stringify(bCtrl.googleBotArray))
                bCtrl.isLoading = false

                bCtrl.googleWordCloud = true
            })
        }
    }

      //====== Start AutoBot! ======

      bCtrl.startAutoBot = function() {

         bCtrl.isLoading = true
         bCtrl.autoScreenCapture = ""

         bCtrl.autoQuery = { autoStartURL : bCtrl.autoStartURL,
                             autoLogin : bCtrl.autoLogin,
                             autoPassword : bCtrl.autoPassword,
                             autoActionURL : bCtrl.autoActionURL,
                             autoClassSelector : bCtrl.autoClassSelector,
                             autoAction : bCtrl.autoAction
                            }

          autoBotFactory.botConnectNode(bCtrl.autoQuery).then(function(autoBotResponse){
              console.log('autoBotResponse: ', autoBotResponse)

              bCtrl.autoBotResponseObj = autoBotResponse.data

              bCtrl.autoScreenCapture = bCtrl.autoBotResponseObj.screenCap
              console.log('autobot array: ', JSON.stringify(bCtrl.autoBotResponseObj))

              bCtrl.isLoading = false
          })
      }


      //====== Save Twitter Scrape to Data Temple =======
      bCtrl.twitterSaveData = function() {

          bCtrl.twitterData = {
                           twitterName: bCtrl.twitterUser,
                                tweets: bCtrl.twitterBotArray }

          botDataFactory.create(bCtrl.twitterData)
      }

      //====== Save Twitter Scrape to Data Temple =======
      bCtrl.googleSaveData = function() {

          bCtrl.googleData = {
                           googleQuery: bCtrl.googleQuery,
                              topWords: bCtrl.googleBotArray }

          botDataFactory.create(bCtrl.googleData)
      }

      //====== Word Cloud Visualization  =======

      bCtrl.drawTwitterWordCloud = function() {

            if (bCtrl.twitterBotArray) {

                bCtrl.twitterWordCloud = true

                // console.log('word freq: ', wordFrequency(bCtrl.twitterBotArray.join()))
                bCtrl.wordFrequencyArray = wordFrequency(bCtrl.twitterBotArray.join())
                console.log('twitter word freq: ', JSON.stringify(bCtrl.wordFrequencyArray))
                drawWordCloud(bCtrl.wordFrequencyArray)
            }
      }

      bCtrl.checkTwitterWordCloud = function() {

          if (bCtrl.twitterWordCloud) {
            console.log('twitterWordCloud: TRUE')
            return true
          } else {
            console.log('twitterWordCloud: FALSE')
            return false
          }
      }


      //====== Word Cloud Visualization  =======

      bCtrl.drawGoogleWordCloud = function() {
            if (bCtrl.googleBotArray) {

                bCtrl.googleWordCloud = true
                // console.log('word freq: ', wordFrequency(bCtrl.twitterBotArray.join()))
                // bCtrl.wordFrequencyArray = wordFrequency(bCtrl.googleBotArray.join())
                console.log('google word freq: ', JSON.stringify(bCtrl.googleBotArray))
                drawWordCloud(bCtrl.googleBotArray)
            }
      }

      bCtrl.checkGoogleWordCloud = function() {

          if (bCtrl.googleWordCloud) {
            console.log('googleWordCloud: TRUE')
            return true
          } else {
            console.log('googleWordCloud: FALSE')
            return false
          }
      }

      //====== My Twitter Data Temples -- Populate Data Tables for user's My Data Temples page ======

      bCtrl.myTwitterDataTemple = function() {
          botDataFactory.showAll().then(function(response) {
              bCtrl.myDataTemplesTwitterArray = response
              console.log('twitter data temple: ', response)
          })
      }

      //====== My Google Data Temples -- Populate Data Tables for user's My Data Temples page ======

      bCtrl.myGoogleDataTemple = function() {
          botDataFactory.showAll2().then(function(response) {
              bCtrl.myDataTemplesGoogleArray = response
              console.log('google data temple: ', response)
          })
      }

      //===== Populate Data Temple's if state changes to 'datetemple' =====
      if ($state.is('datatemple')) {
        bCtrl.myTwitterDataTemple()
        bCtrl.myGoogleDataTemple()
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
