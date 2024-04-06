const bcrypt = require('bcrypt')

async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(11)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }catch(err){
        throw new Error(err)
    }
}

module.epxorts = {hashPassword}