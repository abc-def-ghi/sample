const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary In-Memory "Database"
let students = [];
let currentId = 1;

// CREATE - Add a student
app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = { id: currentId++, name, age, grade };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// READ - Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// READ - Get a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// UPDATE - Update a student by ID
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (student) {
        const { name, age, grade } = req.body;
        student.name = name || student.name;
        student.age = age || student.age;
        student.grade = grade || student.grade;
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// DELETE - Remove a student by ID
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);
    if (index !== -1) {
        res.send({message: 'Student deleted successfully'});
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
