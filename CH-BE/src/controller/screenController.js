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

export default {
    home
}