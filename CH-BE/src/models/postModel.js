import mongoose from './indexModel.js';

// const validateEmail = (email) => {
//     return String(email).toLowerCase()
//     .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
// }

const datasSchema = new mongoose.Schema({
    ownerID : {
        type : String,
        required : false
    },
    ownerEmail : {
        type : String,
        required : false
    },
    ownerName : {
        type : String,
        required : false
    },
    feededData:{
        type : String,
        required : false
    },
    imageUrl: {
        data : Buffer,
        type: String,
        required : false
    },
    ownerImageDP: {
        data : Buffer,
        type: String,
        required : false
    },    
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:true,
    },
    currentLikeStatus : {
        type : Boolean,
        default:false
    }
    
},
{
    collection:'feedData',
    versionKey:false,
})

const FeedDatasModel = mongoose.model('feedData', datasSchema)

export default FeedDatasModel