'use strict';
// Own imports
// Node imports
const { Commitment } = require('../models');

/**
 * Controller object
 */
module.exports = {
    
    /**
     * Select commitment items from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Get commitment items
            Commitment.list(req.query.tagetik, req.query.SAPObject, req.query.gjahr, req.query.perio)
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
     * Select one commitment item from its database id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    selectOne: async (req, res, next) => {
        try {
            // Get one advert
            Commitment.findById(req.params.id)
            .then(commitment => {
                if (!commitment) {
                    return next({ 
                        status: 404,
                        description: 'Not found any commitment with that id' 
                    });
                }
                return res.status(200).json({
                    success: true, 
                    result: commitment
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update commitment item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    update: async (req, res, next) => {
        try {
            // Sólo se permiten modificar las partidas propias
            Commitment.findById(req.params.id)
            .then(commitment => {
                // Check commitment item exists
                if (!commitment) {
                    return next({
                        status: 403, 
                        description: 'You do not have an commitment with that id'
                    });
                }
                // Update commitment model
                const updated = {...commitment, ...req.body}
                // Update mongo
                Commitment.updateCommitment(commitment._id, updated).then(result => {
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
     * Delete commitment item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            // Ok
            Commitment.findByIdAndDelete(req.params.id)
            .then(commitment => {
                // Ok
                res.status(200).json({
                    success: true, 
                    result: commitment
                });
            })
            .catch(error => {
                return next({
                    status: 403, 
                    description: 'You do not have a commitment item with that id'
                });
            })
        } catch (error) {
            next(error);
        }
    },
}