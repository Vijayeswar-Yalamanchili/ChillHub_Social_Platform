import CommentsModel from "../models/commentsModel.js"

const addComments = async(req,res)=>{
    try {
        const addComment = await CommentsModel.create({...req.body, ownerId : req.params.id, postId : req.params.postId })
        res.status(200).send({
            message:"comment Added",
            addComment
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding comments"
        })
    }
}

const getComments = async(req,res)=>{
    try {
        // console.log("scd")
        const getuserpostcomment = await CommentsModel.find({postId : "66197f6ac37220e4d14f10f3"})
        console.log(getuserpostcomment)
        // if(getuserpostcomment){
        //     res.status(200).send({
        //         message:"comment fetched",
        //         getuserpostcomment
        //     }) 
        // }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding comments"
        })
    }
}

export default {
    addComments,
    getComments
}