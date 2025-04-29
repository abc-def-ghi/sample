const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Add new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleted);
});

module.exports = router;
