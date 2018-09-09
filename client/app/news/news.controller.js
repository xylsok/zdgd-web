/*  Created by cassandra on 2017/2/9. */
'use strict';
(function () {
  function Controller($scope, $http) {
    $scope.nessCore = {
      _getNews: function () {
        $http.get('/api/hbzd/getnews?type=news', $scope.nessCore.bean)
          .success(function (data) {
            var list = [];
            data.forEach(function (x) {
              var date = timeFormat(x.createDate);
              var s = date.lastIndexOf("/");
              x.d=date.substring(s+1);
              x.ym=date.substring(0,s);
              if (x.context && x.context.length >= 150) {
                x.context = x.context.substring(0, 149);
              }
              list.push(x);
            })
            $scope.nessCore.list = list;
          })
      }
    }
    function timeFormat(nS) {
      return new Date(parseInt(("/Date("+nS+")/").substr(6, 13))).toLocaleDateString();
    };
    $scope.nessCore._getNews();
  }
  angular.module('huafeiWebApp')
    .controller('NewsController', Controller);
})();
