const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Create Note
router.post('/', auth, async (req, res) => {
    const note = new Note({
        userId: req.user.userId,
        title: req.body.title,
        content: req.body.content
    });
    await note.save();
    res.status(201).json(note);
});

// Get All Notes of user
router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
});

// Update Note
router.put('/:id', auth, async (req, res) => {
    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { title: req.body.title, content: req.body.content },
        { new: true }
    );
    if (!note) return res.status(404).send('Note not found');
    res.json(note);
});

// Delete Note
router.delete('/:id', auth, async (req, res) => {
    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId
    });
    if (!note) return res.status(404).send('Note not found');
    res.send('Note deleted');
});

module.exports = router;
