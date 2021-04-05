'use strict';
// Node imports
// Own imports
const database = require('./index');
const { Actual, Partida, Commitment, Forecast } = require('../models');
const { Excel }  = require('../utils');

// Load env variables
require('dotenv').config();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(async (conn) => {
    // Borro los datos de la colección de anuncion
    await Partida.deleteAll();
    Excel.read('./data/private/PRESUPUESTO.xlsx').then(rows => {
        // JSON partidas
        const partidas = []
        for (let i = 1; i < rows.length; i++) {
          const partida = {
            responsible: rows[i][0],
            tagetik: rows[i][4],
            description: rows[i][5],
            department: rows[i][8],
            type: rows[i][1],
            SAPType: rows[i][2],
            SAPObject: rows[i][3],
            budget: rows[i][6]
          }
          partidas.push(partida);
        }
        Partida.insertAll(partidas).then(result => {
            console.log(`Proceso finalizado con un total de ${result.length} partidas creadas...`)
        })
      })
      await Actual.deleteAll();
      Excel.read('./data/private/REAL.xlsx').then(rows => {
        // JSON partidas
        const actuals = []
        for (let i = 1; i < rows.length; i++) {
          const actual = {
            bukrs: rows[i][0],
            SAPObject: rows[i][1],
            lifnr: rows[i][2],
            ebeln: rows[i][3],
            ebelp: rows[i][4],
            gjahr: rows[i][5],
            perio: rows[i][6],
            hkont: rows[i][7],
            cpudt: rows[i][8],
            budat: rows[i][9],
            sgtxt: rows[i][10],
            amount: rows[i][11],
            blart: rows[i][12],
            refbn: rows[i][13],
            ebtxt: rows[i][14],
            bltxt: rows[i][15],
            solicitante: rows[i][16],
            tagetik: rows[i][17],
            belnr: rows[i][18],
          }
          actuals.push(actual);
        }
        Actual.insertAll(actuals).then(result => {
            console.log(`Proceso finalizado con un total de ${result.length} lineas de costes creadas...`)
        })
      })
      await Commitment.deleteAll();
      Excel.read('./data/private/COMPROMETIDO.xlsx').then(rows => {
        // JSON partidas
        const commitments = []
        for (let i = 1; i < rows.length; i++) {
          const commitment = {
            bukrs: rows[i][0],
            SAPObject: rows[i][1],
            lifnr: rows[i][2],
            ebeln: rows[i][3],
            ebelp: rows[i][4],
            gjahr: rows[i][5],
            perio: rows[i][6],
            hkont: rows[i][7],
            cpudt: rows[i][8],
            budat: rows[i][9],
            sgtxt: rows[i][10],
            amount: rows[i][11],
            refbt: rows[i][12],
            solicitante: rows[i][13],
            tagetik: rows[i][14],
          }
          commitments.push(commitment);
        }
        Commitment.insertAll(commitments).then(result => {
            console.log(`Proceso finalizado con un total de ${result.length} lineas de comprometido creadas...`)
        });
      });
      await Forecast.deleteAll();
      Excel.read('./data/private/FORECAST.xlsx').then(rows => {
        // JSON partidas
        const forecasts = []
        for (let i = 1; i < rows.length; i++) {
          const forecast = {
            bukrs: rows[i][0],
            SAPObject: rows[i][1],
            tagetik: rows[i][2],
            lifnr: rows[i][3],
            gjahr: rows[i][4],
            amount01: rows[i][5],
            amount02: rows[i][6],
            amount03: rows[i][7],
            amount04: rows[i][8],
            amount05: rows[i][9],
            amount06: rows[i][10],
            amount07: rows[i][11],
            amount08: rows[i][12],
            amount09: rows[i][13],
            amount10: rows[i][14],
            amount11: rows[i][15],
            amount12: rows[i][16],
            sgtxt: rows[i][17],
            solicitante: rows[i][18],
          }
          forecasts.push(forecast);
        }
        Forecast.insertAll(forecasts).then(result => {
            console.log(`Proceso finalizado con un total de ${result.length} lineas de partidas de forecasts creadas...`)
        });
      })
    console.log(`Database created.`);
    console.log(`Please start budgetify with "npm start"`);
})
.catch(error => {
    // Error no controlado
    console.error('Uncontrolled error.');
    console.error(error);
});