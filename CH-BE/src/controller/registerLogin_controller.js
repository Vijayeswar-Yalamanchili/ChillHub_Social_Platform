import auth from '../helper/auth.js'
import RegisterLoginModel from '../models/registerLogin_model.js'
import forgotPasswordMail from '../helper/emailService.js'

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await RegisterLoginModel.findOne({email:email})
        if(user){
            if(await auth.hashCompare(password,user.password)){
                const loginToken = await auth.createLoginToken({
                    id : user._id,
                    name : `${user.firstName} ${user.lastName}`,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email:user.email,
                    imageDP : user.imageDP, 
                    bio : user.bio,
                    role:user.role
                })
                await RegisterLoginModel.findOneAndUpdate({email:email},{ "$set": { isLoggedIn: true }})
                res.status(200).send({
                    message:"Login successfull",
                    loginToken,
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
                message: "Email-Id not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging in"
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
            })
        }else{
            res.status(400).send({
                message : `User with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in creating user"
        })
    }
}

const forgotPassword = async(req,res) => {
    try {
        const {email} = req.body
        const userEmail = await RegisterLoginModel.findOne({email:req.body.email})
        if(userEmail){
            req.body.email = await auth.createHash(email)
            let emailToHash = req.body.email
            let hashedEmail = await RegisterLoginModel.updateOne({emailHash : req.body.email})
            const forgotPassToken = await auth.createForgotPassToken({
                email:userEmail.email,
                _id : userEmail._id
            })
            res.status(200).send({
                message : "Please Check Your Email",
                email: userEmail.email,
                _id : userEmail._id,
                forgotPassToken
            })
            const result = await RegisterLoginModel.findOneAndUpdate({email:email},{$set : {forgotPassToken : forgotPassToken,emailHash : req.body.email}})
            const getUserData = await RegisterLoginModel.findById(result._id)
            const emailVerifyURL = `${process.env.BASE_URL}/resetPassword/${getUserData.emailHash}/verify/${getUserData.forgotPassToken}`
            await forgotPasswordMail(email, emailVerifyURL)
        }else{
            res.status(400).send({
                message: "Emailid not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const verifyCode = async(req,res) => {
    try {
        const dataToVerify = await RegisterLoginModel.findOne({emailHash: req.params.id,forgotPassToken: req.params.token})
        if(dataToVerify){
            await RegisterLoginModel.findOneAndUpdate({ _id: dataToVerify._id },
                { $set: {  userPassID: "", userPassToken: "" } }
            )
            await RegisterLoginModel.findOneAndUpdate({ _id: dataToVerify._id },
                { $unset: { userPassID: "", userPassToken: "" } }
            )
            res.status(200).send({
                message : "Email verified Successfully"
            })
        }else{
            res.status(400).send({
                message: "Invalid Link"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in verifing code"
        })
    }
}

const resetPassword = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findOne({email : req.body.email})
        if(user){
            req.body.password = await auth.createHash(req.body.password)
            let resetPwd = await RegisterLoginModel.updateOne({password : req.body.password})
            res.status(200).send({
                message : "Password updated successfully",
                resetPwd
            })
        }else{
            res.status(400).send({
                message : `User with ${req.body.email} doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Updating password"
        })
    }
}

const logout = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findOne({_id : req.params.id})
        if(user){
            let logout =  await RegisterLoginModel.findOneAndUpdate({_id : req.params.id},{ "$set": { isLoggedIn: false }})
            res.status(200).send({
                message : "Logged Out Successfully",
                logout
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging out"
        })
    }
}

export default {
    register,
    login,
    forgotPassword,
    verifyCode,
    resetPassword,
    logout
}