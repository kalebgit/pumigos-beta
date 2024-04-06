const MainRouter = require('./MainRouter')
const {register, login, logout}=require('../controllers/users.controllers')
class UsersRoute extends MainRouter{
    constructor(){
        super()
    }

    init(){
        this.post('register', ['PUBLIC'], register)
        this.post('login', ['PUBLIC'], login)
        this.delete('logout', ['USER'], logout)
    }
}

module.exports = UsersRoute