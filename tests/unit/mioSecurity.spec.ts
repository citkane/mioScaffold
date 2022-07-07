describe('SECURITY UTILITY TESTS', function () {
	describe('Crytographic functions', function () {
		require('./mioSecurity/crypto/keys.spec');
		require('./mioSecurity/crypto/jwt.spec');
		require('./mioSecurity/crypto/passwords.spec');
	});	
});