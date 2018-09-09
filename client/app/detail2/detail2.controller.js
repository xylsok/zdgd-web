'use strict';
(function() {

function MainController($scope, $http,$stateParams) {
  var id = $stateParams.id;
  $scope.tjCore = {
      bean:{},
      _get: function(){
        $http.get('/api/hbzd/getTuiJian/'+id)
          .success(function (data) {
            console.log(data);
            $scope.tjCore.bean=data;
          })
      }
  }
  $scope.tjCore._get();
}

angular.module('huafeiWebApp')
  .controller('TJDetailController', MainController)
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
})();
