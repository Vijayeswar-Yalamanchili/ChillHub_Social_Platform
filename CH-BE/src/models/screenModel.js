import mongoose from './indexModel.js';

const validateEmail = (email) => {
    return String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const datasSchema = new mongoose.Schema({
    email:{
        type : String,
        required:[false,"Email is required"],
        validate: {
            validator : validateEmail,
            message : props => `${props.value} is not a valid email`
        }
    },
    postBody: {
        type: String,
        trim: true,
        maxlength: 500,
        required: true,
    },
    // postComments : {
    //     required : true,
    //     type : [
    //         {
    //             postId: {
    //                 type : String,
    //                 required : true
    //             }
    //         },

    //     ]
    // },
    // addpost : {
    //     type : String,
    //     required : [true]
    // },
    status:{
        type:Boolean,
        default:true,
        required : [true]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required : [true]
    }
},
{
    collection:'feedData',
    versionKey:false,
    timestamps : true
})

const FeedDatasModel = mongoose.model('feedData', datasSchema)

export default FeedDatasModel