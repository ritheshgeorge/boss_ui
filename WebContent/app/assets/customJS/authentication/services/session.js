'use strict';

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 *
angular.module('bossApp').service('Session', function($rootScope, USER_ROLES,$cookies) {

	this.create = function() {
		var user_cookie = JSON.parse($cookies.user);
		this.user = user_cookie;
		this.userRole = user_cookie.userRole;
	};
	this.destroy = function() {
		this.user = null;
		this.userRole = null;
		//delete cokkie
	};
	return this;
});*/