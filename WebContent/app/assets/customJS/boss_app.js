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
		containerClass: 'makePayment',
	})
	.state('makePayment.makeAPayment',  {
        url : '/newPayment',
        templateUrl: 'app/templates/payments/make_a_payment.html',
		containerClass: 'makePayment',
	})
	 .state('makePayment.paymentActivity',  {
        url : '/paymentActivity',
        templateUrl: 'app/templates/payments/payment_activity.html',
		containerClass: 'paymentActivity',
	})
	 .state('makePayment.managePayees',  {
        url : '/managePayees',
        templateUrl: 'app/templates/payees/manage_payees.html',
		containerClass: 'managePayees',
	})
	.state('makePayment.addAPayee',  {
        url : '/addPayee', 
        templateUrl: 'app/templates/payees/payees.html',
		containerClass: 'domesticPayee',
	})
	.state('makePayment.addAPayee.domesticPayee',  {
        url : '/domesticPayee',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
		containerClass: 'domesticPayee',
	})
	.state('makePayment.addAPayee.internationalPayee',  {
        url : '/internationalPayee',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
		containerClass: 'internationalPayee',
	})
	.state('makePayment.addAPayee.editDomesticPayee',  {
        url : '/editDomesticPayee/:lcId',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
		containerClass: 'domesticPayee',
	})
	.state('makePayment.addAPayee.editInternationalPayee',  {
        url : '/editInternationalPayee/:lcId',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
		containerClass: 'internationalPayee',
	})
	.state('editPayment',  {
        url : '/editPayment',
        templateUrl: 'app/templates/payments/edit_payment.html',
	})
	.state('editRecurringPayment',  {
        url : '/editRecurringPayment',
        templateUrl: 'app/templates/payments/edit_recurring_payment.html',
	})
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
/*
*  containerClass is used to maintain the classes for ultimate userExperience and Easy to use.
*/
app.run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.containerClass = toState.containerClass;
  });
})
