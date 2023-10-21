require('dotenv').config()
const functions = require('firebase-functions'); 
const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const transRouter = require('./routes/trans-route.js')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cors())
app.use(databaseMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', authRouter)
app.use('/trans', transRouter)

app.use((err, req, res, next) => {
    console.log(err, `<===== error =====`);
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    })
  })

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

//Create connection with cloud database (MongoDB Atlas)
let URI = "mongodb://mongo:FgDqfDDrZMzoG0W7Hs3S@containers-us-west-80.railway.app:7642"
//"mongodb+srv://andalanaldi:Jpr322sDFkD6F8lW@cluster0.al8j3c4.mongodb.net/trans-reqw10?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback () {
  console.log("Database connected successfully")
});

exports.aldi = functions.https.onRequest(app); 