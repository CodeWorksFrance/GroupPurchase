const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const purchaseRoutes = require('./purchase/purchase-route')
const userRoutes = require('./user/user-route')

const app = express()
const port = 3000

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload({createParentPath: true}))

app.use(purchaseRoutes);
app.use(userRoutes)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

