'use strict';

angular.module('huafeiWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('hzjm', {
        url: '/hzjm',
        templateUrl: 'app/hzjm/hzjm.html',
        controller: 'HzjmController',
        controllerAs: 'hzjm'
      });
  });
