'use strict';
// Own imports
// Node imports
const { Actual } = require('../models');

/**
 * Controller object
 */
module.exports = {
    
    /**
     * Select actual items from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Get actual items
            Actual.list(req.query.tagetik, req.query.SAPObject, req.query.gjahr, req.query.perio)
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
     * Select one actual item from its database id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    selectOne: async (req, res, next) => {
        try {
            // Get one advert
            Actual.findById(req.params.id)
            .then(actual => {
                if (!actual) {
                    return next({ 
                        status: 404,
                        description: 'Not found any actual with that id' 
                    });
                }
                return res.status(200).json({
                    success: true, 
                    result: actual
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update actual item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    update: async (req, res, next) => {
        try {
            // Sólo se permiten modificar las partidas propias
            Actual.findById(req.params.id)
            .then(actual => {
                // Check actual item exists
                if (!actual) {
                    return next({
                        status: 403, 
                        description: 'You do not have an actual with that id'
                    });
                }
                // Update actual model
                const updated = {...actual, ...req.body}
                // Update mongo
                Actual.updateActual(actual._id, updated).then(result => {
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
     * Delete actual item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            // Ok
            Actual.findByIdAndDelete(req.params.id)
            .then(actual => {
                // Ok
                res.status(200).json({
                    success: true, 
                    result: actual
                });
            })
            .catch(error => {
                return next({
                    status: 403, 
                    description: 'You do not have a actual item with that id'
                });
            })
        } catch (error) {
            next(error);
        }
    },
}