import { getSelf } from './src/index.js';

console.log('Attempting to connect to Canvas API...');

try {
  const self = await getSelf();
  console.log('Successfully connected!');
  console.log('User details:', self);
} catch (error) {
  console.error('Error connecting to Canvas API:');
  console.error(error.message);
  console.log('\nPlease make sure you have set up your .env file correctly with CANVAS_API_TOKEN and CANVAS_API_DOMAIN.');
}
