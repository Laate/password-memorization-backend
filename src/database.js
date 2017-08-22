const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });
const debug = require('./debug');

const config = {
    host: 'localhost',
    port: '5432',
    database: 'memodb',
    user: 'postgres',
};

const db = pgp(config);

// TODO:
// We always send back 500 when getting an error, even if the client sends an invalid request.
// We should check for client error and send back 400.
function saveGuess(req, res) {
    db.none(
        'INSERT INTO guesses(user_id, session_id, node_id, user_input, node_text, full_text, mem_count, left_ok, right_ok)' +
        'VALUES($(userID), $(sessionID), $(nodeID), $(input), $(nodeText), $(fullText), $(memorisedCount), $(isLeftCorrect), $(isRightCorrect))', req.body)
        .then(() => {
            debug(req.body);
            res.sendStatus(200);
        })
        .catch((error) => {
            debug(error);
            res.sendStatus(500);
        });
}

module.exports = { saveGuess };
