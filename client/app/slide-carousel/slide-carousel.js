/**
 * Created by cassandra on 16/3/31.
 */
'use strict';
angular.module('huafeiWebApp')
	.directive('slideCarousel', function () {
		return {
			templateUrl: 'app/slide-carousel/slide-carousel.html',
			restrict: 'EA',
			controller: 'SlideCarouselController',
			replace: true,
			scope: {
				data: '='
			}
		};
	});
angular.module('huafeiWebApp')
	.controller('SlideCarouselController', function ($scope, $attrs, $filter, $interval) {
		$scope.index = 0;
		$scope.auto = true;
		$scope.timer = $interval(function () {
			if ($scope.data && $scope.data.length)
				$scope.index = ($scope.index + 1 ) % $scope.data.length;
		}, 3000);
		$scope.set = function (index) {
			if ($scope.auto) {
				$scope.auto = false;
				$interval.cancel($scope.timer);
			}
			index = index % $scope.data.length;
			$scope.index = index < 0 ? $scope.data.length + index : index;
		};
	});
