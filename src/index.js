const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/event', db.insertEvent);

app.listen(port, () => {
    if (!process.env.USER || !process.env.PASSWORD) {
        throw new Error('Username and password to access database not supplied.\n' +
            'Start the API with database credentials by typing:\n' +
            'USER=foo PASSWORD=bar npm start');
    }
    console.log(`API is running on port ${port}`);
});
