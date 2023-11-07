const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const temporarySignUps = {};

exports.signUpStep1 = async (req, res) => {
    try {
        const { username, password, mobile } = req.body;
        const userExists = await User.findOne({ where: { username: username } });
        if (userExists) {
            return res.status(409).send({ message: "Username already exists. Please choose a different one." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const tempId = `temp_${new Date().getTime()}`;
        temporarySignUps[tempId] = { username, password: hashedPassword, mobile };
        res.status(200).send({ tempId });
    } catch (error) {
        res.status(500).send({ message: "Error in Step 1 of sign up." });
    }
};

exports.signUpStep2 = async (req, res) => {
    const { tempId, userType } = req.body;
    if (temporarySignUps[tempId]) {
        temporarySignUps[tempId].userType = userType;
        res.status(200).send({ message: "Proceed to step 3." });
    } else {
        res.status(404).send({ message: "Sign up step 1 must be completed first." });
    }
};

exports.signUpStep3 = async (req, res) => {
    const { tempId, ...otherDetails } = req.body;
    console.log('Expertise from request:', req.body.expertise);

    if (temporarySignUps[tempId] && temporarySignUps[tempId].userType) {
        const userData = { ...temporarySignUps[tempId], ...otherDetails };
        try {
            const newUser = await User.create(userData);
            delete temporarySignUps[tempId];
            res.status(201).send({ message: "Signup complete", userId: newUser.id });
        } catch (error) {
            console.error("Error during user creation:", error);
            res.status(500).send({ message: "Error saving user." });
        }
    } else {
        res.status(404).send({ message: "Incomplete signup process." });
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




// exports.signUp = async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = await User.create({
//             ...req.body,
//             password: hashedPassword
//         });
//         res.status(201).send({ message: 'User created successfully!' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error creating user, check username' });
//     }
// };
