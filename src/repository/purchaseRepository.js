class PurchaseRepository{

    constructor(pool) {
        this.pool = pool
    }

     findLatestPurchases(){
        const selectQuery = 'SELECT p.Id, u.Name, p.creation_date FROM Purchases p INNER JOIN Users u ON u.id = p.user_id ORDER BY p.creation_date DESC'
      return this.pool.query(selectQuery)
            .then(response => response.rows)
            .catch(error =>  {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    findPurchaseItem(id){
        const selectQuery = `SELECT p.id, u.name, p.creation_date, p.shipping_fee FROM Purchases p INNER JOIN Users u ON u.id = p.user_id WHERE p.id = ${id}` ;
        return this.pool.query(selectQuery)
            .then(response => response.rows)
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    findOrdersByUsers(id){
        const userOrdersQuery = `SELECT i.label, i.quantity, i.unit_price, u.name FROM Purchase_Items i INNER JOIN Users u ON u.id = i.buyer_id WHERE i.purchase_id = ${id}`
        return this.pool.query(userOrdersQuery)
            .then(response => response.rows)
            .catch(error =>  {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    createPurchaseEntry(){
       // const insertQuery = 'INSERT INTO PURCHASES (User_Id, Creation_Date, Shipping_Fee) SELECT u.Id, $2, $3 FROM Users as u WHERE u.name = $1 RETURNING ID;
    }
}

module.exports= PurchaseRepository;
