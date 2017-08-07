// Having a script that strips all console.logs before running might be better way to do this
const debug = process.env.NODE_ENV === 'production' ?
    () => {} :
    msg => console.log(msg);

module.exports = debug;
