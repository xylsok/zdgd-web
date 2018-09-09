'use strict';
(function() {

function MainController($scope, $http,$state) {
  $scope.core = {
    user:{},
    _login:function(){
      $http.get('/api/hbzd/getuser?username='+$scope.core.user.username+'&pwd='+$scope.core.user.password)
        .success(function (data) {
          if(data){
            sessionStorage.setItem("user",data);
            $state.go('sys-main');
          }else{
            $scope.login=false;
            alert("用户名或密码不正确！");
          }
        })
    }
  }

}

angular.module('huafeiWebApp')
  .controller('LoginController', MainController)
})();
