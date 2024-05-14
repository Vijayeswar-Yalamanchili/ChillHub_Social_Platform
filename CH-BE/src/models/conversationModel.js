import mongoose from './indexModel.js';

const ConversationSchema = new mongoose.Schema({
      members: {
        type: Array,
        required : true
      },
      conversationStatus:{
        type:Boolean,
        default:false
    }
  },
  // { timestamps: true },
  {
      collection:'conversations',
      versionKey:false,
  })

const conversationModel = mongoose.model('conversations', ConversationSchema)

export default conversationModel