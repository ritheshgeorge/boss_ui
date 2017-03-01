/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('bossApp').run(function($rootScope, $state, Auth, AUTH_EVENTS,$cookies) {
	
	//before each state change, check if the user is logged in
	//and authorized to move onto the next state
	$rootScope.$on('$stateChangeStart', function (event, next) {
	    var authorizedRoles = next.data.authorizedRoles;
		if (!Auth.isAuthorized(authorizedRoles)) {
	      event.preventDefault();
		  console.log("Auth.isAuthenticated(): "+Auth.isAuthenticated());
		  console.log();
	      if (Auth.isAuthenticated()) {
	        // user is not allowed
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	      } else {
	        // user is not logged in
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      }
	    }else{
			$rootScope.currentUser = JSON.parse($cookies.user);
		}
	  });
	
	$rootScope.logout = function(){
		Auth.logout();
		location.reload();
	};
	
	$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.containerClass = toState.containerClass;
  });
});