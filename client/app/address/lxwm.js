'use strict';

angular.module('huafeiWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('contactus', {
        url: '/contactus',
        templateUrl: 'app/address/address.html',
        controller: 'LxwmController',
        controllerAs: 'Lxwm'
      });
  });
