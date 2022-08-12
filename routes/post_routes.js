const router = require('express').Router();
const Post = require('../model/Post');
const db = require('../model/conn');

router.post('/', async (req, res) => {
    console.log('works!');
    try {
        console.log(req.body);
        const newPost = await Post.create(req.body);

        req.session.post_id = newPost.id;

        res.redirect('/dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;