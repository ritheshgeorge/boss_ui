var app = angular.module('bossApp');
app.controller('addNewPayeeCtrl', ['$scope', '$http', '$state','BankService', function($scope,$http,$state,BankService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.lookupBy="Swift";
	var payee = {
		type : "Individual",
		name : "",
		address1: "",
		address2: "",
		city: "",
		state:"",
		country: "USA",
		zip: "",
		phoneNo : "",
		email : "",
		bank: "",
		accountNumber: "",
	};
	$scope.payee = payee;
	console.log($scope.payee);
	
	$scope.addPayee = function(){
		if(!$scope.payeeForm.$error.required){
			console.log("Submiting payeeForm ....");
			console.log($scope.payee);
		}
	}
	/*
	*   Typeahead for Bank by bic
	*/
	$scope.payeeBankSR = function(site){
		console.log(site);
		$scope.payee.bank = site;
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
	
	
	
	
	
	
}]);
