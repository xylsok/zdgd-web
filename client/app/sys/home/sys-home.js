/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sys-main.sys-home', {
				url: '/system/home',
				templateUrl: 'app/sys/home/sys-home.html',
				controller: 'SysHomeController'
			});
	});
