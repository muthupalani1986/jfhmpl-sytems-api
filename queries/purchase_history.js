class PurchaseHistory {

    constructor(customer_id, purchase_date, category, weight, rate, plc_amount, created_at, updated_at) {
        this.customer_id = customer_id;
        this.purchase_date = purchase_date;
        this.category = category;
        this.weight = weight;
        this.rate = rate;
        this.plc_amount = plc_amount;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static addPurchaseHistorySQL() {
        const sql = "INSERT INTO purchase_history (customer_id, purchase_date, category, weight, rate, plc_amount, created_at, updated_at) VALUES ?";
        return sql;
    }
    static getPurchaseHistoryByCustomerId(customer_id) {
        const sql = `SELECT purchase_date,sum(weight_amount+plc_amount) as amount FROM purchase_history where customer_id='${customer_id}' group by purchase_date order by purchase_date desc`;
        return sql;
    }
    static deletePurhaseHistoryByCustomerId(customer_id) {
        const sql = `DELETE from purchase_history where customer_id='${customer_id}'`;
        return sql;
    }
    static getPurhaseHistoryByCustomerIdAndDate(customer_id,purchase_date) {
        const sql = `SELECT cat.id as cat_id,cat.cat_name, ph.weight,ph.rate,ph.weight_amount,ph.plc_amount from purchase_history ph INNER JOIN categories cat on cat.id=ph.category where ph.customer_id ='${customer_id}' and ph.purchase_date='${purchase_date}' order by cat_id asc`;
        return sql;
    }
}

export default PurchaseHistory;