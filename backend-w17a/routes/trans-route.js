const { Router } = require('express')
const { getAllTrans, createTrans, approvalTrans } = require('../service/trans-service.js')

const transRouter = Router()

transRouter.get('/', getAllTrans)
transRouter.post('/', createTrans)
transRouter.put('/:id', approvalTrans)

module.exports = transRouter