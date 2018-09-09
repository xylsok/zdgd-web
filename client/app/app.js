'use strict';

angular.module('huafeiWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    // $sceDelegateProvider.resourceUrlWhitelist(['http://221.122.57.36/**']);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|rtsp|metel):/);
    $httpProvider.interceptors.push('authInterceptor'); // 设置拦截器
  }).factory('authInterceptor', function ($rootScope, $q, $cookies) {
  var state;
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      var token = $cookies.get('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      try {
        var sid = sessionStorage.getItem('sessionId');
        if (!sid) {
          sid = '';
        }
        config.headers.sessionId = sid;
      }
      catch (e) {
        console.log(e);
      }
      return config;
    },
    // Intercept 401s and redirect you to login
    responseError: function (response) {
      if (response.status === 401) {
      }
      return $q.reject(response);
    }
  };
}).run(function ($rootScope, $window, $http, $state) {
  // Redirect to login if route requires auth and the user is not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    document.title = next.pageTitle || '河北中东管件设备有限公司';
    $rootScope.ref = $state.current.url;
    //if (next.authenticate) {
    //}
  });
});

