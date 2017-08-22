const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = process.env.PORT || 5000;

// process.getuid() is only available on POSIX platforms (i.e. not Windows or Android).
const isRoot = process.getuid && process.getuid() === 0;
if (isRoot) {
    const msg = (port < 1024) ?
        'If you want to run the API on a privileged port there are other solutions, e.g. iptables, setcap or nginx.' : '';
    throw new Error(`For security reasons, it's not recommended to run Node as root.\n${msg}`);
}

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
});

app.post('/api/guess', db.saveGuess);

if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync('path/to/keys/placeholder-key.pem'),
        cert: fs.readFileSync('path/to/keys/placeholder-cert.pem'),
    };
    https.createServer(options, app).listen(port, () => {
        console.log(`API is running on port ${port}`);
    });
} else {
    http.createServer(app).listen(port, () => {
        console.log(`API is running in dev mode on port ${port}`);
    });
}
