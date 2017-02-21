var app = angular.module('bossApp', ['ui.router','ngMessages' ,'ui.bootstrap','angularFileUpload','ui.bootstrap']);
   app.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
		//$urlRouterProvider.otherwise('/root');    
    $stateProvider	
	.state('accounts',  {
        url : '/accounts',
        templateUrl: 'app/templates/accounts/account_listing.html',
	})
	.state('makePayment',  {
        url : '/payment',
        templateUrl: 'app/templates/payments/payments.html',
	})
	.state('makePayment.makeAPayment',  {
        url : '/newPayment',
        templateUrl: 'app/templates/payments/make_a_payment.html',
	})
	 .state('makePayment.paymentActivity',  {
        url : '/paymentActivity',
        templateUrl: 'app/templates/payments/payment_activity.html',
	})
	 .state('makePayment.managePayees',  {
        url : '/managePayees',
        templateUrl: 'app/templates/payees/manage_payees.html',
	})
	 .state('makePayment.addAPayee',  {
        url : '/addPayee',
        templateUrl: 'app/templates/payees/payees.html',
	})
	.state('makePayment.addAPayee.domesticPayee',  {
        url : '/domestionaPayee',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
	})
	.state('makePayment.addAPayee.internationalPayee',  {
        url : '/internationalPayee',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
	})
	.state('editPayment',  {
        url : '/editPayment',
        templateUrl: 'app/templates/payments/edit_payment.html',
	})
	.state('editRecurringPayment',  {
        url : '/editRecurringPayment',
        templateUrl: 'app/templates/payments/edit_recurring_payment.html',
	})/*
	.state('addPayee',  {
        url : '/addPayee',
        templateUrl: 'app/templates/payees/payees.html',
	})
	.state('addPayee.domesticPayee',  {
        url : '/domestionaPayee',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
	})
	.state('addPayee.internationalPayee',  {
        url : '/internationalPayee',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
	}) 
	.state('managePayees',  {
        url : '/managePayees',
        templateUrl: 'app/templates/payees/manage_payees.html',
	})*/
	.state('error',  {
        url : '/error',
        templateUrl: 'app/templates/404error.html',
	})
	.state('manageUsers',  {
        url : '/manageUsers',
        templateUrl: 'app/templates/admin/manage_users.html',
	})
	.state('addEditUser',  {
        url : '/updateUser',
        templateUrl: 'app/templates/admin/add_edit_user.html',
	})
}]);
