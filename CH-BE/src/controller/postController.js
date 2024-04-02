import FeedDatasModel from "../models/postModel.js"

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
        const postData = await FeedDatasModel.create({...req.body,ownerName : req.user.name, ownerEmail : req.user.email, ownerID : req.user.id })
        // console.log(postData,"sdfd")
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
        // console.log(getpost)
        if(getpost.length >= 1){
            // getpost.reverse()
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
        // console.log(getuserpost)
        if(getuserpost.length > 0){
            // getuserpost.reverse()
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
        console.log("qwe")
        let postToBeUpdated = await FeedDatasModel.findOne()
        console.log(postToBeUpdated);
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting Userposts"
        }) 
    }
}

const deleteUserPost = async(req,res) => {
    try {
        // console.log("re",req.params.id,"qq") 
        let postToBeDeleted = await FeedDatasModel.findOneAndDelete({_id:req.params.id})
        // console.log(postToBeDeleted,"hi")
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
        // console.log("re",req.params.id,"qq") 
        let postToBeReacted = await FeedDatasModel.findOneAndUpdate({_id:req.params.id},[ { "$set": { "currentLikeStatus": { "$eq": [false, "$currentLikeStatus"] } } } ])
        // console.log(postToBeReacted,"hi")
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
    getPosts,
    getUserPosts,
    deleteUserPost,
    updatePost,
    updatePostLikeStatus
}
