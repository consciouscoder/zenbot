(function () {
  angular.module('jwt', ['ui.router'])
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

    // LOGIN CONTROLLER
    function loginCtrl ($http, $state, $window, $rootScope, $location) {
      var logCtrl = this
      logCtrl.page = 'Login'
      $http.get('/api/friends')
        .then(function(response){
          console.log(response)
          logCtrl.friends = response.data.friends[0]
          console.log(logCtrl.friends)
        })

      //create login method to send user info to server
      logCtrl.login = function(){
        $http.post('/login',{username: logCtrl.username, password: logCtrl.password})
        .then(function(response){
            console.log("from login route",response)
             var token = response.data.token
             if(token){
               $window.localStorage.setItem('token',token)
               $state.go('profile')
             }else{
               console.log("no token found")
             }
        })
      }
      logCtrl.logout = function(){
        $window.localStorage.removeItem('token')
        $state.go('login')
      }
    }

  // ROUTER CONFIGURATION
  function routerConfig ($stateProvider, $urlRouterProvider,$httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: './partials/login.html',
        controller: 'loginController as logCtrl',
        authenticate: false
      })
      .state('profile', {
        url: '/profile',
        templateUrl: './partials/profile.html',
        controller: 'loginController as logCtrl',
        authenticate: true
      })

    $urlRouterProvider.otherwise('/')
  }

  }());
