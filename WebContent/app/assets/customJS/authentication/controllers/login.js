'use strict';
angular.module('bossApp')
.controller('LoginCtrl', [ '$scope', '$state' , '$window', 'Auth','$cookies',
function($scope, $state, $window, Auth,$cookies ) {
	
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;
	
	//when the form is submitted
	$scope.submit = function() {
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server with the Auth service
	$scope.login = function(credentials) {
		$scope.error = false;
		Auth.login(credentials, function(user) {
			//success function
			$state.go('home');
		}, function(err) {
			$scope.error = true;
		});
	};
	
	// if a session exists for current user (page was refreshed)
	// log him in again
	if ($cookies.user) {
		var credentials = JSON.parse($cookies.user);
		$scope.login(credentials);
	}

} ]);
