'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Advert in the database
*/
const CommitmentSchema = new Schema(
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
        // Tipo de documento de referencia
        refbt: { type: String, max: 4 },
        // Unidad solicitante
        solicitante: { type: String, max: 100 },
        // Partida Tagetik
        tagetik: { type: String, max: 10 },
        // La partida ha sido cargada y validada (corregida, etc.)
        checked: { type: Boolean, default: false },
        // Ingorar una partida de comprometido
        ignore: { type: Boolean, default: false }
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para listar partidas de comprometido de la base de datos
* @param {String} tagetik Para filtrado por una partida tagetik concreta
* @param {String} SAPObject Para filtrado de partidas asociadas aun objeto SAP concreto
* @param {String} gjahr Ejercicio para el filtrado
* @param {String} perio Periodo para el filtrado
*/
CommitmentSchema.statics.list = (tagetik, SAPObject, gjahr, perio) => {
    return new Promise((resolve, reject) => {
        // Genero filtrado
        let filter = {}
        if (tagetik) filter.tagetik = { '$regex': tagetik, '$options': 'i' };
        if (SAPObject) filter.SAPObject = { '$regex': SAPObject, '$options': 'i' };
        // Realizo la query a Mongo
        let queryDB = Commitment.find(filter);
        queryDB.exec()
        .then (results => resolve({results}))
        .catch(error => reject(error));
    });
}

/**
* Función estática para actualizar los datos de una partida de comprometido
* @param {String} id ID que representa a un comprometido en MongoDB
* @param {Partida} newCommitment Objeto con los datos a modificar
*/
CommitmentSchema.statics.updateCommitment = async function(id, newCommitment) {
    try {
        // Busco algún comprometido con ese id
        let commitment = await Commitment.findById(id);
        if (commitment) {
            commitment.sgtxt = newCommitment.sgtxt || commitment.sgtxt;
            commitment.solicitante = newCommitment.solicitante || commitment.solicitante;
            commitment.tagetik = newCommitment.tagetik || commitment.tagetik;
            commitment.SAPObject = newCommitment.SAPObject || commitment.SAPObject;
            commitment.checked = newCommitment.checked || commitment.checked;
            commitment.ignore = newCommitment.ignore || commitment.ignore;
            // Salvo datos en mongo
            return commitment.save();
        }
        return false;
    } catch (error) {
        return error;
    }
};

/**
* Función estática para eliminar todas las lineas de costes reales
*/
CommitmentSchema.statics.deleteAll = async function() {
    return await Commitment.deleteMany({});
};

/**
* Función estática para insertar varias lineas de comprometidos al mismo tiempo
*/
CommitmentSchema.statics.insertAll = async function(commitments) {
    return await Commitment.insertMany(commitments);
};

const Commitment = mongoose.model('Commitment', CommitmentSchema);

module.exports = Commitment;