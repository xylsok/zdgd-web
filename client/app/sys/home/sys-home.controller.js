'use strict';
(function () {
	function Controller($scope, $resource, $state, $http, $timeout) {
		$scope.sysHomeCore = {
      home:{},
      TJ:{},
      RX:{},
      _save:function(){
        $http.post('/api/hbzd/addorupdate',{companyProfile:$scope.sysHomeCore.home.companyProfile})
          .success(function (data) {
            alert('保存成功！');
          })
      },
      _get:function(){
        $http.get('/api/hbzd/getcompanyProfile')
          .success(function (data) {
            $scope.sysHomeCore.home = data;
          })
      },
      _getTuijian:function(){
        $http.get('/api/hbzd/getTuijian/0')
          .success(function (data) {
            console.log(data);
            $scope.sysHomeCore.home.tuijian = data;
          })
      },
      _saveTJ:function(){
        $scope.sysHomeCore.TJ.type=0;
        $http.post('/api/hbzd/saveTuijain',$scope.sysHomeCore.TJ)
          .success(function (data) {
            $scope.sysHomeCore.TJ={};
            $scope.sysHomeCore._getTuijian();
          })
      },
      _saveRX:function(){
        $scope.sysHomeCore.RX.type=1;
        $http.post('/api/hbzd/saveTuijain',$scope.sysHomeCore.RX)
          .success(function (data) {
            $scope.sysHomeCore.RX={};
            $scope.sysHomeCore._reXiao();
          })
      },
      _reXiao:function(){
        $http.get('/api/hbzd/getTuijian/1')
          .success(function (data) {
            $scope.sysHomeCore.home.reXiao = data;
          })
      },
      _afterSaveFile0:function(x,o){
        $scope.sysHomeCore.TJ.path=x;

      },
      _afterSaveFile:function(x,o){
        $scope.sysHomeCore.RX.path=x;
      },
      _afterSaveFile2:function(x,o){
        $scope.sysHomeCore._getLuBoDatu();
      },
      _remove:function(id){
        $http.delete('/api/hbzd/del/'+id)
          .success(function (data) {
            $scope.sysHomeCore._getTuijian();
            $scope.sysHomeCore._reXiao();
          })
      },
      _removeDatu:function(id){
        $http.delete('/api/hbzd/deldatu/'+id)
          .success(function (data) {
            $scope.sysHomeCore._getLuBoDatu();
          })
      },
      _getLuBoDatu:function(){
        $http.get('/api/hbzd/getDatu/home')
          .success(function (data) {
            console.log(data);
            $scope.sysHomeCore.home.getDatu = data;
          })
      },
      _refresh:function(){
        $scope.sysHomeCore._get();
        $scope.sysHomeCore._getTuijian();
        $scope.sysHomeCore._reXiao();
        $scope.sysHomeCore._getLuBoDatu();
      }
    }
    $scope.sysHomeCore._get();
    $scope.sysHomeCore._getTuijian();
    $scope.sysHomeCore._reXiao();
    $scope.sysHomeCore._getLuBoDatu();

	}

	angular.module('huafeiWebApp')
		.controller('SysHomeController', Controller);
})();
