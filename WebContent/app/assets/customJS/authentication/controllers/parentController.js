'use strict';

angular.module('bossApp').
controller('ParentController', ['$scope', '$rootScope', '$modal', 'Auth', 'AUTH_EVENTS','USER_ROLES','$state','$cookies','ConfigService',
function($scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES,$state,$cookies,ConfigService){
	//get the config File and Update the rootscope for all the apis
	ConfigService.getConfig_path().success(function(data){
		console.log("API PATH: " + data.api_Path);
		$cookies.path = data.api_Path;
		$rootScope.path = data.api_Path;
		console.log("API PATH cookies: " + $cookies.path);
		console.log("API PATH rootScope: " + $rootScope.path);
	});
		
	// this is the parent controller for all controllers.
	// Manages auth login functions and each controller
	// inherits from this controller	
	
	$rootScope.modalShown = false;
	var showLoginDialog = function() {
		if(!$scope.modalShown){
			$rootScope.modalShown = true;
			$state.go("login");
		}
	};
	
	var setCurrentUser = function(){
		$scope.currentUser =  JSON.parse($cookies.user); //$rootScope.currentUser;	
	}
	
	var showNotAuthorized = function(){
		console.log("Not Authorized");
	}
	
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = Auth.isAuthorized;

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	
} ]);