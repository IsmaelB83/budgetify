'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Advert in the database
*/
const PartidaSchema = new Schema(
    {  
        // Responsible
        responsible: { type: String, enum: ['Corporativo', 'Aplicaciones', 'Comunicaciones', 'Infraestructura', 'Puesto Usuario', 'AA', 'Arquitectura', 'Proyectos', 'TD'], required: true, max: 50},
        // ID Partida
        tagetik: { type: String, required: true, max: 10, unique: true },
        // Descripción de la partida presupuestaria
        description: { type: String, required: true, max: 100, index: true},
        // Departamento
        department: { type: String, enum: ['Comunes', 'Supply Chain', 'Desarrollo', 'Financiero', 'Gestión Energía', 'I&C', 'TIC', 'Acciona Solar', 'Producción', 'QSE', 'TD'], required: true, max: 100, index: true },
        // Tipo de budget
        type: { type: String, enum: ['CORP', 'LIC', 'BAU', 'EVO', 'ESCALADO'], required: true },
        // Tipo Objeto SAP
        SAPType: { type: String, enum: ['Orden CO', 'CECO', 'PEP'], required: true},
        // Objeto SAP
        SAPObject: { type: String, max: 24, slug: 'name', required: true },
        // Precio del artículo
        budget: { type: Number, required: true }
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para listar partidas presupuestarias de la base de datos
* @param {String} tagetik Para filtrado por una partida tagetik concreta
* @param {String} description Para filtrado por una descripcion de partida
* @param {String} SAPObject Para filtrado de partidas asociadas aun objeto SAP concreto
* @param {String} department Para filtrado de partidas asociadas a un departamento
* @param {String} limit Para limitar el número de resultados a obtener
* @param {String} skip Para inidicar el número de resultados a saltar
* @param {String} fields Campos a obtener de la colección
* @param {function} callback Función a llamar al terminar la consulta
*/
PartidaSchema.statics.list = (tagetik, description, SAPObject, department, limit, skip, fields) => {
    return new Promise((resolve, reject) => {
        // Genero filtrado
        let filter = {}
        if (tagetik) filter.tagetik = { '$regex': tagetik, '$options': 'i' };
        if (description) filter.description = { '$regex': description, '$options': 'i' };
        if (SAPObject) filter.SAPObject = { '$regex': SAPObject, '$options': 'i' };
        if (department) filter.department = { '$regex': department, '$options': 'i' };
        // Realizo la query a Mongo
        let queryDB = Partida.find(filter);
        limit = limit || parseInt(process.env.MAX_API_partidas);
        skip = skip || 0;
        queryDB.limit(limit);
        queryDB.skip(skip);
        queryDB.select(fields);
        queryDB.sort({createdAt: -1});
        queryDB.exec()
        .then (results => {
            Partida.find(filter).countDocuments()
            .then(count => resolve({
                start: skip,
                end: skip + results.length,
                totalCount: count, 
                results 
            }))
            .catch(error => reject(error));
        })
        .catch (error => reject(error));
    });
}

/**
* Función estática para eliminar todas las partidas
*/
PartidaSchema.statics.deleteAll = async function() {
    return await Partida.deleteMany({});
};

/**
* Función estática para insertar varios partidas al mismo tiempo
*/
PartidaSchema.statics.insertAll = async function(partidas) {
    return await Partida.insertMany(partidas);
};

/**
* Función estática para actualizar los datos de una partida anuncio
* @param {String} id ID que representa a un anuncio en MongoDB
* @param {Partida} newPartida Objeto con los datos a modificar
*/
PartidaSchema.statics.updatePartida = async function(id, newPartida) {
    try {
        // Busco algún anuncio con ese id
        let partida = await Partida.findById(id);
        if (partida) {
            // Si viene el parametro en el body lo sobreescribo
            partida.description = newPartida.description || partida.description;
            partida.tagetik = newPartida.tagetik || partida.tagetik;
            partida.SAPType = newPartida.SAPType || partida.SAPType;
            partida.SAPObject = newPartida.SAPObject || partida.SAPObject;
            partida.SAPDescription = newPartida.SAPDescription || partida.SAPDescription;
            partida.department = newPartida.department || partida.department;
            partida.budget = newPartida.budget || partida.budget;
            // Salvo datos en mongo
            return partida.save();
        }
        return false;
    } catch (error) {
        return error;
    }
};

const Partida = mongoose.model('Partida', PartidaSchema);

module.exports = Partida;