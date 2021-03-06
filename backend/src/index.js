'use strict';
// Node imports
//const https = require('https');
const http = require('http');
const fs = require('fs');

// Load env variables
require('dotenv').config();

// Create server application and start server
const app = require('./app');

// Prepare https credentials
const credentials = {
    key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
    cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8')
};

// Start https server
//const appServer = https.createServer(credentials, app);
const appServer = http.createServer(app);
appServer.listen(process.env.PORT, () => {
    console.log(`OK - API server running on port ${process.env.PORT}`);
});