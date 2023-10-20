require('dotenv').config()

const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const transRouter = require('./routes/trans-route.js')
// const cors = require('cors');
const app = express()

app.use(express.json())
// app.use(cors())
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
