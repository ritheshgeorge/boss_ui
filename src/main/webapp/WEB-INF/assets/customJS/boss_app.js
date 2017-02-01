var app = angular.module('bossApp', ['ui.router','ngMessages' ,'ui.bootstrap','angularFileUpload','ui.bootstrap']);
   app.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
		//$urlRouterProvider.otherwise('/root');    
    $stateProvider	
	.state('accounts',  {
        url : '/accounts',
        templateUrl: 'accounts/account_listing.html',
	})
	 .state('accountActivity',  {
        url : '/accountActivity',
        templateUrl: 'accounts/account_activity.html',
		controller: 'accountActivityCtrl',
     })
	 .state('makePayment',  {
        url : '/payment',
        templateUrl: 'payments/payments.html',
	})
	.state('editPayment',  {
        url : '/editPayment',
        templateUrl: 'payments/edit_payment.html',
	})
	.state('editRecurringPayment',  {
        url : '/editRecurringPayment',
        templateUrl: 'payments/edit_recurring_payment.html',
	})
	.state('addPayee',  {
        url : '/addPayee',
        templateUrl: 'payees/payees.html',
	})
	.state('managePayees',  {
        url : '/managePayees',
        templateUrl: 'payees/manage_payees.html',
	})
	.state('error',  {
        url : '/error',
        templateUrl: '404error.html',
	})
	.state('manageUsers',  {
        url : '/manageUsers',
        templateUrl: 'admin/manage_users.html',
	})
	.state('addEditUser',  {
        url : '/updateUser',
        templateUrl: 'admin/add_edit_user.html',
	})
}]);
