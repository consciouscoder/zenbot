(function() {
  angular.module('botController', [])
    .controller('botCtrl', botCtrl)

    botCtrl.$inject = ['$state','$stateParams','twitterBotFactory','botDataFactory']

    function botCtrl ($state, $stateParams, twitterBotFactory, botDataFactory) {

      var bCtrl = this

      //====== Srape Twitter user and populate array ======
      bCtrl.twitterBotNode = function() {
          twitterBotFactory.botConnectNode(bCtrl.twitterUser).then(function(twitterBotResponse){
              console.log('twitterBotResponse: ', twitterBotResponse)
              bCtrl.twitterBotArray = twitterBotResponse.data
              // console.log('tweet array: ', logCtrl.twitterBotArray)
          })
      }
      //=================================================


      //====== Save Twitter Scrape to Data Temple =======
      bCtrl.twitterSaveData = function() {

      }
      //=================================================


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

      // bCtrl.submitBot = function(data) {
      //   botDataFactory.create(data)
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
