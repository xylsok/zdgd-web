'use strict';

angular.module('huafeiWebApp')
  .factory('Auth', function Auth($http, User, $cookies, $q) {
    var currentUser = {};
		// App clientId must required. but Secret not.
		var clientId = '';
		return {
			getClientId: function () {
				return clientId;
			},
			logout: function () {
				$cookies.remove('token');
				$cookies.remove('user');
			},
			getUser: function () {
				var u = $cookies.get('user');
				var t = $cookies.get('token');
				if (u) {
					var user = JSON.parse(u);
					if (user && user.userId && t && user.role && user.role > 0) {
						return user;
					}
				}
				//如果不能获取正常的用户, 则清除所有无效的cookie, 两个方法保证生效.
				$cookies.put('user', '');
				$cookies.put('token', '');
				$cookies.remove('token');
				$cookies.remove('user');
				return null;
			},
			setUser: function (user) {
				var ustr = JSON.stringify(user);
				$cookies.put('user', JSON.stringify(user));
			},
			
			setToken: function (t) {
				$cookies.put('token', t);
			},
			
			isAnonymous: function () {
				var user = this.getUser();
				if (user === null || !user.role) {
					return true;
				}
				return user.role == 1;
			},
			login: function (user) {
				if (!clientId) {
					console.log('没有ClientId, 不能执行.');
					return;
				}
				
				var self = this;
				var deferred = $q.defer();
				var parameter = {
					username: user.username,
					password: user.password,
					clientId: clientId
				};
				$http.post('/uc3/login/pwd', parameter)
					.success(function (data) {
						if (data.role) {
							var _storage = {
								userId: data.userId,
								username: data.username,
								nickname: data.nickname,
								oid: data.oid,
								role: data.role
							};
							self.setUser(_storage);
							self.setToken(data.token);
							deferred.resolve(data);
						}
						else {
							
							deferred.reject(data.message);
						}
					})
					.error(function (err) {
						deferred.reject(err);
					}.bind(this));
				return deferred.promise;
			},
			ipCheck: function () {
				
				var deferred = $q.defer();
				if (!clientId) {
					deferred.reject('没有ClientId, 不能执行.');
					return deferred.promise;
				}
				
				var parameter = {
					grantType: 'ip',
					clientId: clientId
				};
				$http.get('/uc3/login/ip?clientId=' + clientId)
					.success(function (data) {
						if (data.role) {
							var u = {
								userId: data.userId,
								username: data.organName,
								nickname: data.nickname,
								oid: data.oid,
								role: data.role,
								ip: data.ip,
								token: data.token,
								shortName: data.shortName
							};
							deferred.resolve(u);
						}
						else {
							deferred.reject(data);
						}
					})
					.error(function (err) {
						deferred.reject(err);
					}.bind(this));
				return deferred.promise;
			},
			ipLogin: function (successCallBack, failureCallBack) {
				this.ipCheck()
					.then(function (data) {
						if (data && data.userId && data.token && data.role) {
							var ustr = JSON.stringify(data);
							$cookies.put('user', JSON.stringify(data));
							$cookies.put('token', data.token);
							//登录成功后, 如果有回调函数, 则执行回调.
							if (successCallBack) {
								successCallBack(data);
							}
						}else{
							if(failureCallBack){
								failureCallBack('用户信息格式不正确');
							}
						}
					}, function (e) {
						if(failureCallBack){
							failureCallBack(e);
						}
						console.log('Ip登录出错', e);
					});
			}
		};
});
