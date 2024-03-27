import UserDatasModel from "../models/userDetailModel.js"

const addUsersData = async(req,res) => {
    try {
        const addDatas = await UserDatasModel.create({...req.body, ownerEmail : req.user.email, ownerID : req.user.id, ownerFirstName : req.user.firstName, ownerLastName : req.user.lastName })
        // console.log("123");
        // console.log(addDatas,req.body)
        if(addDatas){
            res.status(200).send({
                message:"users datas added",
                addDatas
            })
        }else {
            res.status(400).send({
                message: "error is storing userDatas"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding userbiodata"
        })
    }
}

const getUsersData = async(req,res) => {
    try {
        // console.log("qwe");
        const getData = await UserDatasModel.findOne({ownerID : req.params.id}).sort({_id:-1}).limit(1)
        // console.log(getData)
        if(getData === null){
            // alert('No Bio Found')
            res.status(204).send({
                message:"No Bio Found"
            })
        }else{
            res.status(200).send({
                message:"UserDatas data fetch by id successful",
                getData
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting userbiodata"
        })
    }
}

export default {
    addUsersData,
    getUsersData
}