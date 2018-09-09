/*
 * Created by cassandra on 2017/2/9.
 */
'use strict';
angular.module('huafeiWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('sys-main.sys-category', {
				url: '/system/category',
				templateUrl: 'app/sys/category/sys-category.html',
				controller: 'SysCategoryController'
			});
	});
