import { getCourseAnalytics } from './src/index.js';

const courseId = 13426353; // Using the ID from previous context

console.log(`Fetching analytics for course ${courseId}...`);

try {
  const result = await getCourseAnalytics(courseId);
  console.log('Success:', result);
} catch (error) {
  console.error('Error caught:', error.message);
}
