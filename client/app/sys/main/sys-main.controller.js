/*  Created by cassandra on 2017/2/9. */
'use strict';
(function () {
	function Controller($scope, $state) {
    var user  = sessionStorage.getItem("user");
    console.log(user);
    if(user){
      $scope.login=true;
    }else{
      $scope.login=false;
      $state.go("login");
    }
		$scope.sysmenu = [
			{name: '首页内容', icon: 'fa-home', state: ['.sys-home', '.sys-edit-figure']},
			{name: '新闻资讯', icon: 'fa-database', state: ['.sys-news']},
			{name: '常见问题', icon: 'fa-chain-broken', state: ['.sys-category']},
			{name: '联系我们', icon: 'fa-group', state: ['.sys-lxwm', '.sys-edit-organ']}
		];
    $scope.isSysActive = function (m) {
      return m.state.indexOf($state.current.name.replace('sys-main', '')) >= 0;
    };
    $scope.logout=function(){
      sessionStorage.setItem("user","");
      $state.go('main',null,{reload:true});
    }

	}

	angular.module('huafeiWebApp')
		.controller('SysMainController', Controller);
})();
