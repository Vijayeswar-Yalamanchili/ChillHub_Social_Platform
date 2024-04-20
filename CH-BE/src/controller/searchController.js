import RegisterLoginModel from "../models/registerLogin_model.js"

const searchData = async(req,res)=>{
    try {
        const searchDatas = await RegisterLoginModel.find()
        res.status(200).send({
            message:"data search successful",
            searchDatas
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in searching datas"
        })
    }
}

export default {
    searchData
}