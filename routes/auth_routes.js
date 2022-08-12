const router = require('express').Router();

const User = require('../model/User');


router.post('/registration', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.send('this user already exists');
        }
        User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).then(user => {
            req.session.save(() => {
                req.session.user_id = user.user_id
                res.redirect('/')
            })
        })
    })
})

router.post('/logged', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async user => {
        if (!user) {
            return res.redirect('/login')
        }

        const validPass = await user.validatePassword(req.body.password, user.password )

        if (!validPass) {
            return res.redirect('/login')
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            res.redirect('/dashboard')
        })
    })
})

router.get('/logout', (req, res) => {

    if (!req.session.user_id) return res.redirect('/');

    
})

module.exports = router;