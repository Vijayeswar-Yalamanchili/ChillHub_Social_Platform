import Randomstring from 'randomstring'
import auth from '../helper/auth.js'
import forgotPasswordMailVerification from '../helper/emailService.js'
import RegisterLoginModel from '../models/registerLogin_model.js'

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

// const forgotPassword = async(req, res) => {
//     try {
//         const {email} = req.body
//         const user = await RegisterLoginModel.find({email:email})
//         console.log(user);
//         if(user){console.log("a"); 
//             req.body.randomString = await Randomstring.generate(20)     
//             console.log("b");               
//             let updateUser = await RegisterLoginModel.updateOne({email:email},{$set: {randomString : req.body.randomString}})
//             // console.log(updateUser);
//             console.log("c"); 
//             res.status(200).send({
//                 message:"Check email for code",
//                 name:user.name,
//                 email :user.email,
//                 role:user.role,
//                 randomString: user.randomString
//             })
//             await forgotPasswordMailVerification(req.body.email,req.body.randomString)
//         }else{
//             res.status(400).send({
//                 message:`User with ${req.body.email} does not exists!!!`
//             })
//         }        
//     } catch (error) {
//         res.status(500).send({
//             message : "Internal server error in fetching email",
//             error : error.message
//         })
//     }
// }

// const verifyCode = async(req, res) => {
//     try {
//         const {randomString} = req.body
//         const user = await RegisterLoginModel.findOne({randomString:randomString})
//         // const user = await RegisterLoginModel.findOne({randomString:randomString})
//         console.log(user);
//         if(user.randomString === req.body.randomString){
//                 res.status(200).send({
//                     message:"RandomString Matches",
//                     role:user.role,
//                     id :user._id,
//                     randomString : user.randomString
//                 })
//         }else{
//             res.status(400).send({
//                 message:`User with code does not exists`
//             })
//         }        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message : "Internal server error in logging in",
//             error : error.message
//         })
//     }
// }

export default {
    register,
    login,
    // forgotPassword,
    // verifyCode
}