import mongoose from './indexModel.js';

const commentsSchema = new mongoose.Schema({
    ownerId : {
        type : String,
        required : false
    },
    // ownerId : {
    //     type : String,
    //     required : false
    // },
    // ownerId : {
    //     type : String,
    //     required : false
    // },
    postId : {
        type : String,
        required : false
    },
    commentText : {
        type : String,
        required : false
    }    
},
{
    collection:'comments',
    versionKey:false,
})

const CommentsModel = mongoose.model('comments', commentsSchema)

export default CommentsModel