import conversationModel from "../models/conversationModel.js"

const addConversation = async(req,res) => {
    try {
        const addConv= await conversationModel.create({members : req.body,ownerId : req.user.id})
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
        const getConvs = await conversationModel.find()
        res.status(200).send({
            message:"Success in getting conversations",
            getConvs
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