'use strict';
// Node imports
const express = require('express');
const { query, param, body } = require('express-validator');
// Own imports
const { PartidaCtrl } = require('../controllers');


// Exports arrow function with the ADVERT routes
module.exports = () => {
    const router = express.Router();
    // Rutas de anuncios
    router.get(
        '/', 
        [   query('tagetik').optional().isLength({min:1, max: 10}).withMessage('value must be between 1 and 10 characteres length'),
            query('description').optional().isLength({min:1, max: 100}).withMessage('value must be between 1 and 100 characteres length'),
            query('SAPObject').optional().isLength({min:1, max: 100}).withMessage('value must be between 1 and 24 characteres length'),
            query('department').optional().isLength({min:1, max: 100}).withMessage('value must be between 1 and 100 characteres length'),
        ],
        PartidaCtrl.select);
    router.get(
        '/:tagetik', 
        PartidaCtrl.selectOne);
    router.delete(
        '/:tagetik', 
        PartidaCtrl.delete);
    router.put(
        '/:tagetik', 
        PartidaCtrl.update);
    router.post(
        '/', 
        [   body('responsible').isLength({min:1, max: 10}).withMessage('value must be between 1 and 50 characteres length'),
            body('tagetik').isLength({min:1, max: 10}).withMessage('value must be between 1 and 10 characteres length'),
            body('description').isLength({min:1, max: 100}).withMessage('value must be between 1 and 100 characteres length'),
            body('department').isLength({min:1, max: 100}).withMessage('value must be between 1 and 100 characteres length'),
            body('type').isLength({min:1, max: 100}).withMessage('value must be between 1 and 10 characteres length'),
            body('SAPType').isLength({min:1, max: 100}).withMessage('value must be between 1 and 8 characteres length'),
            body('SAPObject').isLength({min:1, max: 100}).withMessage('value must be between 1 and 24 characteres length'),
            body('budget').isNumeric().withMessage('must be numeric')
        ], 
        PartidaCtrl.create);
    // Retorno el router
    return router;
}