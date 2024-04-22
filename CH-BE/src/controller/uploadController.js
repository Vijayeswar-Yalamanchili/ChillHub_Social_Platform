import multer from 'multer'
import path from 'path'

//for post Image 
const poststorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("dest");
        cb(null, 'postImages')
    },
    filename: function (req, file, cb) {
        // console.log("file,this.filename : ", file,this.filename)
        const uniqueSuffix = Date.now()
        // cb(null, uniqueSuffix + path.extname(file.originalname))
      cb(null, uniqueSuffix + file.originalname)
    }
})
// const poststorage = multer.memoryStorage()
const postUpload = multer({ storage: poststorage })

//for DP
const profilePicstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'userProfilePics')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const profilePicUpload = multer({ storage: profilePicstorage })

export default {
    postUpload,
    profilePicUpload
}