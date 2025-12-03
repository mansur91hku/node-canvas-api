import { getCoursesByUser, getSelf } from './src/index.js';

console.log(`Fetching self...`);
const user = await getSelf();
const userId = user.id;

console.log(`Fetching courses for user ${userId} (${user.name})...`);

try {
  const courses = await getCoursesByUser(userId);
  console.log(`Found ${courses.length} courses:`);
  courses.forEach(course => {
    console.log(`- [${course.id}] ${course.name} (${course.course_code})`);
  });
} catch (error) {
  console.error('Error fetching courses:', error.message);
}
