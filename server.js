// import required modules

const { json } = require('body-parser');
const express = require('express')
const http = require('http')
const MongoClient = require('mongodb').MongoClient

// connect to Mongo DB

let db;
let dbConnectorStr = 'mongodb+srv://fitnessAdmin:fitnesspass@cluster0.dh91y.mongodb.net/fitnesstracker?retryWrites=true&w=majority'
let dbName = 'fitnessDB'

MongoClient.connect(dbConnectorStr)
    .then(client => {
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName)
    })

// link app to express and import required middleware

let app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(express.static('public'))

// get handler for index page. renders an EJS page with data from DB being used in EJS. The data is a list of user names.

app.get('/', (req, res) => {
    db.collection('fitnessUsers').find().toArray()
        .then(data => {
            data = data.filter(data => !data.fitnessName)
            res.render('index.ejs', {users : data})})
    
})

// get handler for user information page. renders an EJS page with data from DB being used in EJS. The data is a list of fitness stats for a specific user name.

app.get('/api/:userInfo', (req, res) => {
    let user = req.params.userInfo
    db.collection('fitnessUsers').find().toArray()
        .then(data => {
            data = data.filter(data => data.user == user || data.fitnessName == user)
            res.render('user.ejs', {info : data})})
})

// post handler for adding fitness stats into the DB for a specific user. 

app.post('/add-ex', (req, res) => {
    db.collection('fitnessUsers').insertOne(req.body)
    res.redirect(`/`)
})

// post handler for adding a new user into the DB. 

app.post('/adduser', (req, res) => {
    db.collection('fitnessUsers').insertOne(req.body)
    res.redirect('/')
})

// delete handler for deleting a user from the DB.

app.delete('/removeUser', (req, res) => {
   db.collection('fitnessUsers').deleteOne({user: req.body.removeName.trim()})
   res.json()
})

// delete handler for deleting a block of a users fitness stats from the DB.

app.delete('/removeExercise', (req, res) => {
    let user = req.params.userInfo
   db.collection('fitnessUsers').deleteOne({exercise: req.body.removeEx})
   res.json()
})

// port listener

const PORT = 5001
app.listen(process.env.PORT || PORT, () => {
    console.log(`server running on port: ${PORT}`)
})