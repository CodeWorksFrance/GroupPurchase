const Purchases = require('./purchases');
const purchases = new Purchases();

class PurchaseRepository {

    constructor(pool) {
        this.pool = pool;
    }

    findLatestPurchases() {
        const selectQuery = 'SELECT p.Id, u.Name, p.creation_date FROM Purchases p INNER JOIN Users u ON u.id = p.user_id ORDER BY p.creation_date DESC'
        return this.pool.query(selectQuery)
            .then(response => purchases.mapAsSummary(response.rows))
            .catch(error => {
                throw error
            })
    }

    findPurchaseItem(id) {
        const selectQuery = `SELECT distinct p.id, u.name, p.creation_date, p.shipping_fee  FROM Purchases p
                             INNER JOIN Users u ON u.id = p.user_id
                             WHERE p.id = ${id}`;
        return this.pool.query(selectQuery)
            .then(async response => {
                const selectedPurchase = purchases.mapToPurchase(response.rows[0])
                const orderedItems = await this.findOrdersByUsers(id);
                orderedItems.forEach(row => {
                    purchases.addDetail(selectedPurchase.items, row)
                });
                console.log("::::::", selectedPurchase);
                return selectedPurchase
            })
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    findOrdersByUsers(id) {
        const userOrdersQuery = `SELECT i.label, i.quantity, i.unit_price, u.name
                                 FROM Purchase_Items i
                                          INNER JOIN Users u ON u.id = i.buyer_id
                                 WHERE i.purchase_id = ${id}`
        return this.pool.query(userOrdersQuery)
            .then(response => response.rows)
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            })
    }
}

module.exports = PurchaseRepository;
