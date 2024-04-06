const {Router}= require('express')

//routes
const UsersRoute = require('./UsersRoute')

const indexRouter = Router()

indexRouter.use('/users/', UsersRoute)

module.exports = indexRouter