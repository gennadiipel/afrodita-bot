const { MYSQL_CONNECTION } = require("../config")


class AfroditaUser {

    constructor() {

    }

    static signUp(telegramId, name, gender, photo) {
        const requestPromise = () => {
            MYSQL_CONNECTION.query(
                `INSERT INTO users (telegram_id, 
                    name, gender) VALUES (
                        '${telegramId}',
                        '${name}',
                        '${gender}'
                    )`
            , (error, rows, fields) => {
                if (error) throw error;

                MYSQL_CONNECTION.query()
            })
        }
    }

    static async getUserByTelegramId(telegram_id) {

    }


    static async isUserExist(id) {

        const requestPromise = () => {
            return new Promise((resolve) => {
                MYSQL_CONNECTION.query(`SELECT * FROM users WHERE telegram_id = ${id}`, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(!!rows.length)
                })
            })
        }

        return await requestPromise()
    }
}


module.exports = AfroditaUser