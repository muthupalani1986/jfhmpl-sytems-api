class User {
    
    constructor(customer_id,customer_name,pin,created_at,updated_at) {        
        this.customer_id=customer_id;
        this.customer_name=customer_name;
        this.pin=pin;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    addUserSQL() {
        let sql = `INSERT INTO users(customer_id, customer_name,pin,created_at,updated_at) \
                   VALUES('${this.customer_id}','${this.customer_name}','${this.pin}','${this.created_at}','${this.updated_at}')`;
        return sql;           
    }

    static getUserByCustomerIdPinSQL(customer_id,pin) {
        const sql=`SELECT * from users where customer_id = '${customer_id}' and pin='${pin}' limit 1`;
        return sql;           
    }

    static getUserByCustomerId(customer_id) {
        let sql = `SELECT * FROM users WHERE customer_id = '${customer_id}' limit 1`;
        return sql;           
    }

    static deleteUserByCustomerIdSQL(customer_id) {
        let sql = `DELETE FROM users WHERE customer_id = ${customer_id}`;
        return sql;           
    }
    updateUserByCustomerIdSQL(customer_id) {
        let sql = `update users set customer_name='${this.customer_name}',pin='${this.pin}',updated_at='${this.updated_at}' WHERE customer_id = ${customer_id}`;
        return sql;           
    }
    static getUserByCustomerId(customer_id) {
        let sql = `SELECT * FROM users WHERE customer_id = '${customer_id}' limit 1`;
        return sql;           
    }
    static getAllUserSQL() {
        let sql = `SELECT * FROM users`;
        return sql;           
    }    
}

export default User;