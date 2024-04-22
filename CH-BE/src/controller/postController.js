import FeedDatasModel from "../models/postModel.js"
import RegisterLoginModel from "../models/registerLogin_model.js"

const home = async(req,res)=>{
    try {
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
        // console.log("req.body, req.file : ", req.body, req.file);
        const postData = await FeedDatasModel.create({feededData :req.body.feededData, imageUrl : req.file.filename ,ownerImageDP :req.user.imageDP,ownerName : req.user.name, ownerEmail : req.user.email, ownerID : req.user.id })
        if(postData){
            res.status(200).send({
                message:"Feed created",
                postData
            })
        }else {
            res.status(400).send({
                message: "Something went wrong!!!"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding post"
        })
    }
}

const getPost = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findById({_id : req.params.id})
        if(user){
            const posts = await Promise.all(
                user.friends.map((e) => {
                    return FeedDatasModel.find({ownerID : e.userId})
                })             
            )
            const currentUserPosts =await FeedDatasModel.find({ownerID : req.params.id})
            posts.push(currentUserPosts)
            const flatPost = posts.flat()                                
            res.status(200).send({
                message:"posts data fetch by ID successful",
                flatPost,
                user
            })
        }
        else {
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
        if(getuserpost.length > 0){
            // console.log(getuserpost)
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

const updatePost = async(req,res) => {
    try {
        console.log("req.body : ", req.body, "req.file : ", req.body, req.file)
        let postToBeUpdate = await FeedDatasModel.findOneAndUpdate({_id : req.params.postId},{$set : {"feededData" : req.body.feededData, "imageUrl" : req.file.filename }})
        res.status(200).send({
            message:"Post Updated",
            postToBeUpdate
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in updating Userposts"
        }) 
    }
}

const deleteUserPost = async(req,res) => {
    try {
        let postToBeDeleted = await FeedDatasModel.findOneAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Post deleted please refresh",
            postToBeDeleted,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            message:"Internal Server Error"
        })
    }
}

const updatePostLikeStatus = async(req,res) => {
    try {
        let postToBeReacted = await FeedDatasModel.findOneAndUpdate({_id:req.params.id},[ { "$set": { "currentLikeStatus": { "$eq": [false, "$currentLikeStatus"] } } } ])
        res.status(200).send({
            message:"Post reaction updated",
            postToBeReacted,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

export default {
    home,
    createPost,
    getPost,
    getUserPosts,
    deleteUserPost,
    updatePost,
    updatePostLikeStatus
}