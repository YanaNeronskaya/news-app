const router = require('express').Router();
const UserService = require('../services/user.service');
const passport = require('passport');
const config = require('../config/secret');
const jwt = require('jsonwebtoken');

const userService = new UserService();

router.post('/register', async (req, res) => {
    await userService.add(req.body);
    res.send();
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        return authenticationFailed(res);
    }

    const user = await userService.getByUsername(username);

    if (!user) {
        return authenticationFailed(res);
    }

    if (!(username === user.username && password === user.password)) {
        return res.send(403).json({
            success: false,
            message: 'Incorrect username or password. Try again.'
        });
    }

    let token = jwt.sign({ username: username },
        config.key,
        {
            expiresIn: '24h' // expires in 24 hours
        }
    );
    // return the JWT token for the future API calls
    res.json({
        success: true,
        message: 'Authentication ok',
        token: token
    });

});

router.get('/login',
    function (req, res) {
        res.render('login');
    });

router.get('/login/facebook',
    passport.authenticate('facebook'));

router.get('/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
    });


function authenticationFailed(res) {
    return res.send(400).json({
        success: false,
        message: 'Authentication failed. Try again'
    });
}

module.exports = router;
