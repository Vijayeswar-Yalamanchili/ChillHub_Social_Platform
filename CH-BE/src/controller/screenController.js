import FeedDatasModel from "../models/screenModel.js"

const home = async(req,res)=>{
    try {
        // let users = await UserModel.find({},{password:0})
        res.status(200).send({
            message:"homepage"
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const createPost = async(req,res) => {
    try {
        const postData = await FeedDatasModel.create({...req.body , ownerEmail : req.userEmail, ownerID : req.userid })
        if(postData){
            res.status(200).send({
                message:"Feed created",
                postData
            })
        }else {
            res.status(400).send({
                message: "qwe"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding post"
        })
    }
}

const getPosts = async(req,res) => {
    try {
        const getpost = await FeedDatasModel.find()
        if(getpost.length >= 1){
            res.status(200).send({
                message:"posts data fetch by id successful",
                getpost
            })
        }else {
            res.status(204).send({
                message:"No posts available",
            })
        }        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting posts"
        }) 
    }

}

const getUserPosts = async(req,res) => {
    try {
        const getuserpost = await FeedDatasModel.find({ownerID : req.params.id})
        if(getuserpost.length >= 1){
            res.status(200).send({
                message:"Userposts data fetch by id successful",
                getuserpost
            })
        }else {
            res.status(204).send({
                message:"No posts available",
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting Userposts"
        }) 
    }

}

export default {
    home,
    createPost,
    getPosts,
    getUserPosts
}