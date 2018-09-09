/*  Created by cassandra on 2017/2/9. */
'use strict';
(function () {
  function Controller($scope,$http) {
    $scope.core={
      list:[],
      bean:{},
      _add:function(){

      },
      _afterSaveFile:function(x,y){
        console.log(x, y);
        $scope.core.bean.path=x;
      },
      _save:function(){
        $scope.core.bean.type='wenti';
        if(!$scope.core.bean.title.length){
          alert("输入内容");
          return false
        }
        if($scope.core.bean.title.length>20){
          alert("过长的标题可能影响样式显示！20个字以内最好！");
          return false
        }
        $scope.core.bean.context=$scope.core.bean.context.replace(/\n|\r\n/g,"<br>");
        $http.post('/api/hbzd/addnews',$scope.core.bean)
          .success(function (data) {
            $scope.core._get();
            $scope.core.bean={};
            $scope.core.bean.path='';
          })
      },
      _get:function(){
        $http.get('/api/hbzd/getnews?type=wenti',$scope.core.bean)
          .success(function (data) {
            var list  = [];
            data.forEach(function(x){
              x.context=x.context.replace(/<br>/g,"\n");
              list.push(x);
            })
            $scope.core.list=list;
          })
      },
      _del:function(id){
        $http.delete('/api/hbzd/delnews/'+id)
          .success(function (data) {
            $scope.core._get();
          })
      }
    }
    $scope.core._get();
  }

  angular.module('huafeiWebApp')
    .controller('SysCategoryController', Controller);
})();
