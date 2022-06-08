const {response} = require("express");

class DataRepository {

    constructor(pool) {
        this.pool = pool
    }

    findLatestPurchases() {
        const selectQuery = 'SELECT p.Id, u.Name, p.creation_date FROM Purchases p INNER JOIN Users u ON u.id = p.user_id ORDER BY p.creation_date DESC'
        return this.pool.query(selectQuery)
            .then(response => response.rows)
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    findPurchaseItem(id) {
        const selectQuery = `SELECT p.id, u.name, p.creation_date, p.shipping_fee
                             FROM Purchases p
                                      INNER JOIN Users u ON u.id = p.user_id
                             WHERE p.id = ${id}`;
        return this.pool.query(selectQuery)
            .then(response => response.rows)
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

    retrieveUsers() {
        const findUsersQuery = 'SELECT * FROM USERS ORDER BY NAME ASC';
        return this.pool.query(findUsersQuery)
            .then(response => response.rows)
            .catch(error =>  {
                console.log("An error has occured:::", error)
                throw error
            })
    }

    createUser(request){
        console.log("This is the request::: ", request);

        const {name, birthDate} = request.body
        this.pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2)', [name, birthDate])
            .then(response => response)
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            });

    }

    /*createUsers(name, birthDate){
       return this.pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2) RETURNING Id;', [name, birthDate], (error, result) => {
            if(error) {
                callBack(error, null)
            } else {
                const user = { name: name, birthDate: birthDate, id: result.rows[0].id }
                callBack(null, user)
            }
        })
    }*/
}

module.exports = DataRepository;
