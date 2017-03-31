var app = angular.module('bossApp');
app.controller('userNewEditCtrl', ['$scope', '$http', '$state','$rootScope','$stateParams','UserNewEditService','EntitlementService', '$location',
function($scope,$http,$state,$rootScope,$stateParams,UserNewEditService,EntitlementService,$location) {
    $scope.loading=true;
	$http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.entitlement=EntitlementService.createEntitlement();
	if($stateParams.userId != undefined){
		// parameter lcId,PayeeId
		var entityId = "abc123abc";
		UserNewEditService.newedit(entityId,$stateParams.userId).then(function(data){
			$scope.user = data;
			$scope.entitlement = EntitlementService.setEntitlement($scope.user.entitlements);
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
			entitlements : [],
		};
		$scope.user = user;
		$scope.loading=false;
	}
	
	
	
	
	/*
	* Submit User
	*/
	$scope.submitUser = function(){
		$scope.userForm.$submitted = true;
		var u_user = $scope.user;
		$scope.user.entitlements = EntitlementService.getListOfEntitlement($scope.entitlement);
		console.log("isFormValid(): ");
		console.log($scope.userForm.phoneNumber.$error);
		if(isFormValid() && isPasswordValid()){
			UserNewEditService.savePayee(u_user).then(function(response){
				if(response.data){
					$state.go("home.admin.manageUsers");
				}else{
					$scope.error = true;
					$scope.errorMsg = "UserName not available";
				}
			});
		}else{
			$location.hash('page_start');
		}
	}
	
	function isPasswordValid(){
		return (!$scope.userForm.rePassword.$error.pattern && !$scope.userForm.password.$error.pattern)?true:false;
	}
	function isFormValid(){
		return ($scope.userForm.$error.required || $scope.userForm.$error.pattern || $scope.userForm.$invalid)?false:true;
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
