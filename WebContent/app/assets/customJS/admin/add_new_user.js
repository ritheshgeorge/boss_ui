var app = angular.module('bossApp');
app.controller('userNewEditCtrl', ['$scope', '$http', '$state','$rootScope','$stateParams','UserNewEditService', 
function($scope,$http,$state,$rootScope,$stateParams,UserNewEditService) {
    $scope.loading=true;
	$http.defaults.headers.post["Content-Type"] = "application/json";
	var entitlement={
		managePayments:false,
		managUsers:false,
	};
	$scope.entitlement=entitlement;
	if($stateParams.userId != undefined){
		// parameter lcId,PayeeId
		var entityId = "abc123abc";
		UserNewEditService.newedit(entityId,$stateParams.userId).then(function(data){
			$scope.user = data;
			angular.forEach($scope.user.entitlements, function(value, index) {
			if (angular.equals(value.appId, "BOSS_MANAGEPAYMENT")) {
				$scope.entitlement.managePayments = true;
			}
			if (angular.equals(value.appId, "BOSS_MANAGEUSERS")) {
				$scope.entitlement.managUsers = true;
			}
		});
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
		var u_user = $scope.user;
		if(getEntitlements()){
			console.log($scope.user);
		
		}
		if(!$scope.userForm.$error.required && getEntitlements()){
		UserNewEditService.savePayee(u_user).then(function(response){
			if(response.data){
				$state.go("home.admin.manageUsers");
			}else{
				$scope.error = true;
				$scope.errorMsg = "UserName not available";
			}
		});
		}
	}
	/*
	* Add Entitlement object in user model
	*/
	function getEntitlements(){
		var _ent = $scope.entitlement;
		var entitlement_list = [];
		var entitlement = {
					appId : '',
					Description : '',
		};  
		if(_ent != undefined){
			if(_ent.managePayments){
				manage_p_entitlement = {appId : "BOSS_MANAGEPAYMENT",Description : "Manage Payments"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.managUsers){
				manage_u_entitlement = {appId : "BOSS_MANAGEUSERS",Description : "Manage Users"};
				entitlement_list.push(manage_u_entitlement);
			}
		}
		$scope.user.entitlements = entitlement_list;
		return true;
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
