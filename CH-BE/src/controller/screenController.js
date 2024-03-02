
import RegisterLoginModel from "../models/registerLogin_model.js"
import FeedDatasModel from "../models/screenModel.js"

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
        console.log("hi");
        const getEmailFormUsersDb = await RegisterLoginModel.aggregate([{$match : {role : 'user'}},{$project : {email : 1}},{$addFields : {email: "$email"}},{$out: "feedData"}])
        console.log("sdccsdcs");
        const addfeed = await FeedDatasModel.aggregate([{$project : {email : "$email"}},{$set : {feededData : [req.body]}},{$out: "feedData"}])
        console.log("dcsajknaksj")
        // const updateLatestFeed = await FeedDatasModel.findOneAndUpdate({$project : {email : "$email"}},{$set : {$cond : {if : {feededData : {$exists : true}},then : {_id : new ObjectID()},else : null}}})
        // const updateLatestFeed = await FeedDatasModel.aggregate([{$project : {feededData : {$exists : true}}},{$push : {feededData : req.body}}],{$out: "feedData"})        
        // console.log(updateLatestFeed);
        const addPostFeed = await FeedDatasModel.find()
        console.log( addPostFeed );
        res.status(200).send({
            message:"Feed created",
            addPostFeed,
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

export default {
    home,
    postFeed
}