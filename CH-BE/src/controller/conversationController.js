import conversationModel from "../models/conversationModel.js"

const addConversation = async(req,res) => {
    try {
        const addConv= await conversationModel.create({...req.body})
        res.status(200).send({
            message:"Success in adding conversations",
            addConv
        })        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding conversations"
        })
    }
}

const getConversation = async(req,res) => {
    try {
        const getConversations = await conversationModel.find({members:{$in : [req.params.id]}})
        res.status(200).send({
            message:"Success in getting conversations",
            getConversations
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting conversations"
        })
    }
}

export default {
    addConversation,
    getConversation
}