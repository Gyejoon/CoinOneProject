import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan';
import express from 'express';
import path from 'path';

import config from './config/config';

const app = express();

app.set('port', config.port);
app.set('devPort', config.devPort);

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({code: 500, entity: 'Server Error'});
});

process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

app.listen(app.get('port'), () => {
    console.log('Express is listening on port', app.get('port'));
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        app.get('devPort'), () => {
            console.log('webpack-dev-server is listening on port', app.get('devPort'));
        }
    );
}
