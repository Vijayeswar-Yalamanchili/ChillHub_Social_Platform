import RegisterLoginModel from '../models/registerLogin_model.js'

const getAllUsers = async(req,res) => {
    const userId = req.query.userId;
    try {
        const getusers = userId ? await RegisterLoginModel.findById(userId) : await RegisterLoginModel.find()
        res.status(200).send({
            message:"all users fetched",
            getusers
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting all users"
        })
    }
}

const getNewFrds = async(req,res) => {
    try {
        const getusers = await RegisterLoginModel.find()
        const getCurrentUser = await RegisterLoginModel.findById({_id : req.params.id})
        const currentUserFrds = getCurrentUser.friends
        if(getusers){
            res.status(200).send({
                message:"my frds fetched",
                getusers,
                currentUserFrds
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting all users"
        })
    }
}

const getUsersBday = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findById({_id : req.params.id})
        if(user){
            const posts = await Promise.all(
                user.friends.map((e) => {
                    return RegisterLoginModel.find({_id : e.userId})
                })             
            )
            const flatPost = posts.flat()                           
            res.status(200).send({
                message:"frds bday data fetch by based on frdsID successful",
                flatPost
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting frds bday"
        }) 
    }
}

const addFriend = async(req,res) => {
    if(req.params.id !== req.params.friendId){
        try {
            const user = await RegisterLoginModel.findById({_id : req.params.id})
            if(user){
                if (user.friends.includes(req.params.friendId)) {
                    res.status(400).send({
                        message:"Can't follow the same user twice"
                    })
                }else{
                    const addFriendInUser = await RegisterLoginModel.findByIdAndUpdate({_id:req.params.id},{$push : {friends : {userId : req.params.friendId}}})
                    const addFriendInFriend = await RegisterLoginModel.findByIdAndUpdate({_id:req.params.friendId},{$push : {friends : {userId : req.params.id}}})
                    res.status(200).send({
                        message:"Friend Added",
                        addFriendInUser,
                        addFriendInFriend
                    })
                }
            }else{
                res.status(400).send({
                    message:"User Not found"
                })
            }
        } catch (error) {
            res.status(500).send({
                message:"Internal Server Error in adding friends"
            })
        }
    }else{
        res.status(400).send({
            message:"FriendId & UserID are same"
        })
    }
}

const removeFriend = async(req,res) => {
    if(req.params.id !== req.params.friendId){
        try {
            const user = await RegisterLoginModel.findById({_id : req.params.id})
            if(user){
                if (user.friends.includes(req.params.friendId)) {
                    res.status(400).send({
                        message:"Can't unfollow someone you don't follow in the first place"
                    })
                }else{
                    const removeFriendInUser = await RegisterLoginModel.findByIdAndUpdate({_id:req.params.id},{$pull : {friends : {userId : req.params.friendId}}})
                    const removeFriendInFriend = await RegisterLoginModel.findByIdAndUpdate({_id:req.params.friendId},{$pull : {friends : {userId : req.params.id}}})
                    res.status(200).send({
                        message:"Removed Friend",
                        removeFriendInUser,
                        removeFriendInFriend
                    })
                }
            }else{
                res.status(400).send({
                    message:"User Not found"
                })
            }
        } catch (error) {
            res.status(500).send({
                message:"Internal Server Error in removing friends"
            })
        }
    }else{
        res.status(400).send({
            message:"FriendId & UserID arent same"
        })
    }
}

const getMyFriends = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findById({_id : req.params.id})
        if(user){
            const myFriendsList = await Promise.all(
                user.friends.map((e) => {
                    return RegisterLoginModel.findById(e.userId).select("-password")
                })
            )
            if (myFriendsList.length > 0) {
                res.status(200).send({
                    message:"my frds fetched",
                    myFriendsList
                })
            }else{
                res.status(400).send({
                    message : "No friends found"
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting myfrds"
        })
    }
}

const getMyOnlineFriends = async(req,res) => {
    try {
        const user = await RegisterLoginModel.findById({_id : req.params.id})
        if(user){
            const myFriendsList = await Promise.all(
                user.friends.map((e) => {
                    return RegisterLoginModel.findById(e.userId).select("-password")
                })
            )
            if (myFriendsList.length > 0) {
                res.status(200).send({
                    message:"my frds fetched",myFriendsList
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting myfrds"
        })
    }
}

export default{
    getAllUsers,
    addFriend,
    removeFriend,
    getNewFrds,
    getMyFriends,
    getUsersBday,
    getMyOnlineFriends
}