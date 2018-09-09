/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sys-main', {
				url: '/system/main',
				templateUrl: 'app/sys/main/sys-main.html',
				controller: 'SysMainController'
			});
	});
