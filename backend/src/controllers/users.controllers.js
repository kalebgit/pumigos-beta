require('dotenv').config()
const {createUser, findUser} = require('../services/users.services')

const jwt = require('jsonwebtoken')


async function register(req, res, next){
    try{
        if(await findUser({email: req.body.email})) return res.status(406).send('the user has already registered')
        const user = await createUser(req.body)
        if(!user) return res.status(500).send('something went wrong')
        const filteredUser = {email: user.email}
        res
            .cookie('refreshToken', jwt.sign(filteredUser, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'}), {
                httpOnly: true
            })
            .cookie('accessToken', jwt.sign(filteredUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION}), {
                httpOnly: true
            })
            .status(201)
            .send(filteredUser.email)

    }catch(err){
        res.status(500).send(err)
    }
}

async function login(req, res, next){
    try{
        const user = await findUser({email: req.body.email})
        if(!user) return res.status(406).send('the user is not registered')
        const filteredUser = {email: user.email}
        res
            .cookie('refreshToken',jwt.sign(filteredUser, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'}), {
                httpOnly: true
            })
            .cookie('accessToken', jwt.sign(filteredUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION}), 
            {
                httpOnly: true
            })
            .status(200)
            .send(filteredUser.email)
    }catch(err){
        res.status(500).send(err)
    }
}

async function logout(req, res, next){
    try{
        res.clearCookie('refreshToken').clearCookie('accessToken').status(200).send('user logged out')
    }catch(err){
        res.status(500).send(err)
    }
}



module.exports = {register, login, logout}