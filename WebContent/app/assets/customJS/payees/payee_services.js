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

boss_payee_module.factory('PayeeNewEditService', ['$http',function($http) {
    return {
      newedit: function(selected_lc_id) {
		 var payee = '{"type":"Individual","name":"Saurabh Sarathe","address1":"9709 Campus Walk Ln","address2":"Apt G","city":"Indore","state":"Madhya Pradesh","country":"India","zip":"451666","phoneNo":"7048199104","email":"saurabh@swapstech.com","bank":{"recordKey":"BD000000000P","modificationFlag":null,"officeType":null,"parentOfficeKey":null,"headOfficeKey":null,"legalType":null,"legalParentKey":null,"groupType":null,"groupParentKey":null,"institutionStatus":null,"cooperativeGroupKey":null,"isoLeiCode":null,"bic8":null,"branchBic":null,"bic":"AACSDE33XXX","chipsUid":null,"nationalId":"39050000","connectedBic":null,"institutionName":"SPARKASSE AACHEN","branchInformation":null,"pobNumber":null,"streetAddress1":"MUENSTERPLATZ 7-9","streetAddress2":null,"streetAddress3":null,"streetAddress4":null,"city":"AACHEN","cps":null,"zipCode":"52059","countryName":"GERMANY","isoCountryCode":"DE","timeZone":null,"subTypeIndicator":null,"networkConnectivity":null,"branchQualifiers":null,"serviceCodes":null,"ssiGroupKey":null,"ccyCode":"EUR","ibanKey":null,"ibanNationalId":null,"fieldA":null,"fieldB":null},"accountNumber":"123456789","intermediaryBank":"","nickName":"Bobby","reAccountNumber":"123456789"}';
		return JSON.parse(payee);
		/**
        var actionUrl = '../initPayeeForm';
        actionUrl = actionUrl+'?lcId='+selected_lc_id+'&operation='+mode;
        console.log('actionUrl is >>>'+actionUrl);
        return $http.get(actionUrl).then(function(response) {
			return response.data;
        });
		**/
      }
    };
  }]);