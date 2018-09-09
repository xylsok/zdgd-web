'use strict';
(function() {

function MainController($scope, $http,$state) {
  $scope.rxcp = true;
  $scope.mainCore = {
    home:{
      reXiao:[]
    },
    _get:function(){
      $http.get('/api/hbzd/getcompanyProfile')
        .success(function (data) {
          if(data&&data.companyProfile.length>=300){
            data.companyProfile=data.companyProfile.substring(0,300)+'.......';
          }
            $scope.mainCore.home = data;
        })
    },
    _reXiao:function(){
      var ss = sessionStorage.getItem("rexiao");
      if(ss){
        $scope.mainCore.home.reXiao=JSON.parse(ss);
      }
      $http.get('/api/hbzd/getTuijian/0')
        .success(function (data) {
          $scope.mainCore.home.reXiao = data;
          if(data){
            sessionStorage.setItem("rexiao",JSON.stringify(data));
          }
          $scope.mainCore.home.reXiao = data;
        })
    },
    _getTuijian:function(){
      var ss = sessionStorage.getItem("Tujian");
      if(ss){
        $scope.mainCore.home.tuijian=JSON.parse(ss);
      }
      $http.get('/api/hbzd/getTuijian/1')
        .success(function (data) {
          if(data){
            sessionStorage.setItem("Tujian",JSON.stringify(data));
          }
          $scope.mainCore.home.tuijian = data;
        })
    },
    _getLuBoDatu:function(){
      var ss = sessionStorage.getItem("lunbotu");
      if(ss){
        $scope.mainCore.home.lunBoDat=JSON.parse(ss);
      }
      $http.get('/api/hbzd/getDatu/home')
        .success(function (data) {
          if(data){
            sessionStorage.setItem("lunbotu",JSON.stringify(data));
          }
          $scope.mainCore.home.lunBoDatu = data;
        })
    },
    _getNews:function(){
      $http.get('/api/hbzd/getnews?type=news',$scope.mainCore.bean)
        .success(function (data) {
          var list =[];
          data.forEach(function(x){
            if(x.context&&x.context.length>=150){
              x.context = x.context.substring(0,149);
            }
            list.push(x);
          })
          $scope.mainCore.list=list;
        })
    },
    _getWenti:function(){
      $http.get('/api/hbzd/getnews?type=wenti',$scope.mainCore.bean)
        .success(function (data) {
          $scope.mainCore.list2=data;
        })
    },
    _toggle:function(){
      $scope.rxcp=!$scope.rxcp;
    }
  }
  $scope.mainCore._get();
  $scope.mainCore._reXiao();
  $scope.mainCore._getTuijian();
  $scope.mainCore._getLuBoDatu();
  $scope.mainCore._getNews();
  $scope.mainCore._getWenti();

}

angular.module('huafeiWebApp')
  .controller('MainController', MainController)
})();
