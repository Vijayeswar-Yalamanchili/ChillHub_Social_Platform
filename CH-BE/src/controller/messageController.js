import MessageModel from "../models/messageModel.js"

const newMessage = async(req,res) => {
    try {
        // console.log(req.body)
        const newMessage= await MessageModel.create({...req.body, ownerId : req.user.id})
        res.status(200).send({
            message:"Success in adding newMessage",
            newMessage
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding newMessage"
        })
    }
}

const getMessage = async(req,res) => {
    try {
        console.log(req.params)
        // const getmessage = await MessageModel.findById({conversationId : req.params.conversationId})
        res.status(200).send({
            message:"Success in getting newMessages",
            // getmessage
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting newMessages"
        })
    }
}

export default {
    newMessage,
    getMessage
}