'use strict';

angular.module('huafeiWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'productDetailController',
        controllerAs: 'product'
      });
  });
