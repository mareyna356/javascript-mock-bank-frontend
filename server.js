const express = require("express");
const serveStatic = require('serve-static');
const app = express();
const fs = require("fs");
const https = require("https");

process.env.port = 8001;
app.use(serveStatic(__dirname + "/dist"));

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "password"
};
const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.port, () => {
    console.log('Servidor arriba, https://localhost:' + process.env.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});