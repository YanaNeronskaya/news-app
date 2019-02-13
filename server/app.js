const express = require('express');
const app = express();
const path = require('path');
const basicRouter = require('./routes/basic');
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const config = require('./config/secret');
const UserService = require('./services/user.service');
const Logger = require('./logger');
const logger = new Logger();
const db = require('./db/db');

const userService = new UserService();

db.connect('mongodb://localhost:27017/frontcamp');

passport.use(new BasicStrategy(
    (username, password, cb) => {
        userService.getByUsername(username)
            .then(user => {
                if (!user) {
                    return cb(null, false);
                }
                if (user.password !== password) {
                    return cb(null, false);
                }

                return cb(null, user);
            })
            .catch(err => cb(err));
    })
);
passport.use(new BearerStrategy(
    function (token, done) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) { return done(err); }
            return done(null, decoded, { scope: 'all' });
        })
    }
));

passport.use(new FacebookStrategy({
        clientID: 2320259721538621,
        clientSecret: '7cbbffe494e8bb30062fec4422354918',
        callbackURL: '/return'
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(async function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(async function (obj, cb) {
    cb(null, obj);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logAllRequests);
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', basicRouter);
app.use('/news', newsRouter);
app.use('/', authRouter);

function logAllRequests(req, res, next) {
    logger.logInfo(req.method, req.url);
    next();
}

app.use((req, res) => {
    res.status(404).send("Some error :(");
});

app.use((err, req, res) => {
    logger.logError(err.message);
    res.status(500).send('Server does not response :(');
});

app.listen(3000, () => console.log('App listening on port 3000!'));
