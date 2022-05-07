const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const csvParser = require('csv-parser')
const morgan = require('morgan')
const app = express()
const port = 3000

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// enable files upload
app.use(fileUpload({ createParentPath: true }))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
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
        purchaseFile = request.files.purchaseFile
        uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, function (err) {
            if (err)
                return response.status(500).send(err)
            const parser = csvParser({ delimiter: ';' })
            const records = []
            parser.on('readable', () => {
                let record;
                while((record = parser.read()) !== null) {
                    records.push(record)
                }
            })
            response.send(records.toString())
        })
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
