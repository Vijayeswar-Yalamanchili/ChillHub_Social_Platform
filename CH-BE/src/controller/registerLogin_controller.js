import Randomstring from 'randomstring'
import auth from '../helper/auth.js'
import RegisterLoginModel from '../models/registerLogin_model.js'
import forgotPasswordMail from '../helper/emailService.js'

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await RegisterLoginModel.findOne({email:email})
        if(user){
            if(await auth.hashCompare(password,user.password)){
                const token = await auth.createToken({
                    name:`${user.firstName} ${user.lastName}`,
                    email:user.email,
                    role:user.role
                })
                res.status(200).send({
                    message:"Login successfull",
                    token,
                    id:user._id,
                    role:user.role
                })
            }else{
                res.status(400).send({
                    message: "Incorrect password"
                })
            }
        }else{
            res.status(400).send({
                message: "Emailid not found"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging in",
            error : error.message
        })
    }
}

const register = async(req,res) => {
    try {
        const {email, password} = req.body
            const user = await RegisterLoginModel.findOne({email : email})
            if(!user){
                req.body.password = await auth.createHash(password)
                let newUser = await RegisterLoginModel.create(req.body)
                res.status(200).send({
                    message : "User created successfully",
                    newUser
                }) 
            }else{
                res.status(400).send({
                    message : `User with ${req.body.email} already exists`
                })
            } 
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in creating user",
            error : error.message
        })
    }
}

const forgotPassword = async(req,res) => {
    try {
        const {email} = req.body
        const user = await RegisterLoginModel.find({email:email})
        if(user){
            req.body.randomString = await Randomstring.generate(25)
            let updatedUser = await RegisterLoginModel.updateOne({email:email},{$set : {randomString:req.body.randomString }})
            // console.log(updatedUser);
            res.status(200).send({
                message : "Email exits",
                email: email,
                randomString : req.body.randomString
            })
        }
        await forgotPasswordMail(email,req.body.randomString)        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email",
            error : error.message
        })
    }
}

const verifyCode = async(req,res) => {
    try {
        const {randomString} = req.body
        const user = await RegisterLoginModel.find({randomString:randomString},{email:1})
        console.log(user.email);
        if(randomString === req.body.randomString){
            console.log(user,randomString);
                res.status(200).send({
                    message:"RandomString Matches",
                    user
                })
        }else{
            res.status(400).send({
                message:`User with code does not exists`
            })
        } 
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in verifing code",
            error : error.message
        })
    }
}

const updatePassword = async(req,res) => {
    try {
        const {password,updatePassword} = req.body
        const user = await RegisterLoginModel.find({email:email})
        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Updating password",
            error : error.message
        })
    }
}

export default {
    register,
    login,
    forgotPassword,
    verifyCode,
    updatePassword
}