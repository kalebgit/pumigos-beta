const {Router}= require('express')
const {tokenCheck} = require('../config/passport')

module.exports = class Router{
    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(path, policies, ...callbacks){
        this.router.get(path, tokenCheck, managePolicies(policies), applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks){
        this.router.post(path, tokenCheck, managePolicies(policies), this.validatePostBody, applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks){
        this.router.put(path, tokenCheck, managePolicies(policies), applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks){
        this.router.delete(path, tokenCheck, managePolicies(policies), applyCallbacks(callbacks))
    }

    appyCallbacks(...callbacks){
        return callbacks.map(cb=>{
            return async(...params)=>{
                try{
                    await cb.apply(this, params)
                }catch(err){
                    params[1].status(500).send(err)
                }
            }
        })
    }

    managePolicies(policies){
        return (req, res, next)=>{
            console.log(policies)
            if((policies.includes('USER') || policies.includes('ADMIN')) && !req.user){
                res.status(401).send('you have to log in')
            }
            next()
        }
    }

    validatePostBody(req, res, next){
        if(!req.body) return res.status(406).send('you have to enter data')
        next()
    }
}