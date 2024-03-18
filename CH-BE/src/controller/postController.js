import FeedDatasModel from "../models/postModel.js"

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
        // const postData = await FeedDatasModel.create({...req.body,image : req.file , ownerEmail : req.userEmail, ownerID : req.userid })
        const postData = await FeedDatasModel.create({...req.body, ownerEmail : req.user.email, ownerID : req.user.id })
        console.log(postData,req.body)
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
        if(getuserpost.length >= 1){
            getuserpost.reverse()
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

const deleteUserPost = async(req,res) => {
    try {
        let userPost = await FeedDatasModel.findOne({ownerID:req.params.id})
        // console.log(userPost,"hi")
        if(userPost){
            let postId = userPost._id
            // console.log(postId);
            if(postId !== ""){
                let deletedPost = await FeedDatasModel.deleteOne({_id:userPost._id})
                // console.log(deletedPost);
                res.status(200).send({
                    message:"Post deleted please refresh",
                    deletedPost
                })
            }
            
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
    // try {
    //     const deleteuserpost = await FeedDatasModel.findById({_id : req.params.id})
    //     console.log(deleteuserpost.ownerEmail,"hi");
    //     if(deleteuserpost._id === req.body.id){
    //         console.log("deleted");
    //     }else{
    //         console.log("failed");
    //     }
    // } catch (error) {
    //     res.status(500).send({
    //         message:"Internal Server Error in deleting Userpost"
    //     })
        
    // }
}

export default {
    home,
    createPost,
    getPosts,
    getUserPosts,
    deleteUserPost
}
