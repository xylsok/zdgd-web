'use strict';

angular.module('huafeiWebApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
      },
      controller:function($http,$scope){
        $http.get('/api/hbzd/getAbout')
          .success(function (data) {
            $scope.core = data;
          })
      }
    };
  });
