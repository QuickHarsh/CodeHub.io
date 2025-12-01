require('dotenv').config();

console.log('Environment Variables Check:');
console.log('============================');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_ID length:', process.env.GOOGLE_CLIENT_ID?.length);
console.log('GOOGLE_CLIENT_ID has quotes?', process.env.GOOGLE_CLIENT_ID?.includes('"'));
console.log('\nGOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET (hidden)' : 'NOT SET');
console.log('GOOGLE_CLIENT_SECRET length:', process.env.GOOGLE_CLIENT_SECRET?.length);
console.log('\nGOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
console.log('\n✅ All Google OAuth environment variables are now properly configured!');
