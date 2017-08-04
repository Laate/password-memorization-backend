const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });

const config = {
    host: 'localhost',
    port: '5432',
    database: 'memodb',
};

const db = pgp(config);

// TODO:
// We always send back 500 when getting an error, even if the client sends an invalid request.
// We should check for client error and send back 400.
function saveGuess(req, res) {
    console.log(req.body);
    db.none(
        'INSERT INTO guesses(user_id, session_id, node_id, user_input, node_text, full_text, left_ok, right_ok, ok)' +
        'VALUES($(userID), $(sessionID), $(nodeID), $(input), $(nodeText), $(fullText), $(isLeftCorrect), $(isRightCorrect), $(isCorrect))', req.body)
        .then(() => {
            console.log('guess entry created');
            res.send('ok');
        })
        .catch((error) => {
            console.log(error);
            res.send(500);
        });
}


module.exports = { saveGuess };
