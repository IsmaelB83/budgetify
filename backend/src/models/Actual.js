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
        // La partida ha sido cargada y validada (corregida, etc.)
        checked: { type: Boolean, default: false },
        // Ingorar una partida de costes reales
        ignore: { type: Boolean, default: false },
        // Fecha carga
        loaded: { type: Date, required: true }
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para listar partidas presupuestarias de la base de datos
* @param {String} tagetik Para filtrado por una partida tagetik concreta
* @param {String} SAPObject Para filtrado de partidas asociadas aun objeto SAP concreto
* @param {String} gjahr Ejercicio para el filtrado
* @param {String} perio Periodo para el filtrado
*/
ActualSchema.statics.list = (tagetik, SAPObject, gjahr, perio) => {
    return new Promise((resolve, reject) => {
        // Genero filtrado
        let filter = {}
        if (tagetik) filter.tagetik = { '$regex': tagetik, '$options': 'i' };
        if (SAPObject) filter.SAPObject = { '$regex': SAPObject, '$options': 'i' };
        // Realizo la query a Mongo
        let queryDB = Actual.find(filter);
        queryDB.exec()
        .then(results => resolve({results}))
        .catch(error => reject(error));
    });
}

/**
* Función estática para actualizar los datos de una partida de costes reales
* @param {String} id ID que representa a un coste real en MongoDB
* @param {Partida} newActual Objeto con los datos a modificar
*/
ActualSchema.statics.updateActual = async function(id, newActual) {
    try {
        // Busco algún coste real con ese id
        let actual = await Actual.findById(id);
        if (actual) {
            actual.sgtxt = newActual.sgtxt || actual.sgtxt;
            actual.ebtxt = newActual.ebtxt || actual.ebtxt;
            actual.bltxt = newActual.bltxt || actual.bltxt;
            actual.solicitante = newActual.solicitante || actual.solicitante;
            actual.tagetik = newActual.tagetik || actual.tagetik;
            actual.SAPObject = newActual.SAPObject || actual.SAPObject;
            actual.checked = newActual.checked || actual.checked;
            actual.ignore = newActual.ignore || actual.ignore;
            // Salvo datos en mongo
            return actual.save();
        }
        return false;
    } catch (error) {
        return error;
    }
};

/**
* Función estática para eliminar todas las lineas de costes reales
*/
ActualSchema.statics.deleteAll = async function() {
    return await Actual.deleteMany({});
};

/**
* Función estática para insertar varias lineas de comprometidos al mismo tiempo
*/
ActualSchema.statics.insertAll = async function(actuals) {
    return await Actual.insertMany(actuals);
};

const Actual = mongoose.model('Actual', ActualSchema);

module.exports = Actual;