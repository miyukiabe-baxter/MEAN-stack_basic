const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const postsRoutes = require('./routes/posts')

mongoose.connect('mongodb+srv://miyuki:19870809@cluster0-qgvou.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('Connected to Database') })
  .catch(() => { console.log('Conection Failed') })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//allowing requests from different server "*" to access to api end point. Otherwise, CORS issue happens.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTION');
  next()
})

app.use("/api/posts", postsRoutes);

module.exports = app;