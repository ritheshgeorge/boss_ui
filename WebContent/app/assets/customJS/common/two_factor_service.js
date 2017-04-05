var TwoFA_service = angular.module('bossApp');
TwoFA_service.factory('TwoFAService', ['$http','$cookies', function($http,$cookies) {
	
	 return {
		is2FARequired: function(_wireAmount, _wireCcy, _wireDate) {
			var _user = JSON.parse($cookies.user);
			req = {
		        method: 'GET',
		        url: $cookies.path + 'TwoFactorAuthentication/is2FARequired',
		        params: {
		            entityId: _user.entityId,
					userId: _user.id,
					wireAmount: _wireAmount,
					wireCcy: _wireCcy,
					wireDate: _wireDate
				}
		    }
			return $http(req).success(function(response) {
					return response;
			});
		}
	};
}]);