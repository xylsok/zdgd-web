'use strict';
(function() {

function MainController($scope, $http,$stateParams) {
  $scope.hzCore = {
    ppp:[
      {name:'1、提交申请   ',path:'assets/images/11.jpg'},
      {name:'2、电话沟通   ',path:'assets/images/22.jpg'},
      {name:'3、采购交接   ',path:'assets/images/33.jpg'},
      {name:'4、线下交流   ',path:'assets/images/44.jpg'},
      {name:'5、完成',path:'assets/images/55.jpg'}
    ],
    _submit:function(){
      alert("尊敬的客户您好,建议您直接拨打电话联系我们！");
    }
  }
  //$scope.core._reXiao();
  //$scope.core._getNews();

}

angular.module('huafeiWebApp')
  .controller('HzjmController', MainController)
})();
