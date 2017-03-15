'use strict';
var app = angular.module('bossApp', ['ui.router','ngMessages' ,'ui.bootstrap','angularFileUpload','ui.bootstrap','ngCookies']);
	/*Constants regarding user login defined here*/
app.constant('USER_ROLES', {
		all : '*',
		admin : 'admin',
		editor : 'editor',
		guest : 'guest'
	}).constant('AUTH_EVENTS', {
		loginSuccess : 'auth-login-success',
		loginFailed : 'auth-login-failed',
		logoutSuccess : 'auth-logout-success',
		sessionTimeout : 'auth-session-timeout',
		notAuthenticated : 'auth-not-authenticated',
		notAuthorized : 'auth-not-authorized'
	})
/* Adding the auth interceptor here, to check every $http request*/
app.config(function ($httpProvider) {
	  $httpProvider.interceptors.push([
	    '$injector',
	    function ($injector) {
	      return $injector.get('AuthInterceptor');
	    }
	  ]);
});
// Configure the main application module.

app.config(['$urlRouterProvider','$stateProvider','USER_ROLES',function($urlRouterProvider, $stateProvider,USER_ROLES) {
		$urlRouterProvider.when("/home", "/home/dashboard");		
		$urlRouterProvider.when("/home/payment", "/home/payment/paymentActivity");
		$urlRouterProvider.when("/home/payment/addPayee", "/home/payment/addPayee/domesticPayee");
		$urlRouterProvider.when("/home/manageUsers", "/home/manageUsers/manageUsers");
		
    $stateProvider	
	.state('login',  {
        url : '/login',
        templateUrl: 'login_form.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	})
	.state('home',  {
        url : '/home',
        templateUrl: 'boss_home.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	})
	.state('home.accounts',  {
        url : '/accounts',
        templateUrl: 'app/templates/accounts/account.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	  containerClass: 'accoutnSummary',
	})
	.state('home.accounts.allAccounts',  {
        url : '/all',
        templateUrl: 'app/templates/accounts/account_listing.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	  containerClass: 'accoutnSummary',    
	})
	.state('home.accounts.activity',  {
        url : '/activity/:accountId',
        templateUrl: 'app/templates/accounts/account_activity.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	  containerClass: 'accoutnSummary',    
	})
	.state('home.accounts.accountStatement',  {
        url : '/statements',
        templateUrl: 'app/templates/accounts/account_statement.html',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	  containerClass: 'statemensts',    
	})
	   
	
	
	
	
	
	
	.state('home.makePayment',  {
        url : '/payment',
        templateUrl: 'app/templates/payments/payments.html',
		containerClass: 'paymentActivity',
		data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      },
	})
	.state('home.makePayment.makeAPayment',  {
        url : '/newPayment',
        templateUrl: 'app/templates/payments/make_a_payment.html',
		containerClass: 'makePayment',
	})
	 .state('home.makePayment.paymentActivity',  {
        url : '/paymentActivity',
        templateUrl: 'app/templates/payments/payment_activity.html',
		containerClass: 'paymentActivity',
	})
	 .state('home.makePayment.managePayees',  {
        url : '/managePayees',
        templateUrl: 'app/templates/payees/manage_payees.html',
		containerClass: 'managePayees',
	})
	.state('home.makePayment.addAPayee',  {
        url : '/addPayee', 
        templateUrl: 'app/templates/payees/payees.html',
		containerClass: 'domesticPayee',
	})
	.state('home.makePayment.addAPayee.domesticPayee',  {
        url : '/domesticPayee',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
		containerClass: 'domesticPayee',
	})
	.state('home.makePayment.addAPayee.internationalPayee',  {
        url : '/internationalPayee',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
		containerClass: 'internationalPayee',
	})
	.state('home.makePayment.addAPayee.editDomesticPayee',  {
        url : '/editDomesticPayee/:payeeId',
        templateUrl: 'app/templates/payees/add_new_payee_domestic.html',
		containerClass: 'domesticPayee',
	})
	.state('home.makePayment.addAPayee.editInternationalPayee',  {
        url : '/editInternationalPayee/:payeeId',
        templateUrl: 'app/templates/payees/add_new_payee_international.html',
		containerClass: 'internationalPayee',
	})
	.state('home.makePayment.editPayment',  {
        url : '/editPayment/:paymentId',
        templateUrl: 'app/templates/payments/edit_payment.html',
		containerClass: 'paymentActivity',
	})
	.state('home.makePayment.editRecurringPayment',  {
        url : '/editRecurringPayment/:paymentId',
        templateUrl: 'app/templates/payments/edit_recurring_payment.html',
		containerClass: 'paymentActivity',
	})
	.state('home.error',  {
        url : '/error',
        templateUrl: 'app/templates/404error.html',
		data: {
          authorizedRoles: [USER_ROLES.admin]
      },
	})
	.state('home.admin',  {
        url : '/manageUsers',
        templateUrl: 'app/templates/admin/admin.html',
		containerClass: 'manageUser',
	})
	.state('home.admin.manageUsers',  {
        url : '/manageUsers',
        templateUrl: 'app/templates/admin/manage_users.html',
		containerClass: 'manageUser',
	})
	.state('home.admin.addUser',  {
        url : '/addUser',
        templateUrl: 'app/templates/admin/add_edit_user.html',
		containerClass: 'addUser',
	})
	.state('home.admin.addEditUser',  {
        url : '/updateUser/:userId',
        templateUrl: 'app/templates/admin/add_edit_user.html',
		containerClass: 'addUser',
	})
	.state('home.dashboard',  {
        url : '/dashboard',
        templateUrl: 'app/templates/admin/dashboard.html',
		
	})
}]);
/*
*  containerClass is used to maintain the classes for ultimate userExperience and Easy to use.

app.run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.containerClass = toState.containerClass;
  });
})*/
