const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

const register = async (req, res) => {
  const { username, password } = req.body

  try {
      if (!username.trim()) {
          throw new Error('Username cannot be blank')
      }
      if (password.length < 8 || !/^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(password)) {
          throw new Error('Password must be at least 8 characters and contain both letters and numbers')
      }

      const user = await req.db.collection('users').findOne({ username })

      if (user) {
          throw new Error('Username already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await req.db.collection('users').insertOne({ username, password: hashedPassword })
      res.status(200).json({
          message: 'User successfully registered',
          data: newUser
      })
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}


const login = async (req, res) => {
    const { username, password } = req.body
    const user = await req.db.collection('users').findOne({ username })
    console.log(user, '<=== user ===>');

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password) 
    
    if (isPasswordCorrect) {
      const token = jwt.sign({ username: user.username, id: user._id }, JWT_SIGN)
      res.status(200).json({
        message: 'User successfully logged in',
        data: token
      })
    } else {
      res.status(400).json({ error: 'Password is incorrect' })
    }
}


module.exports = {
    register,
    login
}