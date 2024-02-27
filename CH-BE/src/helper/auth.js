import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'

//hashing the datas
const SALT = 10
const createHash = async(data) => {
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(data,salt)
    return hash
}

const verifySalt = async(SALT) => {
    let saltVerify = await bcrypt.genSalt(SALT)
    return saltVerify
} 

const hashCompare = async(data, hash) => {
    return await bcrypt.compare(data,hash)
}

//generating jwt's

const createLoginToken = async(payload) => {
    // console.log(process.env.JWT_SECRETKEY_LOGIN);
    let token = await Jwt.sign(payload,process.env.JWT_SECRETKEY_LOGIN,{
        expiresIn : process.env.JWT_EXPIRY_LOGIN 
    })
    return token
}

const decodeLoginToken = async(token) => {
    return await Jwt.decode(token)
}

const createForgotPassToken = async(payload) => {
    let token = await Jwt.sign(payload,process.env.JWT_SECRETKEY_FP,{
        expiresIn : process.env.JWT_EXPIRY_FP
    })
    return token
}

const decodeForgotPassToken = async(token) => {
    return await Jwt.decode(token)
}

const authenticate = async(req,res,next) => {
    let token = req?.headers?.authorization?.split(' ')[1]
    console.log(token);
    if(token){
        let payload = await decodeLoginToken(token)
        let currentTime = +new Date()
        console.log(payload.role);
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
    verifySalt,
    hashCompare,
    createLoginToken,
    createForgotPassToken,
    authenticate,
    userGuard
}