let models = require('../models');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


router.get('/', function (req, res) {
    models.User.findAll({
        include: [models.Task]
    }).then(function (users) {
        res.render('index', {
            title: 'Sequelize: Express Example',
            users: users
        });
    });
});

/**
 * Local Strategy for Passport
 */
passport.use(new LocalStrategy(function (username, password, done) {
    // Check first if user exists with username
    models.User.findOne({ where: { username: username } })
        .then((user) => {
            if (user) {
                console.log('User Found! Lets check password now..' + user.password + ' ' + password);
                bcrypt.compare(password, user.password).then((result) => {
                    console.log(result);
                    if (result) {
                        console.log('We compared password and we have user ' + JSON.stringify(user));
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'Password does not match' });
                    }
                }).catch((er) => {
                    console.log(er);
                    console.error('Password does not match hash');
                    return done(null, false, { message: 'User Not Found' });
                });
            }
            else {
                return done(null, false, { message: 'User Not Found' });
            }
        })
        .catch((err) => {
            return done(null, false, { message: `Error ${error}` });
        })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    models.User.findById(id)
        .then(user => done(null, user))
        .error(err => done(err, null));
});


router.post('/login', (req, res, next) => {
    console.log('Request Body is ' + JSON.stringify(req.body));
    if (!req.body || !req.body.username || !req.body.password) {
        console.log('Missing data in login form... Returning error');
        return res.status(500).send('Missing Required Data!');
    }
    else {
        let username = req.body.username;
        let password = req.body.password;
        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash("Ol!amrdNKDP!", salt, function (err, hash) {
        //         console.log('Store in db hash function ' + hash)
        //     });
        // });
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { return res.status(404).send({ error: 'Cannot find user!' }); }
            else res.json(user);
        })(req, res, next);
    }
});




module.exports = router;