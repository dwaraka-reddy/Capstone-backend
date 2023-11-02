const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

exports.signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });
        res.status(201).send({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user, check username' });
    }
};

exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '72h' });
        res.send({ username: user.username, token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        Object.assign(user, req.body);
        await user.save();
        // res.send(user);
        const { id, password, ...userWithoutSensitiveData } = user.dataValues;
        res.send(userWithoutSensitiveData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
};
