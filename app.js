var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./services/handler');

require('./connections');


var postsRouter = require('./routes/posts');



var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  //next(createError(404));
  errorHandler(res,"無此網站路由", 404);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  errorHandler(res,"系統異常", 500);
});

module.exports = app;
