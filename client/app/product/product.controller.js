'use strict';
(function() {

function MainController($scope, $http,$stateParams) {
  $scope.pCore = {
    list:[],
    _reXiao:function(){
      $http.get('/api/hbzd/getTuijian/0')
        .success(function (data) {
          data.forEach(function(x){
            $scope.pCore.list.push(x);
          })
        })
    },
    _getNews:function(){
      $http.get('/api/hbzd/getTuijian/1',$scope.pCore.bean)
        .success(function (data) {
          data.forEach(function(x){
            $scope.pCore.list.push(x);
          })
        })
    }
  }
  $scope.pCore._reXiao();
  $scope.pCore._getNews();

}

angular.module('huafeiWebApp')
  .controller('productDetailController', MainController)
})();
