/*  Created by cassandra on 2017/2/9. */
'use strict';
(function () {
  function Controller($scope,$http) {
    $scope.sysLxwmCore={
      about:{},
      _submit:function(){
        $http.put('/api/hbzd/updateabout',$scope.sysLxwmCore.about)
          .success(function (data) {
            $scope.sysLxwmCore._get();
            alert("保存成功");
          })
      },
      _get:function(){
        $http.get('/api/hbzd/getAbout')
          .success(function (data) {
            console.log(data);
            $scope.sysLxwmCore.about = data;
          })
      }
    }
    $scope.sysLxwmCore._get();
  }

  angular.module('huafeiWebApp')
    .controller('SysLxwmController', Controller);
})();
