const User = require('../models/users.models')
const {hashPassword}= require('../utils/bcrypt')

async function createUser(user){
    try{
        const newUser = {...user, password: await hashPassword(user.password)}
        const userCreated = await User.create(newUser)
        return userCreated 
    }catch(err){
        throw new Error(err)
    }
    
}   

async function findUserById(id){
    try{
        const user = await User.findById(id)
        return user
    }catch(err){
        throw new Error(err)
    }
}

async function findUser(filter){
    try{
        const user = await User.find(filter)
        return user
    }catch(err){
        throw new Error(err)
    }
}


module.exports = {createUser, findUserById, findUser}