/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sys-main.sys-lxwm', {
				url: '/system/lxwm',
				templateUrl: 'app/sys/lxwm/sys-lxwm.html',
				controller: 'SysLxwmController'
			});
	});
