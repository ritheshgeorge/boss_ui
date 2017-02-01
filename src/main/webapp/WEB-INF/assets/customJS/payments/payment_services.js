var boss_payment_module = angular.module('bossApp');

boss_payment_module.factory('PaymentActivityService', ['$http', function($http) {
    return {
        paymentActivity_list: function() {
            var account = {
                accountNicName: 'Business Account Name',
                accountName: 'Business Checking Account',
                accountNumber: '1234',
                accountCode: 'Checking',
                accountType: 'AccountType',
                accountBalance: 50000.50
            };
            var paymentActivityJSON = [];
            for (i = 0; i < 500; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                var amount = 50000.00;
                var paymentActivity = {
					id: "sd5cdg5aazxf8",
					transactionNumber : ((Math.floor(1000 + Math.random() * 9000))).toString(),
                    sendDate: date,
                    fromAccount: ("Business Checking Account - " + ((Math.floor(1000 + Math.random() * 9000)))).toString(),
					toAccount: "ABC Corporation",
                    amount: (i + 500.58),
					ccy: 'USD',
                    status: "New",
					isRecurring: (i % 2)?true:false
                }
                paymentActivityJSON.push(paymentActivity);
            }
            var acccountJSON = {
                paymentActivity: paymentActivityJSON
            }
            return acccountJSON;
            /**
        return $http.get('../getAccountActivity_list').then(function(response) {
          return response.data;
        }); */
        }
    };
}]);