let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors')
let routes = require('./routes/index');

let passport = require('passport');
// let users = require('./routes/users');

let app = express();
app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
app.get('/ping', (req, res) => {
    res.json({ 'message': 'Hooray! Draw App is running...' });
})
app.use('/api', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        'error': {
            message: err.message,
            error: (app.get('env') === 'development') ? err : {}
        }
    });
});


module.exports = app;