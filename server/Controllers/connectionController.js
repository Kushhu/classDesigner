const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AxeNiNjAa1904',
    database: 'classdesigner'
});

const Result = {
    IsSuccess:null,
    Model:null,
    Message:null,
    Status:null
}

module.exports = { connection, Result }