'use strict';

angular.module('huafeiWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('detail2', {
        url: '/detail2/:id',
        templateUrl: 'app/detail2/detail2.html',
        controller: 'TJDetailController'
      });
  });
