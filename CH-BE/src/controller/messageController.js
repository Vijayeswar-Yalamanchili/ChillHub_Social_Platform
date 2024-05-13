import conversationModel from "../models/conversationModel.js"
import MessageModel from "../models/messageModel.js"
import RegisterLoginModel from "../models/registerLogin_model.js"

const newMessage = async(req,res) => {
    try {
        console.log(req.body)
        const newMessage= await MessageModel.create({...req.body})
        if(newMessage){
            const setConversationStatus = await conversationModel.findByIdAndUpdate({_id : req.body.conversationId},{$set : {"status" : true}})
            res.status(200).send({
                message:"Success in adding newMessage",
                newMessage
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding newMessage"
        })
    }
}

const getMessage = async(req,res) => {
    try {
        const getmessage = await MessageModel.find({conversationId : req.params.conversationId})
        res.status(200).send({
            message:"Success in getting newMessages",
            getmessage
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting newMessages"
        })
    }
}

const getChatUserName = async(req,res) => {
    try {
        // console.log(req.params)
        const getCurrentUser = await RegisterLoginModel.find({_id : req.params.id})
        console.log(getCurrentUser)
        if(getCurrentUser){
            res.status(200).send({
                message:"chat frd data fetched",
                getCurrentUser                
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting all users"
        })
    }
}

export default {
    newMessage,
    getMessage,
    getChatUserName
}