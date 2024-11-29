const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { isAuthenticated } = require('../middleware/authenticated');

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, password: await bcrypt.hash(password, 10) });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if(error.code === 11000) {
            res.status(400).send({ message: 'Email already exists' });
        } else {
            res.status(500).send({ message: 'Registration failed' });
        }
    } 
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ email },process.env.JWT_SECRET, { expiresIn: '48h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send({ message: 'Authentication failed' });
    }
});

router.get('/user', isAuthenticated, async (req, res) => {
    const {password, ...user} = (await User.findOne({ email: req.user.email })).toJSON();
    res.json(user);
});

module.exports = router;