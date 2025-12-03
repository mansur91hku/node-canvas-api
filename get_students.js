import { getUsersInCourse, getOptions } from './src/index.js';

const courseId = 13426353; // Course ID from my_script.js

console.log(`Fetching students for course ${courseId}...`);

try {
  const students = await getUsersInCourse(courseId, getOptions.users.enrollmentType.student);
  console.log(`Found ${students.length} students:`);
  students.forEach(student => {
    console.log(`- [${student.id}] ${student.name}`);
  });
} catch (error) {
  console.error('Error fetching students:', error.message);
}
