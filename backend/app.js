const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//allowing requests from different server "*" to access to api end point. Otherwise, CORS issue happens.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTION');
  next()
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body
  console.log('im inside app', post)
  res.status(201).json({
    message: 'Post added successfully'
  })

})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fdefcdaf',
      title: 'First server-side post',
      content: 'This is coming from the server',
    },
    {
      id: 'gkleg',
      title: 'Second server-side post',
      content: 'This is a second message coming from the server',
    },
  ]
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
})

module.exports = app;