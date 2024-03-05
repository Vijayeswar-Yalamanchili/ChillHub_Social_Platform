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
    feededData : {
        required : true,
        type : [{
            _id: { 
                type: mongoose.Schema.Types.ObjectId,
                default: mongoose.Types.ObjectId
            },
            feededData : {
                type : String,
                required : true
            },
            postedAt : {
                type : Date,
                default : Date.now()
            }                    
        }]
    },
    // feededData:{
    //     // type: [{feedInputData: String}],  
    //     type : String,
    //     maxlength: 500,
    //     required: true,
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:true,
    },
    
},
{
    collection:'feedData',
    versionKey:false,
})

const FeedDatasModel = mongoose.model('feedData', datasSchema)

export default FeedDatasModel


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