(function () {
  angular.module('zenbot', ['ui.router','botFactory','botController'])
    .run(function ($rootScope, $state, $window) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if(toState.authenticate) {
              if (!$window.localStorage.getItem('token')) {
                $state.transitionTo('login')
                event.preventDefault()
              }
        }
      })
    })

    .config(routerConfig)
    .controller('loginController', loginCtrl)
    .factory('AuthInterceptor', function($q, $location, $window) {

      var interceptorFactory = {};

    	// this will happen on all HTTP requests
    	interceptorFactory.request = function(config) {

    		// grab the token
    		var token = $window.localStorage.getItem('token');

    		// if the token exists, add it to the header as x-access-token
    		if (token){
    			config.headers['x-access-token'] = token;
        }
    		return config;
    	};

    	// happens on response errors
    	interceptorFactory.responseError = function(response) {

    		// if our server returns a 403 forbidden response
    		if (response.status == 403) {
    			$window.localStorage.removeItem('token')
    			$location.path('/login');
    		}

    		// return the errors from the server as a promise
    		return $q.reject(response);
    	};

    	return interceptorFactory;

    })

    loginCtrl.$inject = ['$http','$state','$window','$rootScope','$location','twitterBotFactory']
    // LOGIN CONTROLLER
    function loginCtrl ($http, $state, $window, $rootScope, $location, twitterBotFactory) {

      var logCtrl = this
      // logCtrl.loggedIn = false
      logCtrl.page = 'Login'

      // ------ test for authentication routing ----------
      //
      // $http.get('/api/friends')
      //   .then(function(response){
      //     console.log(response)
      //     logCtrl.friends = response.data.friends[0]
      //     console.log(logCtrl.friends)
      //   })
      //
      // if ($state.is('logout')) {
      //   console.log('logging off!')
      //   // $rootScope.currentUserSignedIn = false
      //   $window.localStorage.removeItem('token')
      //   $state.go('login')
      //   logCtrl.checkLogIn()
      // }

      logCtrl.isLoggedIn = false

      logCtrl.checkLogIn = function() {
          var token = $window.localStorage.getItem('token')
          if (token) {
            console.log('loggedIn: TRUE')
            logCtrl.isLoggedIn = true
          } else {
            console.log('loggedIn: FALSE')
            logCtrl.isLoggedIn = false
          }
      }


      // logCtrl.isLoggedIn = function() {
      //     if ($rootScope.currentUserSignedIn) {
      //       console.log('loggedIn: TRUE')
      //       return true
      //     } else {
      //       console.log('loggedIn: FALSE')
      //       return false
      //     }
      // }

      //
      // logCtrl.twitterBot = function() {
      //     twitterBotFactory.botConnect('realDonaldTrump').then(function(twitterBotResponse){
      //         console.log('twitterBotResponse', twitterBotResponse)
      //     })
      // }

        //create login method to send user info to server
        logCtrl.showLogin = function(){
            console.log('route: show login page!')
            // $state.transitionTo('login')
            $state.go('login')
        }

      //create login method to send user info to server
      logCtrl.login = function(){
        $http.post('/login',{username: logCtrl.username, password: logCtrl.password})
        .then(function(response){
            console.log("from login route",response)
             var token = response.data.token
             if(token){
              //  $rootScope.currentUserSignedIn = true
               console.log('running checkLogIn ==============')
               $window.localStorage.setItem('token',token)
               logCtrl.checkLogIn()
               $state.go('dashboard')
             }else{
               console.log("no token found")
             }
        })
      }

      // LOG OUT - Remove Token
      logCtrl.logout = function(){
        console.log('logging off!')
        $window.localStorage.removeItem('token')
        $state.go('login')
        logCtrl.checkLogIn()
      }
    }


  // routerConfig.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', 'botController']

  // ROUTER CONFIGURATION
  function routerConfig ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: './partials/landing.html',
        // controller: 'loginController as logCtrl',
        authenticate: false
      })
      .state('login', {
        url: '/login',
        templateUrl: './partials/login.html',
        // controller: 'loginController as logCtrl',
        authenticate: false
      })
      .state('logout', {
        url: '/logout',
        templateUrl: './partials/landing.html',
        // controller: 'loginController as logCtrl',
        authenticate: false
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: './partials/dashboard.html',
        controller: 'botCtrl as bCtrl',
        authenticate: true
      })
      .state('twitterbot', {
        url: '/twitterbot',
        templateUrl: './partials/twitterbot.html',
        controller: 'botCtrl as bCtrl',
        authenticate: true
      })
      .state('googlebot', {
        url: '/googlebot',
        templateUrl: './partials/googlebot.html',
        controller: 'botCtrl as bCtrl',
        authenticate: true
      })
      .state('datatemple', {
        url: '/datatemple',
        templateUrl: './partials/datatemple.html',
        controller: 'botCtrl as bCtrl',
        authenticate: true
      })
      .state('autobot', {
        url: '/autobot',
        templateUrl: './partials/autobot.html',
        controller: 'botCtrl as bCtrl',
        authenticate: true
      })

    $urlRouterProvider.otherwise('/')
  }

  }());
