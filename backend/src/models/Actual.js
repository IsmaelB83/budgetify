'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Advert in the database
*/
const ActualSchema = new Schema(
    {  
        // Sociedad
        bukrs: { type: String, required: true, max: 4 },
        // Objeto SAP
        SAPObject: { type: String, max: 24, slug: 'name', required: true },
        // Proveedor
        lifnr: { type: String, max: 10 },
        // Número de pedido
        ebeln: { type: String, max: 10 },
        // Posición de pedido
        ebelp: { type: String, max: 2 },
        // Ejercicio
        gjahr: { type: Number, required: true, max: 2099 },
        // Posición de pedido
        perio: { type: Number, required: true, max: 12 },
        // Cuenta
        hkont: { type: String, required: true, max: 12 },
        // Fecha entrada
        cpudt: { type: Date, required: true },
        // Fecha contable
        budat: { type: Date, required: true },
        // Denominación
        sgtxt: { type: String, max: 255 },
        // Importe
        amount: { type: Number, required: true },
        // Clase de documento
        blart: { type: String, max: 2, required: true },
        // Número de documento de referencia
        refbn: { type: String, required: true, max: 10 },
        // Texto de pedido
        ebtxt: { type: String, max: 255 },
        // Texto cabecera documento
        bltxt: { type: String, max: 255 },
        // Unidad solicitante
        solicitante: { type: String, max: 100 },
        // Partida Tagetik
        tagetik: { type: String, max: 10 },
        // CO Document Number
        belnr: { type: String, max: 10},
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para eliminar todas las lineas de costes reales
*/
ActualSchema.statics.deleteAll = async function() {
    return await Actual.deleteMany({});
};

/**
* Función estática para insertar varios lineas de costes reales al mismo tiempo
*/
ActualSchema.statics.insertAll = async function(actuals) {
    return await Actual.insertMany(actuals);
};

const Actual = mongoose.model('Actual', ActualSchema);

module.exports = Actual;