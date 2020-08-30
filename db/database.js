import mysql from "mysql";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'veyoga_jfhmpl_db',
    password: 'lI3=YyI?9Oeh',
    database: 'veyoga_jfhmpl',
    debug: false
});                         

function executeQuery(sql, callback) {
    pool.getConnection((err,connection) => {        
        if(err) {
            return callback(err, null);
        } else {
            if(connection) {
                
                connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) {
                    return callback(error, null);
                } 
                return callback(null, results);
                });
            }
        }
    });
}
function executeBulkInsertQuery(sql, data, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        } else {
            if (connection) {                
                connection.query(sql, [data], function(error, results, fields) {
                    connection.release();
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {    
    executeQuery(sql,function(err, data) {
        if(err) {
            return callback(err);
        }       
        callback(null, data);
    });
}

function bulkInsert(sql, data,callback) {
    executeBulkInsertQuery(sql, data, function(err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}
module.exports = { query: query, bulkInsert: bulkInsert};
