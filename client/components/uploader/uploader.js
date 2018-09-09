/**
 * Created by cassandra on 16/1/11.
 */

'use strict';
//region ---------- Directive ----------
angular.module('huafeiWebApp')
	.directive('uploader', function () {
		return {
			templateUrl: 'components/uploader/uploader.html',
			restrict: 'E',
			replace: true,
			controller: 'UploaderCtrl',
			scope: {
				extension: '@',
				workstate: '@',
				callback: '&',
				callerror: '&',
				path: '@',
				text: '@'
			}
		};
	});
//endregion ---------- Directive ----------
//Controller
angular.module('huafeiWebApp')
	.controller('UploaderCtrl', function ($scope, $attrs, Upload, Auth, $timeout) {

		//region ----- Extension / Workstate -----
		$scope.extensionSet = {
			common: {
				size: {max: '2GB'},
				pattern: '.jpg,.png,.jpeg,.zip,.pdf,.iso,.txt,.mp4,.doc,.docx,.ppt,.pptx,.xls,.xlsx'
			},
			image: {size: {max: '5MB'}, pattern: 'image/*'},
			video: {size: {max: '1GB'}, pattern: '.mp4'},
			audio: {size: {max: '1GB'}, pattern: '.mp3'}
		};
		if (!$scope.extensionSet[$scope.extension]) {
			$scope.extension = 'common';
		}
		//console.log($scope.workstate);
		if (!$scope.workstate || !/^(min|mid|max)$/i.test($scope.workstate)) {
			$scope.workstate = 'mid';
		}
		//console.log($scope.workstate);
		$scope.isMedia = function (str) {
			return '.jpg.png.mp4'.indexOf($scope.getExtension(str)) > -1;
		};
		$scope.MediaSet = [{val: 'block', str: '普通'}, {val: 'icon', str: '图标'}, {val: 'inline', str: '小图'}];
		//endregion
		$scope.isWorking = false;
		$scope.isInvalid = '';
		$scope.atSelect = function (file, invalidFiles, myForm) {
			//console.log('atSelect>');
			//console.log('atSelect>', invalidFiles);
			if ($scope.workstate === 'min') {
				//console.log('atSelect>min');
				$scope.atSubmint(myForm, invalidFiles);
			}
			if ($scope.workstate === 'max') {
				$scope.success = null;
			}
		};
		$scope.atClick = function (myForm) {
			//console.log('atClick>');
			if ($scope.workstate === 'min') {
				if (!$scope.isWorking) {
					$('#uploader_file').trigger('click');
				}
			}
			else {
				//console.log('atClick>mid|max');
				$scope.atSubmint(myForm);
			}
		};
		$scope.atSubmint = function (from, invalidFiles) {
			//console.log('atSubmint>', from);
			if (from.$valid) {
				//console.log('atSubmint>valid', $scope.file);
				$scope.isInvalid = '';
				$scope.success = null;
				$scope.isWorking = true;
				$scope.errorMsg = '';
				$scope.doUpload($scope.file, invalidFiles);
			}
			else if (from.file.$error.maxSize) {
				//console.log(from.file.$error.maxSize);
				$scope.atInvalid($scope.extensionSet[$scope.extension].size.max);
			}
			else if (from.file.$error.pattern) {
				$scope.atInvalid($scope.extensionSet[$scope.extension].pattern);
			} else {
				$scope.atInvalid(from.file.$error);
			}
		};
		$scope.doUpload = function (file, errFiles) {

			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				var __path = $scope.path;
				file.upload = Upload.upload({
					url: '/api/hbzd/upload/'+__path,
					data: {file: file}
				});
				file.upload.then(function (response) {
					var data = response.data;
					var icon = data.rootUrl + data.filePath;
					$timeout(function () {
						file.result = response.data;
						$scope.isWorking = false;
						if ($scope.workstate === 'max') {
							$scope.success = icon;
						}
						else {
							$scope.doRegist(data);
						}
					});
				}, function (response) {
					if (response.status > 0) {
						$scope.atError('上传失败! 建议刷新页面后重试,原因可能是:' + response.status + ': ' + response.data);
					}
				}, function (evt) {
					file.progress = Math.min(100, parseInt(100.0 *
						evt.loaded / evt.total));
				});
			}
		};
		$scope.doRegist = function (result, filename) {
			//console.log('doRegist>', result)
			$scope.callback({o: result, fileName: filename});
			$scope.success = null;
		};
		$scope.atCancel = function () {
			$scope.success = null;
		};
		$scope.atSave = function () {
			$scope.doRegist($scope.success);
		};
		$scope.atInvalid = function (val) {
			$scope.isInvalid = val;
			if ($scope.workstate === 'min') {
				//alert('min mode show invalid : ' + val);
				$scope.callerror({o: val});
			}
			$timeout(function () {
				$scope.isInvalid = '';
			}, 5000);
		};
		$scope.atError = function (err) {
			if ($scope.workstate === 'min') {
				$scope.callerror({o: err});
			}
			$scope.errorMsg = err;
		};
		$scope.getExtension = function (filename) {
			if (filename && filename.lastIndexOf('.') > 0) {
				return filename.substring(filename.lastIndexOf('.') + 1).toLocaleLowerCase();
			}
			return '';
		};
	});

