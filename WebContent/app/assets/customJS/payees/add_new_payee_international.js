var app = angular.module('bossApp');
app.controller('addNewInternationalPayeeCtrl', ['$scope', '$http', '$state','BankService','$stateParams','PayeeNewEditService', function($scope,$http,$state,BankService,$stateParams,PayeeNewEditService) {
	$scope.loading = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.lookupBy="Swift";
	$scope.confirmPayeeInfo = false;
	// This should be callBack Function Update once done with API
	//PayeeNewEditService.newedit($stateParams.lcId).then(function(data) { console.log("Test Succesfull");});
	if($stateParams.payeeId != undefined){
		// parameter lcId,PayeeId
		PayeeNewEditService.newedit("leId",$stateParams.payeeId).then(function(data){
			$scope.payee = data;
			$scope.loading = false;
		});
	}else{
		var payee = {
		isInternational : true,
		recipientType : "Individual",
		legalName : "",
		aliasName : "",
		legalAddress : {
			address1: "",
			address2: "",
			city: "",
			state:"",
			country: "India",
			postalCode: "",
		},
		phoneNumber : "",
		emailAddress : "",
		accountWithBank: "",
		accountNumber: "",
		accountCcy:"",
		};
		$scope.payee = payee;
		$scope.loading = false;
	}
	
	
	
	
	
	
	$scope.addPayee = function(){
		if(!$scope.payeeForm.$error.required){
			$scope.confirmPayeeInfo = true;
		//	console.log("Submiting payeeForm ....");
		//	console.log($scope.payee);
		//	console.log(JSON.stringify($scope.payee));
		}
	}
	/*
	*   Typeahead for Bank by bic
	*/
	$scope.payeeBankSR = function(site){
		console.log(site);
		$scope.payee.accountWithBank = site;
	}
	$scope.getBanks = function(val) {
		var data = BankService.bank_list(val);
		return data.BicList;
	};
	/*
	*   Typeaheadvon on select for Intermidiary Bank by bic
	*/
	$scope.payeeIntermediaryBankSR = function(site){
		console.log(site);
		$scope.payee.intermediaryBank = site;
	}
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
		console.log($scope.payee);
		var payee= $scope.payee;
		PayeeNewEditService.savePayee(payee);
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
