'use strict';

angular.module('huafeiWebApp')
  .controller('NavbarCtrl', function ($scope,$state,$http) {
    $scope.menu = [
      {
        'title': '首页',
        'state': ['main']
      }, {
        'title': '产品中心',
        'state': ['product']
      }, {
        'title': '新闻资讯',
        'state': ['news']
      }, {
        'title': '合作加盟',
        'state': ['hzjm']
      }, {
        'title': '联系我们',
        'state': ['contactus']
      }
    ];
    $scope.core={};
    $scope.isActive = function (m) {
      return m.state.indexOf($state.current.name) >= 0;
    };
    $http.get('/api/hbzd/getAbout')
      .success(function (data) {
        $scope.core = data;
      })


  });
