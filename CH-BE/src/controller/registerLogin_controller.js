import auth from '../helper/auth.js'
import registerLoginModel from '../models/registerLogin_model.js'

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await registerLoginModel.findOne({email:email})
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
        // console.log(email);
        // if(password === confirmPassword){
            const user = await registerLoginModel.findOne({email : email})
            if(!user){
                req.body.password = await auth.createHash(password)
                let newUser = await registerLoginModel.create(req.body)
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

export default {
    register,
    login
}