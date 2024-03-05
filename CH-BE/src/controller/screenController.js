import RegisterLoginModel from "../models/registerLogin_model.js"
import FeedDatasModel from "../models/screenModel.js"
import auth from "../helper/auth.js"

const home = async(req,res)=>{
    try {
        // let users = await UserModel.find({},{password:0})
        res.status(200).send({
            message:"homepage"
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const postFeed = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findOne()
        const getEmailFormUsersDb = await RegisterLoginModel.aggregate([{$match : {email : `${user.email}`}},{$project : {email : 1}},{$addFields : {email: "$email",_id: "$_id"}},{$out: "feedData"}])
        const addfeed = await FeedDatasModel.aggregate([{$match : {email : `${user.email}`}},{$addFields : {createdAt : Date()}},{$out: "feedData"}])
        const addCreatedTime = await FeedDatasModel.findOneAndUpdate({email : `${user.email}`}, {$set : {_id:`${user._id}` ,feededData : req.body}})
        // const updateLatestFeed = await FeedDatasModel.findOneAndUpdate({$project : {email : "$email"}},{$set : {$cond : {if : {feededData : {$exists : true}},then : {_id : new ObjectID()},else : null}}})
        console.log(addCreatedTime);
        if(addCreatedTime){
            const addPostToken = await auth.createAddPostToken({
                id : addCreatedTime._id,
                email : addCreatedTime.email,
                text : addfeed.feededData
            })
            res.status(200).send({
                message:"Feed created",
                addPostToken
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding post"
        })
    }
}

const getFeed = async(req,res) => {
    try {
        const getpostEmail = await FeedDatasModel.find()
        console.log(getpostEmail);
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting post"
        }) 
    }

}

export default {
    home,
    postFeed,
    getFeed
}