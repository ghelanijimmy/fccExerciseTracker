const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

// const mongoose = require('mongoose')
// mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let test = []


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get("/api/exercise/log", (req, res)=>{
  const {userId, from, to, limit} = req.query
  
  const result = test.filter(item=>{
    
    let fDate = new Date(from)
    let tDate = new Date(to)
    
    console.log(userId, userId, from, from, to, to, limit, limit, fDate<tDate)
    
    if(userId === item.userId && parseInt(limit) === item.duration && fDate <= tDate){
      res.json({userId, from, to, limit})
    } else {
      res.json({})
    }
  })
  
  
})

app.post("/api/exercise/new-user", (req, res)=>{
  console.log(req.body.username)
  res.json(req.body.username)
})

app.post("/api/exercise/add", (req, res)=>{
  console.log(req.body)
  let obj = {
    userId: req.body.userId,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date
  }
  
  test.push(obj)
  
  res.json(obj)
})


// // Not found middleware
// app.use((req, res, next) => {
//   return next({status: 404, message: 'not found'})
// })

// Error Handling middleware
// app.use((err, req, res, next) => {
//   let errCode, errMessage

//   if (err.errors) {
//     // mongoose validation error
//     errCode = 400 // bad request
//     const keys = Object.keys(err.errors)
//     // report the first validation error
//     errMessage = err.errors[keys[0]].message
//   } else {
//     // generic or custom error
//     errCode = err.status || 500
//     errMessage = err.message || 'Internal Server Error'
//   }
//   res.status(errCode).type('txt')
//     .send(errMessage)
// })



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
