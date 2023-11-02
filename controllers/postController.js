const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ message: 'Error creating post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching posts' });
    }
};

exports.searchPosts = async (req, res) => {
    try {
        const expertise = req.params.expertise;
        const posts = await Post.findAll({ where: { work: expertise } });
        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error searching for posts' });
    }
};
