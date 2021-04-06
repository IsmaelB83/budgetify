'use strict';
// Own imports
// Node imports
const { Partida } = require('../models');

/**
 * Controller object
 */
module.exports = {
    
    /**
     * Select budget items from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Get budget items
            Partida.list(req.query.tagetik, req.query.description, req.query.SAPObject, req.query.department, parseInt(req.query.limit), 
                parseInt(req.query.skip), req.query.fields, req.query.sort)
            .then (result => {
                return res.status(200).json({
                    success: true,
                    start: result.start,
                    end: result.end,
                    totalCount: result.totalCount,
                    results: result.results
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Select one budget item from its database id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    selectOne: async (req, res, next) => {
        try {
            // Get one advert
            Partida.findOne({tagetik: req.params.tagetik})
            .then(partida => {
                if (!partida) {
                    return next({ 
                        status: 404,
                        description: 'Not found any partida with that id' 
                    });
                }
                return res.status(200).json({
                    success: true, 
                    result: partida
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Create budget item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    create: async (req, res, next) => {
        try {
            // New budget item
            let partida = new Partida({...req.body});
            // Update mongo
            partida.save().then(result => {
                // Response
                return res.status(201).json({
                    success: true, 
                    result: result
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update budget item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    update: async (req, res, next) => {
        try {
            // Sólo se permiten modificar las partidas propias
            Partida.findOne({tagetik: req.params.tagetik})
            .then(partida => {
                // Check budget item exists
                if (!partida) {
                    return next({
                        status: 403, 
                        description: 'You do not have an partida with that slug'
                    });
                }
                // Update partida model
                const updated = {...partida, ...req.body}
                // Update mongo
                Partida.updatePartida(partida._id, updated).then(result => {
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
     * Delete budget item
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            // Sólo se permiten modificar los anuncios propios
            Partida.findOne({tagetik: req.params.tagetik})
            .then(partida => {
                // Check partida exists
                if (!partida) {
                    return next({
                        status: 403, 
                        description: 'You do not have a budget item with that id'
                    });
                }
                // Ok
                Partida.findByIdAndDelete(partida._id)
                .then(partida => {
                    // Ok
                    res.status(200).json({
                        success: true, 
                        result: partida
                    });
                });
            })
        } catch (error) {
            next(error);
        }
    },
}