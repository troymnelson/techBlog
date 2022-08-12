const router = require('express').Router();
const Comment = require('../model/Comment');

router.post('/', async (req, res) => {
    console.log('works!');
    try {
        console.log(req.body);
        const newComment = await Comment.create(req.body);

        req.session.comment_id = newComment.id;

        res.redirect('/dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;