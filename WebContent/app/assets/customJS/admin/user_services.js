var boss_user_module = angular.module('bossApp');

boss_user_module.factory('UserNewEditService', ['$http','$cookies',function($http,$cookies) {
    return {
		//Not implemented newEdit
      newedit: function(leId,userId) {
		 var actionUrl = $cookies.path+'user/getUser';
        actionUrl = actionUrl+'?leId='+leId+'&id='+userId;
        console.log('actionUrl is >>>'+actionUrl);
        return $http.get(actionUrl).then(function(response) {
			return response.data;
        });
	},
	  savePayee: function(user) {
			req = {
					method: 'POST',
					url: $cookies.path+'user/saveUser', 
					params: {userJSON: user }
					}
			return $http(req).success(function(response) {
							return response.data;
						}); 
		},
		getUserList: function(entityId){
			req = {
					method: 'GET',
					url: $cookies.path+'user/getUserList', 
					params: {leId: entityId }
					}
			return $http(req).success(function(response) {
							return response.data;
						}); 
		}
    };
  }]);
  
 
  
  
  
  
  
  
  
  
  
  
  
  