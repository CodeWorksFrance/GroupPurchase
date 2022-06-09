const express = require('express');
const PurchaseRepository = require("./purchase-repository");
const FileService = require("../import-file/fileService");
const dbConnection = require("../config/secrets");
const fileParser = new FileService();

const purchaseService = new PurchaseRepository(dbConnection);
const purchaseRouter = express.Router();

purchaseRouter.use(function timeLog(req, res, next) {
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
