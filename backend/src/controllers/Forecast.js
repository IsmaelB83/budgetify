'use strict';
// Own imports
// Node imports
const { Forecast } = require('../models');

/**
 * Controller object
 */
module.exports = {
    
    /**
     * Select forecast items from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Get forecast items
            Forecast.list(req.query.tagetik, req.query.SAPObject, req.query.gjahr)
            .then (result => {
                return res.status(200).json({
                    success: true,
                    results: result.results
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Select one forecast item from its database id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    selectOne: async (req, res, next) => {
        try {
            // Get one advert
            Forecast.findById(req.params.id)
            .then(forecast => {
                if (!forecast) {
                    return next({ 
                        status: 404,
                        description: 'Not found any forecast with that id' 
                    });
                }
                return res.status(200).json({
                    success: true, 
                    result: forecast
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update forecast item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    update: async (req, res, next) => {
        try {
            // Sólo se permiten modificar las partidas propias
            Forecast.findById(req.params.id)
            .then(forecast => {
                // Check forecast item exists
                if (!forecast) {
                    return next({
                        status: 403, 
                        description: 'You do not have an forecast with that id'
                    });
                }
                // Update forecast model
                const updated = {...forecast, ...req.body}
                // Update mongo
                Forecast.updateForecast(forecast._id, updated).then(result => {
                    // Ok
                    res.status(200).json({
                        success: true, 
                        result: result 
                    });
                })
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Delete forecast item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            // Ok
            Forecast.findByIdAndDelete(req.params.id)
            .then(forecast => {
                // Ok
                res.status(200).json({
                    success: true, 
                    result: forecast
                });
            })
            .catch(error => {
                return next({
                    status: 403, 
                    description: 'You do not have a forecast item with that id'
                });
            })
        } catch (error) {
            next(error);
        }
    },
}