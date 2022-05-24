const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const csvParse = require('csv-parse')
const Pool = require('pg').Pool
const computeBills = require('../../src/domain/computeBills')
const importItems = require("../domain/importItems");
const UserRepository = require("../repository/userRepository")
const DataTransfer = require("../repository/dataTransfer")
const PurchaseRepository = require("../repository/purchaseRepository");
const pool = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
})
const app = express()
const port = 3000
const userRepository = new UserRepository(new DataTransfer(pool))
const purchaseRepository = new PurchaseRepository(pool)
app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// enable files upload
app.use(fileUpload({createParentPath: true}))

app.get('/', (request, response) => {
    purchaseRepository.findLatestPurchases()
        .then((data) => {
            console.log("About to display the data :::: ", data);
            const purchases = []
            for (let i = 0; i < data.length; i++) {
                const purchase = {
                    id: data[i].id,
                    user: data[i].name,
                    creationDate: data[i].creation_date
                }
                purchases.push(purchase)
            }
            console.log("All the purchase::: ", purchases);
            response.render("index", {purchases: purchases});
        })
        .catch(error => {
            console.log("::: Error ::: ", error)
            response.status(400).send(error);
        });
})

app.get('/users', (request, response) => {
    userRepository.retrieveUsers((error, users) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.render("users", {users: users})
        }
    })
})

app.get('/purchase/:id', (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT p.id, u.name, p.creation_date, shipping_fee FROM Purchases p INNER JOIN Users u ON u.id = p.user_id WHERE p.id = $1', [id], (error, result) => {
        if (error || result.rows.length === 0) {
            response.status(400).send(error)
        } else {
            const row = result.rows[0]
            const purchase = {
                id: row.id,
                user: row.name,
                creationDate: row.creation_date,
                shippingFee: row.shipping_fee,
                items: [],
            }
            pool.query('SELECT i.label, i.quantity, i.unit_price, u.name FROM Purchase_Items i INNER JOIN Users u ON u.id = i.buyer_id WHERE i.purchase_id = $1', [id], (error, result) => {
                if (error) {
                    response.status(400).send(error)
                } else {
                    result.rows.forEach(row => {
                        const item = {
                            label: row.label,
                            quantity: row.quantity,
                            unitPrice: row.unit_price,
                            amount: row.quantity * row.unit_price,
                            buyer: row.name,
                        }
                        purchase.items.push(item)
                    })
                    response.render("purchase", {
                        purchase: purchase,
                        getTotal: (items) => {
                            let result = 0;
                            items.forEach(item => {
                                result += item.amount
                            })
                            return result
                        },
                        bills: computeBills(purchase),
                        showRunningTotal: true
                    })
                }
            })
        }
    })
})

app.get('/new', (request, response) => {
    response.render("new-group-purchase")
})

app.post('/upload', (request, response) => {
    let purchaseFile;
    let uploadPath;
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No file uploaded')
    } else {
        const purchaseFile = request.files.purchaseFile
        const uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, function (err) {
            if (err) {
                return response.status(500).send(err)
            } else {
                const items = importItems(purchaseFile.data);
                const purchase = {
                    user: request.body.user,
                    purchaseDate: request.body.date,
                    shippingFee: Number.parseFloat(request.body.shippingFee),
                    items: items,
                }
                createPurchase(purchase, response)
                console.log("%j", purchase)
            }
        })
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const createUser = (request, response) => {
    const {name, birthDate} = request.body
    userRepository.createUser(name, birthDate, (error, user) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.status(201).send(`User added with ID: ${user.id}`)
        }
    })
}

const getUsers = (request, response) => {
}

const createPurchase = (purchase, response) => {
    var purchaseId;
    pool.query('INSERT INTO PURCHASES (User_Id, Creation_Date, Shipping_Fee) SELECT u.Id, $2, $3 FROM Users as u WHERE u.name = $1 RETURNING ID;',
        [purchase.user, purchase.purchaseDate, purchase.shippingFee], (error, result) => {
            if (error) {
                console.log(error)
                response.status(400).send(error)
            } else {
                let purchaseId = result.rows[0].id;
                for (let i = 0; i < purchase.items.length; i++) {
                    pool.query('INSERT INTO PURCHASE_ITEMS(Purchase_Id, Label, Quantity, Unit_Price, Buyer_Id) SELECT $1, $2, $3, $4, u.Id FROM Users AS u WHERE u.name = $5;',
                        [purchaseId, purchase.items[i].label, purchase.items[i].quantity, purchase.items[i].unitPrice, purchase.items[i].buyer], (error, result) => {
                            if (error) {
                                console.log(error)
                                response.status(400).send(error)
                                return
                            }
                        })
                }
                response.redirect(`/purchase/${purchaseId}`);
            }
        })
}

app.post('/users', createUser)

app.post('/newUser', (request, response) => {
    const {user, date} = request.body
    pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2)', [user, date], (error, result) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.redirect('/users')
        }
    })
})

app.get('/users', getUsers)

