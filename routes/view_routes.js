const User = require('../model/User');
const db = require('../model/conn');
const Post = require('../model/Post');
const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.session.user_id) {

        return User.findBypk(req.session.user_id)
                .then(user => {
                user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,

                }
                res.render('index', { user })
            }
        );
    }
    res.render('index', {title: 'Chat App' })
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'register' });

});

router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
});

router.get('/dashboard', async (req, res) => {
    console.log(req.session);
    // let user = await User.findByPk(req.session.user_id, {include: Post});
    let posts = await Post.findAll();

    posts = posts.map(post => {
        return {
            post_id: post.id,
            title: post.title,
            message: post.message
        }
    })
    res.render('dashboard', {posts, title: 'dashboard' });
});

module.exports = router;