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
* Función estática para listar partidas de forecast de la base de datos
* @param {String} tagetik Para filtrado por una partida tagetik concreta
* @param {String} SAPObject Para filtrado de partidas asociadas aun objeto SAP concreto
* @param {String} gjahr Ejercicio para el filtrado
*/
ForecastSchema.statics.list = (tagetik, SAPObject, gjahr) => {
    return new Promise((resolve, reject) => {
        // Genero filtrado
        let filter = {}
        if (tagetik) filter.tagetik = { '$regex': tagetik, '$options': 'i' };
        if (SAPObject) filter.SAPObject = { '$regex': SAPObject, '$options': 'i' };
        // Realizo la query a Mongo
        let queryDB = Forecast.find(filter);
        queryDB.exec()
        .then (results => resolve({results}))
        .catch(error => reject(error));
    });
}

/**
* Función estática para actualizar los datos de una partida de forecast
* @param {String} id ID que representa a un comprometido en MongoDB
* @param {Partida} newForecast Objeto con los datos a modificar
*/
ForecastSchema.statics.updateForecast = async function(id, newForecast) {
    try {
        // Busco algún comprometido con ese id
        let forecast = await Forecast.findById(id);
        if (forecast) {
            forecast.SAPObject = newForecast.SAPObject || forecast.SAPObject;
            forecast.tagetik = newForecast.tagetik || forecast.tagetik;
            forecast.lifnr = newForecast.lifnr || forecast.lifnr;
            forecast.amount01 = newForecast.amount01 || forecast.amount01;
            forecast.amount02 = newForecast.amount02 || forecast.amount02;
            forecast.amount03 = newForecast.amount03 || forecast.amount03;
            forecast.amount04 = newForecast.amount04 || forecast.amount04;
            forecast.amount05 = newForecast.amount05 || forecast.amount05;
            forecast.amount06 = newForecast.amount06 || forecast.amount06;
            forecast.amount07 = newForecast.amount07 || forecast.amount07;
            forecast.amount08 = newForecast.amount08 || forecast.amount08;
            forecast.amount09 = newForecast.amount09 || forecast.amount09;
            forecast.amount10 = newForecast.amount10 || forecast.amount10;
            forecast.amount11 = newForecast.amount11 || forecast.amount11;
            forecast.amount12 = newForecast.amount12 || forecast.amount12;
            forecast.sgtxt = newForecast.sgtxt || forecast.sgtxt;
            forecast.solicitante = newForecast.solicitante || forecast.solicitante;
            // Salvo datos en mongo
            return forecast.save();
        }
        return false;
    } catch (error) {
        return error;
    }
};

/**
* Función estática para eliminar todas las lineas de forecast
*/
ForecastSchema.statics.deleteAll = async function() {
    return await Forecast.deleteMany({});
};

/**
* Función estática para insertar varias lineas de forecast al mismo tiempo
*/
ForecastSchema.statics.insertAll = async function(forecasts) {
    return await Forecast.insertMany(forecasts);
};

const Forecast = mongoose.model('Forecast', ForecastSchema);

module.exports = Forecast;