const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

exports.signUpStep1 = async (req, res) => {
    try {
        const { username, password, mobile } = req.body;
        const userExists = await User.findOne({ where: { username: username } });
        if (userExists) {
            return res.status(409).send({ message: "Username already exists. Please choose a different one." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, mobile });
        res.status(201).send({ message: "User created. Please sign in." });
    } catch (error) {
        console.error("Sign Up Error:", error);
        res.status(500).send({ message: "Error in user creation." });
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
        res.send({ username: user.username, token, step2Completed: user.isStep2Completed, step3Completed: user.isStep3Completed });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
};

exports.signUpStep2 = async (req, res) => {
    const { userType } = req.body;
    try {
        const user = await User.findOne({ where: { username : req.user.username } });
        if (user) {
            user.userType = userType;
            user.isStep2Completed = true;
            await user.save();
            res.status(200).send({ message: "User type updated. Proceed to step 3.",
            username: user.username,
            step2Completed: user.isStep2Completed });
        } else {
            res.status(404).send({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating user type." });
    }
};

exports.signUpStep3 = async (req, res) => {
    const { ...otherDetails } = req.body;
    try {
        const user = await User.findOne({ where: { username : req.user.username } });
        if (user) {
            Object.assign(user, otherDetails);
            user.isStep3Completed = true;
            await user.save();
            res.status(200).send({ message: "Profile updated successfully.",
            username: user.username,
            step2Completed: user.isStep2Completed,
            step3Completed: user.isStep3Completed });
        } else {
            res.status(404).send({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating profile." });
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
        const { id, password, ...userWithoutSensitiveData } = user.dataValues;
        res.send(userWithoutSensitiveData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
};