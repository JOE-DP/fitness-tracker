// const { urlencoded } = require('body-parser')
// const { Console } = require('console')
const express = require('express')
const http = require('http')
const PORT = 5001
const MongoClient = require('mongodb').MongoClient

let db;
let dbConnectorStr = 'mongodb+srv://fitnessAdmin:fitnesspass@cluster0.dh91y.mongodb.net/fitnesstracker?retryWrites=true&w=majority'
let dbName = 'fitnessDB'

MongoClient.connect(dbConnectorStr)
    .then(client => {
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName)
    })


let app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : true}))
app.use(express.json())


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/add-ex', (req, res) => {
    db.collection('fitnessuser1').insertOne(req.body)
    res.redirect('/')
})






app.listen(process.env.PORT|| PORT, () => {
    console.log(`server running on port: ${PORT}`)
})