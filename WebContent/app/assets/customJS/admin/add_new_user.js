var app = angular.module('bossApp');
app.controller('userNewEditCtrl', ['$scope', '$http', '$state','$rootScope','$stateParams','UserNewEditService', 
function($scope,$http,$state,$rootScope,$stateParams,UserNewEditService) {
    $scope.loading=true;
	$http.defaults.headers.post["Content-Type"] = "application/json";
	if($stateParams.userId != undefined){
		// parameter lcId,PayeeId
		var entityId = "abc123abc";
		UserNewEditService.newedit(entityId,$stateParams.userId).then(function(data){
			$scope.user = data;
			$scope.loading=false;
		});
	}else{
		var user = {
			firstName   :"",
			lastName    :"",
			userName    :"",
			password    :"",
			email       :"",
			phoneNumber :"",
			status      :"New",
			entityId    :"",
			failedLogins:"0",
		};
		$scope.user = user;
		$scope.loading=false;
	}
	
	/*
	* Submit User
	*/
	$scope.submitUser = function(){
		var u_user = $scope.user;
		UserNewEditService.savePayee(u_user).then(function(response){
			if(response.data){
				$state.go("home.admin.manageUsers");
			}else{
				alert("UserName not available");
			}
		});
	}
	
	/**
		Two-Factor
	**/
	$scope.sendVerificationCode = function(method){
		console.log(method);
		//service call
		$scope.enterVerficationCode = true;
		$scope.pendingVerification = true;
	}
	$scope.verifyPin = function(pin){
		console.log(pin);
		//service call
		$scope.pinVerified = true;
	}
}]);
