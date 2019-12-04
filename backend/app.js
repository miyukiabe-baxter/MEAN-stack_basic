const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Post = require('./models/post')


mongoose.connect('mongodb+srv://miyuki:19870809@cluster0-qgvou.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('Connected to Database') })
  .catch(() => { console.log('Conection Failed') })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// console.log(process.env.MONGODBPSW)
//allowing requests from different server "*" to access to api end point. Otherwise, CORS issue happens.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTION');
  next()
})

app.post('/api/posts', async (req, res, next) => {
  const { title, content } = req.body
  const post = new Post({
    title,
    content
  })
  await post.save()
  res.status(201).json({
    message: 'Post added successfully'
  })

})

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    })

})

module.exports = app;