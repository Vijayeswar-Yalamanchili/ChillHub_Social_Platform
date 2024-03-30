import express from 'express'
import registerLoginController from '../controller/registerLogin_controller.js'
import postController from '../controller/postController.js'
import auth from '../helper/auth.js'
import uploadController from '../controller/uploadController.js'
import usersDataController from '../controller/usersDataController.js'
// import multer from 'multer'

const router = express.Router()

// router.get('/',(req,res)=>{
//     res.send(`<h1>Welcome to Chillhub</h1>`)
// })


// Register & Login
router.post('/',registerLoginController.login)
router.post('/register',registerLoginController.register)
router.put('/forgotPassword',registerLoginController.forgotPassword)
router.get('/forgotPassword/:id/verify/:token',registerLoginController.verifyCode)
router.put('/resetPassword',registerLoginController.resetPassword)



router.get('/home',auth.authenticate,auth.userGuard,postController.home)
router.post('/home/addpost',auth.authenticate,auth.getUserEmail,uploadController.postUpload.single('img-file') ,postController.createPost) 
router.get('/home/getposts/:id', auth.authenticate, postController.getPosts)
router.get('/home/getuserposts/:id', auth.authenticate, postController.getUserPosts)
router.delete('/home/deleteuserpost/:id',auth.authenticate, postController.deleteUserPost)
router.put('/home/updatePostReaction/:id',auth.authenticate, postController.updatePostLikeStatus)

// User Profile Datas
router.post('/home/adduserdatas',auth.authenticate,auth.getUserEmail,uploadController.profilePicUpload.single('imageDP'),usersDataController.addUsersData)
router.get('/home/getuserdatas/:id', auth.authenticate, usersDataController.getUsersData)

export default router