const SQL = require('mysql')
const { DatabaseName, Host, User, Password } = require('./config');

const MYSQL = SQL.createConnection({
    host: Host,
    user: User,
    password: Password,
    database: DatabaseName
})

MYSQL.connect((err, result) => {
    if(err, result){
        console.log('Data Base Initiated!')
    }else{
        console.log('Data Base Not Found! => Check The Config.js file')
    }
})

module.exports = MYSQL