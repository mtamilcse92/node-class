import './constants';
import path from 'path';
import express from 'express';
import parsetrace from 'parsetrace';
import ev from 'express-validation';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import './configs/logging-autoconfiguration';
import ValidateErrors from './api/validation/validate-error';
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

import {initRoutes} from './routes';
import {swaggerRoutes} from './helpers/swagger-docs';
swaggerRoutes(app)
initRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((err, req, res, next) => {
    if (err instanceof ev.ValidationError) {
        log.debug(err);
        res.status(err.status).json({ message: validateErrors(err) });
    } else {
        next(err);
    }
});

app.use((err, req, res, next) =>{
    if (err.statusCode) {
        const errorObj = JSON.parse(err.error);
        log.error(errorObj);
        res.status(err.statusCode);
        res.json(errorObj);
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    log.error(err);
    next(err);
});

app.use(app.get('env') !== 'server' ? devErrorHandler : serverErrorHandler);

function devErrorHandler(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        errorMessage: err.message,
        stackTrace: parsetrace(err, { sources: true }).object()
    });
}

function serverErrorHandler(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        errorMessage: err.message
    });
}

process.on('unhandledRejection', (reason) => {
    log.error(reason);
});

// class Routes {
//     constructor(){
//         this.foo = 10
//     }

//     Root(req, res, next){
//         res.json({foo: this.foo});
//     }
// }

// var routes = new Routes();
// app.get('/test', routes.Root.bind(routes));

module.exports = app;
