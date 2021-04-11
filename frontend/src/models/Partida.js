// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

// Constantes para el trabajo con el modelo de anuncio
export const PARTIDA_CONSTANTS = {
    RESPONSIBLE: {
        CORP: 'Corporativo', 
        APPS: 'Aplicaciones', 
        COMMS: 'Comunicaciones', 
        INFRA: 'Infraestructura', 
        PUSUARIO: 'Puesto Usuario', 
        ANALYTICS: 'AA', 
        ARQUITECTURA: 'Arquitectura', 
        PROYECTOS: 'Proyectos', 
        TD: 'TD'
    },
    DEPARTMENT: {
        COMUNES: 'Comunes',
        SCHAIN: 'Supply Chain',
        DESARROLLO: 'Desarrollo',
        FINANCIERO: 'Financiero',
        GDENERGIA: 'Gestión de Energía',
        CONSTRUCCION: 'I&C',
        TIC: 'TIC',
        SOLAR: 'Acciona Solar',
        PRODUCCION: 'Producción',    
        QSE: 'QSE',
        TD: 'TD',    
    }, 
    TYPE: {
        CORP: 'CORP',
        LIC: 'LIC', 
        BAU: 'BAU', 
        EVO: 'EVO', 
        ESCALADO: 'ESCALADO'
    },
    SAP_TYPE: {
        ORDEN: 'Orden CO',
        CECO: 'CECO', 
        PEP: 'PEP', 
    }
}

// Empty partida
export const EMPTY_PARTIDA = {
    _id: '',
    responsible: '',
    tagetik: '',
    description: '',
    department: '',
    type: PARTIDA_CONSTANTS.TYPE.BAU,
    SAPType: PARTIDA_CONSTANTS.SAP_TYPE.ORDEN,
    SAPObject: '',
    budget: 0,
}

/**
 * Modelo de partida presupuesaria
 */
export default class Partida {
    
    /**
     * Constructor
     * @param {Object} Advert 
     */    
    constructor(partida) {
        this._id = partida._id;
        this.responsible = partida.responsible;
        this.tagetik = partida.tagetik;
        this.description = partida.description;
        this.department = partida.department;
        this.type = partida.type;
        this.SAPType = partida.SAPType;
        this.SAPObject = partida.SAPObject;
        this.budget = partida.budget;
    }

    /**
     * Comprueba si un objeto es válido. (Campos obligatorios completos)
     */
    isValid() {
        return  this.responsible && 
                this.tagetik && 
                this.description && 
                this.department && 
                this.type && 
                this.SAPType && 
                this.SAPObject &&
                this.budget >= 0 
    }
}