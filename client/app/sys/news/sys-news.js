/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sys-main.sys-news', {
				url: '/system/news',
				templateUrl: 'app/sys/news/sys-news.html',
				controller: 'SysAcadsController'
			});
	});
