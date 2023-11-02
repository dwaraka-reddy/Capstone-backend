const { Op } = require('sequelize');
const User = require('../models/user');
const Post = require('../models/post');

exports.customerDashboard = async (req, res) => {
    try {
        const workers = await User.findAll({ where: { userType: 'worker' }, attributes: { exclude: ['id', 'password'] } });
        res.send(workers);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching workers' });
    }
};

exports.workerDashboard = async (req, res) => {
    try {
        const posts = await Post.findAll({ attributes: { exclude: ['id'] } });
        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching posts' });
    }
};

exports.searchWorkers = async (req, res) => {
    try {
        const expertise = req.params.expertise;
        const workers = await User.findAll({
            where: {
                userType: 'worker',
                expertise: {
                    [Op.contains]: [expertise]
                }
            }, attributes: { exclude: ['id', 'password'] } 
        });
        res.send(workers);
    } catch (error) {
        res.status(500).send({ message: 'Error searching for workers' });
    }
};
