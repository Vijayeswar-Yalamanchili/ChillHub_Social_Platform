import express from 'express'
import registerLoginController from '../controller/registerLogin_controller.js'
import screenController from '../controller/screenController.js'
import auth from '../helper/auth.js'

const router = express.Router()

// router.get('/',(req,res)=>{
//     res.send(`<h1>Welcome to Chillhub</h1>`)
// })
router.post('/',registerLoginController.login)
router.post('/register',registerLoginController.register)
router.put('/forgotPassword',registerLoginController.forgotPassword)
router.get('/forgotPassword/:id/verify/:token',registerLoginController.verifyCode)
router.put('/updatePassword',registerLoginController.updatePassword)

router.get('/home',auth.authenticate,auth.userGuard,screenController.home)
router.post('/home/addpost',auth.authenticate,auth.getUserEmail ,screenController.createPost)
router.get('/home/getposts/:id', auth.authenticate, screenController.getPosts)
router.get('/home/getuserposts/:id', auth.authenticate, screenController.getUserPosts)


export default router