const express = require('express');
const ws = require('express-ws');
const cors = require('cors');

const app = express();

const expressWs = ws(app);

app.use(cors());

let n = 0;

app.ws('/echo', (ws, req) => {
    const t = setInterval(() => {
        ws.send('new number is coming: ' + ++n);
    }, 1500);

    ws.on('message', msg => {
        ws.send(msg + ' ' + ++n);
    });
    ws.on('error', () => {
        console.log('ERROR');
    });
    ws.on('close', (m, code) => {
        console.log('CLOSE', m, code);
        ws.close();
        clearInterval(t);
    });
});

app.listen(5000);