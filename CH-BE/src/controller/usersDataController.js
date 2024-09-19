import RegisterLoginModel from '../models/registerLogin_model.js'

const addUsersData = async(req,res) => {
    try {
        if(req?.file === undefined){
            const addDatas = await RegisterLoginModel.findOneAndUpdate(
                {_id:req.user.id},
                {$set : {"bio" : req.body.bio, "dob" : req.body.dob}
            })
            if(addDatas){
                res.status(200).send({
                    message:"users datas added",
                    addDatas
                })
            }else {
                res.status(400).send({
                    message: "Error is storing userDatas"
                })
            }
        }
        else {
            const addDatas = await RegisterLoginModel.findOneAndUpdate(
                {_id:req.user.id},
                {$set : {"imageDP" : req.file.filename, "bio" : req.body.bio, "dob" : req.body.dob}
            })
            if(addDatas){
                res.status(200).send({
                    message:"users datas added",
                    addDatas
                })
            }else {
                res.status(400).send({
                    message: "Error is storing userDatas"
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in adding userbiodata"
        })
    }
}

const getUsersData = async(req,res) => {
    try {
        const getData = await RegisterLoginModel.findOne({_id:req.params.id})
        if(getData === null){
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