'use strict';
(function() {

function MainController($scope, $http,$stateParams) {
  var id = $stateParams.id;
  $scope.detailCore = {
      bean:{},
      _get: function(){
        $http.get('/api/hbzd/getCjwtAndNews/'+id)
          .success(function (data) {
            $scope.detailCore.bean=data;
          })
      }
  }
  $scope.detailCore._get();
}

angular.module('huafeiWebApp')
  .controller('DetailController', MainController)
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
})();
