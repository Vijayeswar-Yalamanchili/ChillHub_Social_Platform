import express from 'express'
import registerLoginController from '../controller/registerLogin_controller.js'

const router = express.Router()

// router.get('/',(req,res)=>{
//     res.send(`<h1>Welcome to Chillhub</h1>`)
// })
router.post('/',registerLoginController.login)
router.post('/register',registerLoginController.register)

export default router 