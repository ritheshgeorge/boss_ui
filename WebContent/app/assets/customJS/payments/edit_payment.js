var app = angular.module('bossApp');
app.controller('editPaymentCtrl', ['$scope', '$http', '$state','$stateParams','PaymentService','ManagePayeeService','AccountSummaryService','$location','$rootScope',
function($scope,$http,$state,$stateParams,PaymentService,ManagePayeeService,AccountSummaryService,$location,$rootScope) {
	$location.hash('paymentForm_head');
	$scope.loading = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.numberOfDecimals = 2;
	$scope.pinVerified = false;
	$scope.paymentProcessed = false;
	
	
	
	PaymentService.getPayment($stateParams.paymentId).then(function(response){
			$scope.payment = response.data.payment;
			if(!$rootScope.isUndefined($scope.payment.recurringScheduleId)){
				/**/
				
				PaymentService.getRecurringPayment($scope.payment.id).then(function(response){
					console.log(response.data.recurringPayment);
					var _recurring = response.data.recurringPayment;
					$scope.recurringPayment = _recurring;
					$scope.firstPaymentDate = _recurring.firstPaymentDate;
					$scope.lastPaymentDate = _recurring.lastPaymentDate;
				});
			}
		//Load From and to accounts
		ManagePayeeService.payee_list().then(function(ps_data) {
        $scope.payeeList = ps_data;
			AccountSummaryService.bankAccount_list().then(function(as_data) {
			  $scope.accountList = as_data;
				//iterate to find selected option
				angular.forEach($scope.accountList, function(value, index) {
					if (angular.equals(value.id, $scope.payment.fromAccountId)) {
									$scope.bankAccount = value;
								}
							});
				angular.forEach($scope.payeeList, function(value, index) {
					if (angular.equals(value.id, $scope.payment.payeeAccountId)) {
									$scope.payee = value.id;
									$scope.selectedPayee=value;
								}
							});
				console.log("-----------------");
				console.log($scope.payment);
				console.log("-----------------");
			  $scope.loading = false; 
			});
		});
		
	
	});

	
	
	$scope.indexOfObject = function indexOfObject(array, property, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][property] === value) return i;
		}
		return -1;
	};
	/* Date Picker */
	$scope.minDate = new Date();
	$scope.openPaymentDate = function($event){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.openPaymentCal = true;
	}
	$scope.openFirstPaymentDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openFirstPaymentCal = true;
        }
		$scope.openLastPaymentDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openLastPaymentCal = true;
        }
	
	$scope.makePayment = function(){
		 if (!$scope.paymentForm.$error.required) {
			var _payment = $scope.payment;
			var _recurringPayment = $scope.recurringPayment;
			PaymentService.make_payment(_payment, _recurringPayment).then(function(data) {
                $state.go('home.makePayment.paymentActivity');
            });
		 }else{
			 $location.hash('payment_panel');
		 }
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
	/********************************
		Recurring PaymentService
		******************************/
		/****** watcher for recurring Payment *******/
		$scope.$watch('firstPaymentDate', function() {
			if(!$rootScope.isUndefined($scope.firstPaymentDate)){
				var _date = new Date($scope.firstPaymentDate);
				$scope.recurringPayment.firstPaymentDate = _date.toLocaleDateString();
			}
		});
		$scope.$watch('lastPaymentDate', function() {
			if(!$rootScope.isUndefined($scope.lastPaymentDate)){
				var _date = new Date($scope.lastPaymentDate);
				$scope.recurringPayment.lastPaymentDate = _date.toLocaleDateString();
			}
		});
		/******************************************/
	
	
	
}]);