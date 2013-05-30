/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , routes = require('./routes');


// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);


// Bootstrap models
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file)
})

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3100);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Bootstrap views
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// Bootstrap routes
require('./routes/routes.js')(app);
