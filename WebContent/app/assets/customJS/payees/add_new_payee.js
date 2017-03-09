var app = angular.module('bossApp');
app.controller('addNewPayeeCtrl', ['$scope', '$http', '$state','BankService','$rootScope','$stateParams','PayeeNewEditService', function($scope,$http,$state,BankService,$rootScope,$stateParams,PayeeNewEditService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.confirmPayeeInfo = false;
	$scope.lookupBy="Swift";
	if($stateParams.payeeId != undefined){
		// parameter lcId,PayeeId
		PayeeNewEditService.newedit("leId",$stateParams.payeeId).then(function(data){
			$scope.payee = data;
		});
	}else{
		var payee = {
		isInternational : false,
		recipientType : "Individual",
		legalName : "",
		aliasName : "",
		legalAddress : {
			address1: "",
			address2: "",
			city: "",
			state:"",
			country: "USA",
			postalCode: "",
		},
		phoneNumber : "",
		emailAddress : "",
		accountWithBank: "",
		accountNumber: "",
		accountCcy:"USD",
		};
		$scope.payee = payee;
	}
	/*
	*  Add Payee
	*/
	$scope.addPayee = function(){
		if(!$scope.payeeForm.$error.required){
			$scope.confirmPayeeInfo = true;
		}
	}
	/*
	*   Typeahead for Bank by bic
	*/
	$scope.payeeBankSR = function(site){
		console.log(site);
		$scope.payee.accountWithBank = site;
		//$scope.payee.bank = site;
	}
	$scope.getBanks = function(val) {
		var data = BankService.bank_list(val);
		return data.BicList;
	};
	/*
	*   TypeAhead for BankName by name
	*/
	$scope.getBanksNames = function(val) {
		var data = BankService.bank_name_list("US",val);
		return data.banksList;
    };
	/*
	*  TypeAhead for BankCity by city
	*/
	$scope.getCities = function(val) {
		var data = BankService.bank_city_list("US",$scope.bankName,val);
		return data.cityList;
    };
	/*
	*  TypeAhead for BankBranch by branch
	*/
	$scope.getBankBranch = function(val) {
		var data = BankService.bank_branch_list("US",$scope.bankName,$scope.bankCity,val);
		$scope.Banknames = data.bankList;
		return data.bankList;
    };
	
	/*
	*  Cancel Adding payee
	*/
	$scope.cancelAddingPayee = function(){
		$scope.confirmPayeeInfo = false;
	}
	/*
	* Confirm payee and add
	*/
	$scope.confirmPayee = function(){
		console.log("Submiting payeeForm ....");
		console.log($scope.payee);
		var _payee = $scope.payee; 
		PayeeNewEditService.savePayee(_payee);
		$state.go("home.makePayment.managePayees");
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
