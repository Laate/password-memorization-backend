const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });

const config = {
    host: 'localhost',
    port: '5432',
    database: 'memodb',
    user: process.env.USER,
    password: process.env.PASSWORD,
};

const db = pgp(config);

function insertEvent(req, res) {
    console.log(req.body);
    db.none('INSERT INTO events(user_id, session_id, event_type, data)' +
        'VALUES($(userID), $(sessionID), $(eventType), $(data))', req.body)
        .then(() => {
            console.log('event entry created');
            res.send('ok');
        })
        .catch((error) => {
            console.log(error);
            res.send(500);
        });
}


module.exports = { insertEvent };
