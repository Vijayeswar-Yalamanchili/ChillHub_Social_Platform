import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './routes/user_routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin : process.env.BASE_URL,
    methods : 'GET, POST, PUT,DELETE',
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(AppRoutes)
app.use(express.static('postImages'))
app.use(express.static('userProfilePics'))

app.listen(PORT, ()=>console.log(`App is listening ${PORT}`)) 