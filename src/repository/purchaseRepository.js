class PurchaseRepository{

    constructor(pool) {
        this.pool = pool
    }

    findLatestPurchases(){
        const purchaseQuery = 'SELECT p.Id, u.Name, p.creation_date FROM Purchases2 p INNER JOIN Users u ON u.id = p.user_id ORDER BY creation_date DESC'
      return this.pool.query(purchaseQuery)
            .then(response => response.rows)
            .catch(error =>  {
                console.log("An error has occured:::", error)
                throw error
            })
    }
}

module.exports= PurchaseRepository;
