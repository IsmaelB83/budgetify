'use strict';
// Node imports
const express = require('express');
const { query, param, body } = require('express-validator');
// Own imports
const { ActualCtrl } = require('../controllers');


// Exports arrow function with the ACTUAL routes
module.exports = () => {
    const router = express.Router();
    // Rutas de costes reales
    router.get(
        '/', 
        [   query('tagetik').optional().isLength({min:1, max: 10}).withMessage('value must be between 1 and 10 characteres length'),
            query('SAPObject').optional().isLength({min:1, max: 100}).withMessage('value must be between 1 and 24 characteres length'),
            query('gjahr').optional().isNumeric().withMessage('value must be numeric'),
            query('perio').optional().isNumeric().withMessage('value must be numeric'),
        ],
        ActualCtrl.select);
    router.get(
        '/:id', 
        ActualCtrl.selectOne);
    router.put(
        '/:id', 
        ActualCtrl.update);
    router.delete(
        '/:id', 
        ActualCtrl.delete);
    // Retorno el router
    return router;
}