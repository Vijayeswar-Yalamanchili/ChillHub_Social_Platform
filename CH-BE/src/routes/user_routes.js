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
router.post('/home/addpost',screenController.postFeed)
router.get('/home/getpost', screenController.getFeed)

export default router