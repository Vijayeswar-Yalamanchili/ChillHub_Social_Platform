import mongoose from './indexModel.js';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type : String,
        required : false
    },
    sender: {
        type : String,
        required : false
    },
    text: {
        type : String,
        required : false
    },
    ownerId: {
        type : String,
        required : false
    }
},
{
    collection:'messages',
    versionKey:false,
})

const MessageModel = mongoose.model('messages', MessageSchema)

export default MessageModel