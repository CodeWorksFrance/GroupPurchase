const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const computeBills = require('../service/computeBills')
const DbService = require("../service/dbService");
const FileService = require("../service/fileService")
const pool = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
})
const app = express()
const port = 3000
const databaseService = new DbService(pool);
const fileService = new FileService();

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload({createParentPath: true}))

app.get('/', async (_, response) => {
    try {
        const data = await databaseService.findLatestPurchases()
        const purchases = []
        for (let i = 0; i < data.length; i++) {
            const purchase = {
                id: data[i].id,
                user: data[i].name,
                creationDate: data[i].creation_date
            }
            purchases.push(purchase)
        }
        response.render("index", {purchases: purchases});
    } catch (error) {
        response.status(500).send(error);
    }
})

/********************** Purchase **************************/

app.post('/upload',  (request, response) => {
    let purchaseFile;
    let uploadPath;
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No file uploaded')
    } else {
        const purchaseFile = request.files.purchaseFile
        const uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, async function (err) {
            if (err) {
                return response.status(500).send(err)
            } else {
                const items = fileService.importItems(purchaseFile.data);
                const purchase = {
                    user: request.body.user,
                    purchaseDate: request.body.date,
                    shippingFee: Number.parseFloat(request.body.shippingFee),
                    items: items,
                }
                try {
                    const result = await databaseService.createPurchase(purchase);
                    response.redirect(`/purchase/${purchaseId}`);
                } catch (error) {
                    response.status(400).send(error);
                }
            }
        })
    }
})

app.get('/purchase/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    try{
        const selectedPurchase = await databaseService.findPurchaseItem(id)
        const row =selectedPurchase[0]
        const purchase = {
            id: row.id,
            user: row.name,
            creationDate: row.creation_date,
            shippingFee: row.shipping_fee,
            items: [],
        }
        const orderedStuff = await databaseService.findOrdersByUsers(id)
        orderedStuff.forEach(row => {
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
    }catch (error) {
        response.status(400).send(error)
    }
})

app.get('/new', (_, response) => {
    response.render("new-group-purchase")
})

/********************** Users **************************/
app.get('/users', async (_, response) => {
    try {
        const rawUsers = await databaseService.retrieveUsers()
        const users = []
        for (let i = 0; i < rawUsers.length; i++) {
            const user = {name: rawUsers[i].name, birthDate: rawUsers[i].birth_date}
            users.push(user)
        }
        response.render("users", {users: users})
    } catch (error) {
        response.status(500).send(error)
    }
});

app.post('/newUser', async (request, response) => {
    const {user, date} = request.body
    try{
        const result = await databaseService.createUser(request.body)
       response.redirect('/users')
    }catch (error){
        console.error(error)
        response.status(400).send(error)
    }
});


/********************** run app **************************/
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

