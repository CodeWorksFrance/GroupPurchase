const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const FileService = require("./service/fileService")
const {Pool} = require("pg");
const fileService = new FileService();

const dbConnection = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
});

const PurchaseRepository = require('./purchase/purchase-repository');
const UserRepository = require('./user/user-repository');

const purchaseService = new PurchaseRepository(dbConnection);
const userService = new UserRepository(dbConnection);

const app = express()
const port = 3000
app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload({createParentPath: true}))

app.get('/', async (_, response) => {
    try {
        const latestPurchases = await purchaseService.findLatestPurchases();
        response.render("index", {purchases: latestPurchases});
    } catch (error) {
        response.status(500).send(error);
    }
})

/********************** Purchase **************************/
app.post('/upload', (request, response) => {
    let purchaseFile;
    let uploadPath;
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No file uploaded')
    } else {
        const purchaseFile = request.files.purchaseFile
        const uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, async (err) => {
            if (err) {
                return response.status(500).send(err)
            } else {
                const items = fileService.importItems(purchaseFile.data);
                try {
                    const purchaseId = await purchaseService.createPurchase(request.body, items);
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
    try {
        const purchaseDetails = await purchaseService.findPurchaseItem(id);
        response.render("purchase", purchaseService.createPurchaseToRender(purchaseDetails));
    } catch (error) {
        console.log(":::: An error has occured:::: ", error);
        response.status(400).send(error)
    }
})

app.get('/new', (_, response) => {
    response.render("new-group-purchase")
})

/********************** Users **************************/
app.get('/users', async (_, response) => {
    try {
        const users = await userService.retrieveUsers()
        response.render("users", {users: users})
    } catch (error) {
        response.status(500).send(error)
    }
});

app.post('/newUser', async (request, response) => {
    try {
        const result = await userService.createUser(request.body)
        response.redirect('/users')
    } catch (error) {
        console.error(error)
        response.status(400).send(error)
    }
});

/********************** run app **************************/
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

