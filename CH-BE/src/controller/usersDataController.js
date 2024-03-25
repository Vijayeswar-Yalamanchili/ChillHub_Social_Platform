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

export default {
    addUsersData
}