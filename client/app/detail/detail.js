'use strict';

angular.module('huafeiWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('detail', {
        url: '/detail/:id',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailController',
        controllerAs: 'detail'
      });
  });
