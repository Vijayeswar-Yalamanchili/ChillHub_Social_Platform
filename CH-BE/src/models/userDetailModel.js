import mongoose from './indexModel.js';

const UserDatasSchema = new mongoose.Schema({
    ownerID : {
        type : String,
        required : false
    },
    ownerFirstName:{
        type : String,
        required : false
    },
    ownerLastName:{
        type : String,
        required : false
    },
    ownerEmail : {
        type : String,
        required : false
    },
    bio:{
        type : String,
        required : false
    },
    imageDP: {
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
    
},
{
    collection:'usersData',
    versionKey:false,
})

const UserDatasModel = mongoose.model('usersData', UserDatasSchema)

export default UserDatasModel