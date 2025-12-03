import { getCoursesByUser } from './src/index.js';

const userId = 119696101; // User ID from getSelf()

console.log(`Fetching courses for user ${userId}...`);

try {
  const courses = await getCoursesByUser(userId);
  console.log(`Found ${courses.length} courses:`);
  courses.forEach(course => {
    console.log(`- [${course.id}] ${course.name} (${course.course_code})`);
  });
} catch (error) {
  console.error('Error fetching courses:', error.message);
}
