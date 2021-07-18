// database
import mysql from 'mysql2';

export const base = (sql = '', data = [], isReject = false) => new Promise((resolve, reject) => {

  // create connection object
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mybook'
  });

  // execute connection
  connection.connect();

  // operate database
  connection.query(sql, data, function (error, results, fields) {
    if (error) {
      if (isReject) {
        reject(error)
      } else {
        throw error
      }
    }
    resolve({
      results,
      fields
    })
  });

  // close connection
  connection.end();
})

export default {
  base
}