const PORT = 5001
const { json } = require('body-parser');
const express = require('express')
const http = require('http')
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
app.use(express.static('public'))


app.get('/', (req, res) => {
    db.collection('fitnessUsers').find().toArray()
        .then(data => {
            data = data.filter(data => !data.fitnessName)
            res.render('index.ejs', {users : data})})
    
})
app.get('/api/:userInfo', (req, res) => {
    let user = req.params.userInfo
    db.collection('fitnessUsers').find().toArray()
        .then(data => {
            data = data.filter(data => data.user == user || data.fitnessName == user)
            res.render('user.ejs', {info : data})})
})


app.post('/add-ex', (req, res) => {
    db.collection('fitnessUsers').insertOne(req.body)
    res.redirect(`/`)
})

app.post('/adduser', (req, res) => {
    db.collection('fitnessUsers').insertOne(req.body)
    res.redirect('/')
})

app.delete('/removeUser', (req, res) => {
   db.collection('fitnessUsers').deleteOne({user: req.body.removeName.trim()})
   res.json()
})

app.delete('/removeExercise', (req, res) => {
    let user = req.params.userInfo
   db.collection('fitnessUsers').deleteOne({exercise: req.body.removeEx})
   res.json()
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`server running on port: ${PORT}`)
})