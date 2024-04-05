import RegisterLoginModel from '../models/registerLogin_model.js'

const getUsers = async(req,res) => {
    try {
        const getusers = await RegisterLoginModel.find()
        // console.log(getusers)   
        res.status(200).send({
            message:"users fetched",
            getusers
        })       
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting all users"
        }) 
    }
}

const addFriend = async(req,res) => {
    try {
        // console.log("qwe", req.params)
        const friends = await RegisterLoginModel.findByIdAndUpdate({_id:req.params.id},{$push : {friends : req.params.friendId}})
        // console.log(friends) 
        res.status(200).send({
            message:"friends added",
            friends
        }) 
    } catch (error) {
        // console.log("err");
        res.status(500).send({
            message:"Internal Server Error in adding friends"
        })
    }
}

const getMyFriends = async(req,res) => {
    try {
        // console.log("req.params",req)
        const getMyFrds = await RegisterLoginModel.find()
        console.log("getMyFrds")
        res.status(200).send({
            message:"my frds fetched",
            getMyFrds
        })
        
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting myfrds"
        }) 
    }
}

export default{
    getUsers,
    addFriend,
    getMyFriends
}