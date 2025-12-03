import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as canvasAPI from './src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Helper to get all available functions
app.get('/api/list-functions', (req, res) => {
    const functions = Object.keys(canvasAPI)
        .filter(key => typeof canvasAPI[key] === 'function')
        .sort();
    res.json(functions);
});

// Generic runner endpoint
app.post('/api/run', async (req, res) => {
    const { functionName, args } = req.body;

    if (!functionName || !canvasAPI[functionName]) {
        return res.status(400).json({ error: `Function '${functionName}' not found` });
    }

    if (typeof canvasAPI[functionName] !== 'function') {
        return res.status(400).json({ error: `'${functionName}' is not a function` });
    }

    try {
        // args should be an array. If it's not, wrap it? No, expect array from client.
        const safeArgs = Array.isArray(args) ? args : [];
        console.log(`Running ${functionName} with args:`, safeArgs);
        
        const result = await canvasAPI[functionName](...safeArgs);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get current user info
app.get('/api/self', async (req, res) => {
    try {
        const self = await canvasAPI.getSelf();
        res.json(self);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get courses for a user
app.get('/api/courses', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const courses = await canvasAPI.getCoursesByUser(userId);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get students in a course
app.get('/api/students', async (req, res) => {
    try {
        const courseId = req.query.courseId;
        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }
        const students = await canvasAPI.getUsersInCourse(courseId, canvasAPI.getOptions.users.enrollmentType.student);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
