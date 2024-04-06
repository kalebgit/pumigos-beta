require('dotenv').config
const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const {findUser} = require('../services/users.services')

const initializePassport = ()=>{
    passport.use('auth', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
    }, (jwt_payload, done)=>{
        try{
            done(jwt_payload, done)
        }catch(err){
            return done(new Error('jwt error'), false)
        }
    }))
}

function cookieExtractor(req){
    const token = null
    try{
        const accessToken = req.cookies['accessToken']
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) throw new Error('the user access token isnt valid')
            token = accessToken
        })
    }catch(err){
        console.log(err)
    }finally{
        return token
    }
}

function tokenCheck(req, res, next){
    passport.authenticate('auth', {session:false }, (err, user, info)=>{
        try{
            if(err && !user){
                //give another accessToken whenver it has expired
                const refreshToken = req.cookies['refreshToken']
                const accessToken = req.cookies['accessToken']
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, accessTokenUser)=>{
                    if(err){
                        console.log('\n>>> error from jwt verification in accesToken: ' + err)
                        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, refreshTokenUser)=>{
                            if(err) console.log('\n>>> error from jwt verification in refreshToken: ' + err)
                            if(refreshTokenUser){
                                console.log("\n>>>>>>> refresh token valid: generating the new access token...\n")
                                const user = await findUser({email: refreshTokenUser.email})
                                res.cookie('accessToken', jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}), 
                                {
                                    httpOnly: true
                                })
                                console.log("\n>>>>>>> access token created again\n")
                            }
                        })
                    }else{
                        req.user = accessTokenUser
                    }
                })
            }
            next()
        }catch(err){
            console.log('\n >> Error in authenticate jwt method')
            req.status(500).send(err)
        }
    })(req, res, next)
}

module.exports = {initializePassport, tokenCheck}