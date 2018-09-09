/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('news', {
				url: '/news',
				templateUrl: 'app/news/news.html',
				controller: 'NewsController'
			});
	});
