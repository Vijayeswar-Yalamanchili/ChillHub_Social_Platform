import mongoose from './indexModel.js';

const ConversationSchema = new mongoose.Schema({
      members: {
        type: Array,
        required : false
      },
      ownerId : {
        type : String,
        required : false
      }
  },
  {
      collection:'conversations',
      versionKey:false,
  })

const conversationModel = mongoose.model('conversations', ConversationSchema)

export default conversationModel