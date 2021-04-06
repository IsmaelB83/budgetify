'use strict';
// Node imports
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
// Own imports
const { PartidaRoutes } = require('./routes');
const { ErrorMiddleware, AuthMiddleware } = require('./middlewares');
const database = require('./database');


// App express
const app = express();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(conn => {
        // View engine settings (ejs)
        app.set('views', path.join(__dirname, './views'));
        app.set('trust proxy', 1)
        app.set('view engine', 'ejs');
        // Static files
        app.use(express.static('public'));
        // Middlewares
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        // Routes API version
        app.use('/api/partida', PartidaRoutes());
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(AuthMiddleware, (req, res, next) => next({status: 404, description: 'Not found'}));
        // error handler
        app.use(ErrorMiddleware);
})
.catch( error => {
    console.error('Error connecting mongodb');
    console.error(error);
});

module.exports = app;