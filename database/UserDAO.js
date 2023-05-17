const mysql = require('mysql');
const dotenv = require('dotenv').config()
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

class UserDao {
    constructor() {
        this.con = mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        });
    }



    //criar tabela
    createTable() {
        this.con.connect((err) => {
            if (err) throw err;
            var sql = "create table if not exists users(discord_id varchar(255) primary key, money float);";
            this.con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
            })
        });
    }

    existsUser(userID) {
        this.con.connect((err) => {
            const sql = `select discord_id from users where discord_id = "${String(userID)}"`
            this.con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return result.length > 0;
            })
        })
        return false;
    }

    setMoney(userID, Amount) {
        this.con.connect((err) => {
            if (err) {
                console.log(err);
                return;
            }
            var sql;
            if (this.existsUser(String(userID))) {
                sql = `UPDATE users SET MONEY = ${Amount} WHERE discord_id = "${String(userID)}";`
            } else {
                sql = `INSERT INTO users (discord_id, money) values ("${String(userID)}", ${Amount});`
            }
            this.con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("INSERTED")
            })
        })
    }
    getMoney(userID) {
        return new Promise((resolve, reject) => {
            this.con.connect((err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                const sql = `SELECT money FROM users WHERE discord_id="${String(userID)}";`;
                this.con.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    }


}
module.exports = UserDao;