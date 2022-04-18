const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require("./model/user")
const app = express()

app.use('/static', express.static(__dirname+'/static'))

mongoose.connect('mongodb://localhost:27017/medicaldatabasenode',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})


app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/templates/register.html')
})
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async (req, res)=>{
  console.log(req.body)


  res.json({status: 'ok'})
})

app.listen(5000, ()=>{
  console.log('server up at 5000')
})