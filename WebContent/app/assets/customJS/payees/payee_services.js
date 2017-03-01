var boss_payee_module = angular.module('bossApp');

boss_payee_module.factory('ManagePayeeService', ['$http', function($http) {
    return {
        payee_list: function() {
			payeeJSON = '[{"id":"6860","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-02-24T20:35:20.630Z","accountNumber":"******5900","paymentCcy":"EUR","amount":500.58,"status":"Inactive","isInternational":true},{"id":"8306","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-02-25T20:35:20.630Z","accountNumber":"******6884","paymentCcy":"USD","amount":656.5799999999999,"status":"Active","isInternational":false},{"id":"2981","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-02-26T20:35:20.630Z","accountNumber":"******8950","paymentCcy":"CAD","amount":812.5799999999999,"status":"Inactive","isInternational":true},{"id":"7268","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-02-27T20:35:20.630Z","accountNumber":"******4427","paymentCcy":"USD","amount":968.5799999999999,"status":"Active","isInternational":false},{"id":"8435","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-02-28T20:35:20.630Z","accountNumber":"******2324","paymentCcy":"INR","amount":1124.58,"status":"Inactive","isInternational":true},{"id":"4543","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-01T20:35:20.630Z","accountNumber":"******6743","paymentCcy":"USD","amount":1280.58,"status":"Active","isInternational":false},{"id":"2304","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-02T20:35:20.630Z","accountNumber":"******7857","paymentCcy":"BTN","amount":1436.58,"status":"Inactive","isInternational":true},{"id":"1086","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-03T20:35:20.630Z","accountNumber":"******5230","paymentCcy":"USD","amount":1592.58,"status":"Active","isInternational":false},{"id":"5419","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-04T20:35:20.630Z","accountNumber":"******5813","paymentCcy":"BSD","amount":1748.58,"status":"Inactive","isInternational":true},{"id":"2980","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-05T20:35:20.630Z","accountNumber":"******5854","paymentCcy":"USD","amount":1904.58,"status":"Active","isInternational":false},{"id":"6309","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-06T20:35:20.630Z","accountNumber":"******3029","paymentCcy":"USD","amount":2060.58,"status":"Inactive","isInternational":false},{"id":"5157","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-07T20:35:20.630Z","accountNumber":"******7025","paymentCcy":"USD","amount":2216.58,"status":"Active","isInternational":false},{"id":"3232","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-08T20:35:20.630Z","accountNumber":"******6044","paymentCcy":"CUP","amount":2372.58,"status":"Inactive","isInternational":true},{"id":"3927","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-09T20:35:20.630Z","accountNumber":"******7300","paymentCcy":"USD","amount":2528.58,"status":"Active","isInternational":false},{"id":"3836","name":"Business Name","bank":{"name":"Bank of Western Hamisphere","address":"street name","city":"Charlotte","state":"NC","zipCode":"28262","Country":"USA"},"date":"2017-03-10T20:35:20.630Z","accountNumber":"******8574","paymentCcy":"CZK","amount":2684.58,"status":"Inactive","isInternational":true}]';
			return JSON.parse(payeeJSON);
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