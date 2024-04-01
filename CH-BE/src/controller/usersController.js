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
        // console.log(req.user)
        const friends = await RegisterLoginModel.findByIdAndUpdate({_id:req.user.id},{$push : {friends : req.body.id}})
        console.log(friends) 
        // res.status(200).send({
        //     message:"friends added",
        //     friends
        // }) 
    } catch (error) {
        console.log("err");
        res.status(500).send({
            message:"Internal Server Error in adding friends"
        })
    }
}

export default{
    getUsers,
    addFriend
}