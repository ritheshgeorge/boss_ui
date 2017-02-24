module.exports = function(grunt){
	grunt.initConfig({
	  concat: {
		js: {
		  src: ['WebContent/app/assets/customJS/payees/manage_payees.js', 'WebContent/app/assets/customJS/payees/payee_services.js'
		  ,'WebContent/app/assets/customJS/accounts/account_activity.js','WebContent/app/assets/customJS/accounts/account_services.js','WebContent/app/assets/customJS/accounts/account_statement.js','WebContent/app/assets/customJS/accounts/account_summary.js','WebContent/app/assets/customJS/Payments/payment_activity.js','WebContent/app/assets/customJS/Payments/payment_services.js','WebContent/app/assets/customJS/boss_app.js'],
		  dest: 'dist/js/script.js',
		},
		
	  },
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
};