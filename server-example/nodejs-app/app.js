let createError  = require('http-errors');
let express      = require('express');
let path         = require('path');
let cookieParser = require('cookie-parser');
let logger       = require('morgan');
let cors         = require('cors');
let db           = require('./db');
let config       = require('./config');

let indexRouter  = require('./routes/index');
// let usersRouter = require('./routes/users');
let todosRouter  = require('./routes/todos');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('# Connected to MongoDB');
        
        app.use('/', indexRouter);
		// app.use('/users', usersRouter);
		app.use('/api/todos', todosRouter);

		// catch 404 and forward to error handler
		app.use(function(req, res, next) {
			next(createError(404));
		});

		// error handler
		app.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
    }
});

module.exports = app;
