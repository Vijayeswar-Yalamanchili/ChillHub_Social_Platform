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
router.get('/home',auth.authenticate,auth.userGuard,screenController.home)

export default router 