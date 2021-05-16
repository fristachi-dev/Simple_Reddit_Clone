const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const content = req.body.content;

    const newPost = new Post({ content });

    newPost.save()
        .then(() => res.json('Content added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;