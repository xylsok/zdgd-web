/*  Created by cassandra on 2017/2/9. */
'use strict';
(function () {
    function Controller($scope,$http) {
      $scope.sysNewscore={
        list:[],
        bean:{},
        _add:function(){

        },
        _afterSaveFile:function(x,y){
          console.log(x, y);
          $scope.sysNewscore.bean.path=x;
        },
        _save:function(){
          $scope.sysNewscore.bean.type='news';
          if(!$scope.sysNewscore.bean.title.length){
              alert("输入内容");
              return false
          }
          if($scope.sysNewscore.bean.title.length>15){
            alert("过长的标题可能影响样式显示！15个字以内最好！");
            return false
          }
          $scope.sysNewscore.bean.context=$scope.sysNewscore.bean.context.replace(/\n|\r\n/g,"<br>");
          $http.post('/api/hbzd/addnews',$scope.sysNewscore.bean)
            .success(function (data) {
              $scope.sysNewscore._get();
              $scope.sysNewscore.bean={};
              $scope.sysNewscore.bean.path='';
            })
        },
        _get:function(){
          $http.get('/api/hbzd/getnews?type=news',$scope.sysNewscore.bean)
            .success(function (data) {
              var list  = [];
              data.forEach(function(x){
                x.context=x.context.replace(/<br>/g,"\n");
                list.push(x);
              })
              $scope.sysNewscore.list=list;
            })
        },
        _del:function(id){
          $http.delete('/api/hbzd/delnews/'+id)
            .success(function (data) {
              $scope.sysNewscore._get();
            })
        }
      }
      $scope.sysNewscore._get();
    }

    angular.module('huafeiWebApp')
        .controller('SysAcadsController', Controller);
})();
