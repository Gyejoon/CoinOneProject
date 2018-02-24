var express = require('express')
  , http = require('http')
  , path = require('path');

var config = require('./config/config');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('port', config.server_port);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.logger('dev'));
app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

app.use(app.router);

var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

process.on('uncaughtException', function (err) {
	console.log(err.stack);
});

process.on('SIGTERM', function () {
    app.close();
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

});
