const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const controller = require('./controller')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
const { APP_PORT, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    console.log('db is connected')
    app.set('db', db)
}).catch(err => {
    console.error('there was an error connecting to db', err)
})

app.get('/api/inventory', controller.getProducts)
app.post('/api/inventory', controller.createProduct)
app.delete('/api/inventory/:id', controller.deleteProduct)
app.put('/api/products/:id', controller.updateProduct)

app.listen(APP_PORT, () => {
    console.log('Listening on port', APP_PORT)
})

