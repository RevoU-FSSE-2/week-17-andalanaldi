const { MongoClient } = require('mongodb')

const DB_NAME = 'trans-reqw10';

const databaseMiddleware = async (req, res, next) => {
    const mongoClient = await new MongoClient('mongodb://mongo:FgDqfDDrZMzoG0W7Hs3S@containers-us-west-80.railway.app:7642').connect()
    //'mongodb://127.0.0.1:27017'
    db = mongoClient.db(DB_NAME)

    req.db = db

    next()
}

module.exports = databaseMiddleware