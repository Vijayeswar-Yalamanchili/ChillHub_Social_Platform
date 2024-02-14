import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'

//hashing the pwd
const SALT = 10
const createHash = async(data) => {
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(data,salt)
    return hash
}

const hashCompare = async(data, hash) => {
    return await bcrypt.compare(data,hash)
}

//generating jwt

const createToken = async(payload) => {
    // console.log(process.env.JWT_SECRET);
    let token = await Jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRY 
    })
    return token
}

const decodeToken = async(token) => {
    return await Jwt.decode(token)
}

const authenticate = async(req,res,next) => {
    let token = req?.headers?.authorization?.split(' ')[1]
    // console.log(token);
    if(token){
        let payload = await decodeToken(token)
        let currentTime = +new Date()
        if(Math.floor(currentTime/1000)<payload.exp){
            next()
        }else{
            res.status(402).send({
                message :"Session expired"
            })
        }
    }else{
        res.status(402).send({
            message :"Unauthorised access"
        })
        alert("qwe")
    } 
}

const userGuard = async(req,res,next) => {
    let token  = req?.headers?.authorization?.split(' ')[1]
    if(token){
        let payload = await decodeToken(token)
        if(payload.role === "user"){
            next()
        }else{
            res.status(402).send({
                message :"Only Users are allowed"
            })
        }        
    }else{
        res.status(402).send({
            message :"Unauthorised access"
        })
    }    
}

export default {
    createHash,
    hashCompare,
    createToken,
    authenticate,
    userGuard
}