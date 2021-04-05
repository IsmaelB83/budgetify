'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Advert in the database
*/
const ForecastSchema = new Schema(
    {  
        // Sociedad
        bukrs: { type: String, required: true, max: 4 },
        // Objeto SAP
        SAPObject: { type: String, max: 24, slug: 'name', required: true },
        // Partida Tagetik
        tagetik: { type: String, max: 10 },
        // Proveedor
        lifnr: { type: String, max: 10 },
        // Ejercicio
        gjahr: { type: Number, required: true, max: 2099 },
        // Importe forecast por mes
        amount01: { type: Number },
        amount02: { type: Number },
        amount03: { type: Number },
        amount04: { type: Number },
        amount05: { type: Number },
        amount06: { type: Number },
        amount07: { type: Number },
        amount08: { type: Number },
        amount09: { type: Number },
        amount10: { type: Number },
        amount11: { type: Number },
        amount12: { type: Number },
        // Descripción
        sgtxt: { type: String, max: 255 },
        // Unidad solicitante
        solicitante: { type: String, max: 100 },
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para eliminar todas las lineas de costes reales
*/
ForecastSchema.statics.deleteAll = async function() {
    return await Forecast.deleteMany({});
};

/**
* Función estática para insertar varias lineas de comprometidos al mismo tiempo
*/
ForecastSchema.statics.insertAll = async function(forecasts) {
    return await Forecast.insertMany(forecasts);
};

const Forecast = mongoose.model('Forecast', ForecastSchema);

module.exports = Forecast;