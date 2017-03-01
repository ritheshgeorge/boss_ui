'use strict';

angular.module('bossApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'AUTH_EVENTS','$state' ,'$cookies',
function($http, $rootScope, $window, AUTH_EVENTS,$state,$cookies) {
	var authService = {};
	
	
	//the login function
	authService.login = function(user, success, error) {
		$http.post('misc/users.json').success(function(data) {
		//this is my dummy technique, normally here the 
		//user is returned with his data from the db
		console.log("Auth. Login Services; data.users ----");
		console.log(user);
		var users = data.users;
		if(users[user.username]){
			var loginData = users[user.username];
			//insert your custom login function here 
			if(user.username == loginData.username && user.password == loginData.username){
				//set the browser session, to avoid relogin on refresh
				//$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
				$cookies.user = JSON.stringify(loginData);
				//delete password not to be seen clientside 
				delete loginData.password;
				
				console.log("I am the new cookie updated one: ");
				console.log($cookies.user);
				//update current user into the Session service or $rootScope.currentUser
				$rootScope.currentUser = loginData;
				
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
		//Session.destroy();
		//$window.sessionStorage.removeItem("userInfo");
		$cookies.user = false;
		$rootScope.modalShown=false;
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		//$state.go('login');
	}

	return authService;
} ]);