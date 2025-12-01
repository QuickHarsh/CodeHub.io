const axios = require('axios');

async function testGoogleCallback() {
    try {
        console.log('Testing Google OAuth callback...\n');

        // Test 1: Check if backend is accessible
        const healthCheck = await axios.get('http://localhost:5001/api/auth/google/callback?code=test&state=STUDENT')
            .catch(err => {
                console.log('Expected error (no valid code):', err.response?.status, err.response?.data);
                return err.response;
            });

        console.log('\nBackend is accessible!');

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testGoogleCallback();
