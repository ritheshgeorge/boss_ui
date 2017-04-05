'use strict';

angular.module('bossApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'AUTH_EVENTS','$state' ,'$cookies',
function($http, $rootScope, $window, AUTH_EVENTS,$state,$cookies) {
	var authService = {};
	
	
	//the login function
	authService.login = function(user, success, error) {
		var req = {
		        method: 'GET',
		        url: $cookies.path + 'twoFactorAuthentication/authenticateUser',
		        params: {
		            userName: user.username,
					password: user.password
		        }
		    }
		if(($cookies.user==undefined || $cookies.user=='false') && (user != undefined && user.password != undefined && user.username !=undefined)){
		$http(req).success(function(data) {
		//user is returned with his data from the db
		var users = data;
		console.log("users",users);
		if((users!=undefined || user!=null)){
			var loginData = users;
			//insert your custom login function here 
			if(users.userName===user.username){
				//set the browser session, to avoid relogin on refresh
				//$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
				loginData.userRole = "admin";
				//delete password not to be seen clientside 
				delete loginData.password;
				$cookies.user = JSON.stringify(loginData);
				//update current user into the Session service or $rootScope.currentUser
				//$rootScope.currentUser = loginData;
				
				//fire event of successful login
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				//run success function
				success(loginData);
			} else{
				//OR ELSE
				//unsuccessful login, fire login failed event for 
				//the according functions to run
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				error();
			}
		}else{
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			error();
		}	
		});
		}
		
	};

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!$cookies.user;
	};
	
	//check if the user is authorized to access the next route
	//this function can be also used on element level
	//e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	authService.isAuthorized = function(authorizedRoles) {
		var _user = ($cookies.user!=undefined)?(JSON.parse($cookies.user)):null;
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(_user.userRole) !== -1);
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
		$cookies.user = false;
		$rootScope.modalShown=false;
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		//$state.go('login');
	}

	return authService;
} ]);