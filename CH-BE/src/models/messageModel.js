import mongoose from './indexModel.js';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type : String,
        required : false
    },
    senderId: {
        type : String,
        required : false
    },
    text: {
        type : String,
        required : false
    }
},
{ timestamps: true },
{
    collection:'messages',
    versionKey:false,
})

const MessageModel = mongoose.model('messages', MessageSchema)

export default MessageModel