const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const csvParse = require('csv-parse')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
})
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
        const purchaseFile = request.files.purchaseFile
        const uploadPath = './uploads/' + purchaseFile.name
        purchaseFile.mv(uploadPath, function (err) {
            if (err)
                return response.status(500).send(err)
        })
        const parser = csvParse.parse({delimiter: ',', columns: true, trim: true})
        const items = []
        parser.on('readable', () => {
            let record;
            while ((record = parser.read()) !== null) {
                const purchaseItem = {
                    label: record.item,
                    unitPrice: Number.parseFloat(record.unitp),
                    quantity: Number.parseInt(record.qty),
                    buyer: record.buyer
                }
                items.push(purchaseItem)
            }
        })
        parser.on('error', (err) => {
            console.error(err.message)
        })
        parser.write(purchaseFile.data);
        parser.end()
        const purchase = {
            user: request.body.user,
            purchaseDate: request.body.date,
            shippingFee: request.body.shippingFee,
            items:items,
        }
        console.log("%j",purchase)
        response.json(purchase)
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const createUser = (request, response) => {
    const { name, birthDate } = request.body
    pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2)', [name, birthDate], (error, result) => {
        if(error) {
            response.status(400).send(error)
        } else {
            response.status(201).send(`User added with ID: ${result.insertId}`)
        }
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM USERS ORDER BY NAME ASC', (error, result) => {
        if (error) {
            response.status(400).send(error)
        } else {
            const users = []
            for(let i=0; i < result.rows.length; i++) {
                const user = { name: result.rows[i].name, birthDate: result.rows[i].birth_date }
                users.push(user)
            }
            response.status(200).json(users)
        }
    })
}
app.post('/users', createUser)
app.get('/users', getUsers)

