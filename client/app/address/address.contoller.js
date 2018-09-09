'use strict';
(function () {

	function AddressController($http,$scope) {
    $http.get('/api/hbzd/getcompanyProfile')
      .success(function (data) {
        $scope.address = data;
      })
	}

	angular.module('huafeiWebApp')
		.controller('LxwmController', AddressController);

})();
