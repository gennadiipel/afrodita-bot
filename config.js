var mysql = require('mysql')

const BOT_CONFIG = {
    TOKEN: '5072424589:AAEjgJff-stNSIbmyDkPPao7guhp0MdjMK4',
    DIR: __dirname
}

const MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    base: 'afrodita'
}

exports.MYSQL_CONNECTION = mysql.createConnection({
    host: MYSQL_CONFIG.host,
    user: MYSQL_CONFIG.user,
    password: MYSQL_CONFIG.password,
    database: MYSQL_CONFIG.base
});

exports.MYSQL_CONNECTION.connect()

console.log('connected')

exports.BOT_CONFIG = BOT_CONFIG
exports.MYSQL_CONFIG = MYSQL_CONFIG