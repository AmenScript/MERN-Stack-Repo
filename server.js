const express = require('express')
const bodyParser = require('body-parser')
const bookRoute = require('./router')

const app = express()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', bookRoute)

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/bookLibrary').then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Request is pending"})
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})