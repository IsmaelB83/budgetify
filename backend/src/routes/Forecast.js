'use strict';
// Node imports
const express = require('express');
const { query, param, body } = require('express-validator');
// Own imports
const { ForecastCtrl } = require('../controllers');


// Exports arrow function with the Commitment routes
module.exports = () => {
    const router = express.Router();
    // Rutas de comprometidos
    router.get(
        '/', 
        [   query('tagetik').optional().isLength({min:1, max: 10}).withMessage('value must be between 1 and 10 characteres length'),
            query('SAPObject').optional().isLength({min:1, max: 100}).withMessage('value must be between 1 and 24 characteres length'),
            query('gjahr').optional().isNumeric().withMessage('value must be numeric'),
        ],
        ForecastCtrl.select);
    router.get(
        '/:id', 
        ForecastCtrl.selectOne);
    router.put(
        '/:id', 
        ForecastCtrl.update);
    router.delete(
        '/:id', 
        ForecastCtrl.delete);
    // Retorno el router
    return router;
}