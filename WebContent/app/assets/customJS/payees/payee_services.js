var boss_payee_module = angular.module('bossApp');

boss_payee_module.factory('ManagePayeeService', ['$http', function($http) {
    return {
        payee_list: function() {
			var bank = {
				name: 'Bank of Western Hamisphere',
				address: 'street name',
				city: 'Charlotte',
				state:'NC',
				zipCode: '28262',
				Country : 'USA'
			}
            var payeeJSON = [];
            for (i = 0; i < 15; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                var payee = {
					id: ((Math.floor(1000 + Math.random() * 9000))).toString(),
					name: 'Business Name',
					bank: bank,
                    date: date,
                    accountNumber: ("'******" + ((Math.floor(1000 + Math.random() * 9000)))).toString(),
					paymentCcy: 'USD',
					amount: ((i*156) + 500.58),
                    status: (i % 2 == 0)?'Inactive':'Active',
					isInternational : (i % 2 == 0)?true:((i % 3 == 0)?true:false),
                }
                payeeJSON.push(payee);
            }
            return payeeJSON;
            /**
        return $http.get('../getPayee_list').then(function(response) {
          return response.data;
        }); */
        }
    };
}]);