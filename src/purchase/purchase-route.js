const express = require('express');
const {Pool} = require("pg");
const PurchaseRepository = require("./purchase-repository");
const FileService = require("../service/fileService");

const fileParser = new FileService();

const purchaseRouter = express.Router();

const dbConnection = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
});

const purchaseService = new PurchaseRepository(dbConnection);
purchaseRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


purchaseRouter.get('/',  async (_, response) => {
    try {
        const latestPurchases = await purchaseService.findLatestPurchases();
        response.render("index", {purchases: latestPurchases});
    } catch (error) {
        response.status(500).send(error);
    }
});

purchaseRouter.get('/new', (_, response) => {
    response.render("new-group-purchase")
})

purchaseRouter.get('/purchase/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    try {
        const purchaseDetails = await purchaseService.findPurchaseItem(id);
        response.render("purchase", purchaseService.createPurchaseToRender(purchaseDetails));
    } catch (error) {
        console.log(":::: An error has occured:::: ", error);
        response.status(400).send(error)
    }
});

purchaseRouter.post('/upload', (request, response) => {
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No file uploaded')
    } else {
        const purchaseFile = request.files.purchaseFile
        const uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, async (err) => {
            if (err) {
                return response.status(500).send(err)
            } else {
                const items = fileParser.importItems(purchaseFile.data);
                try {
                    const purchaseId = await purchaseService.createPurchase(request.body, items);
                    response.redirect(`/purchase/${purchaseId}`);
                } catch (error) {
                    response.status(400).send(error);
                }
            }
        })
    }
});

module.exports = purchaseRouter
