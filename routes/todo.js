const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../models/taskModel');

// Get all task
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Task.find({ user: req.user.id })
        .then(tasks => res.json(tasks))
        .catch(err => console.log(err));
});

// Create new task
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newTask = {
        user: req.user.id,
        task: req.body.task
    };

    new Task(newTask).save()
        .then(task => res.json(task))
        .catch(err => console.log(err));
});

// Edit task
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id },{ $set: { task: req.body.task }}, { new: true })
        .then(asd => res.json(asd))
        .catch(err => res.json(err));
});

// Complete task
router.post('/iscomplete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Task.findOne({ _id: req.params.id})
        .then(task => {
            Task.findByIdAndUpdate({ _id: req.params.id }, { $set: { isComplete: !task.isComplete }}, { new: true })
                .then(asd => res.json(asd))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// Delete task
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Task.findOneAndRemove({ _id: req.params.id })
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err));
});

module.exports = router;