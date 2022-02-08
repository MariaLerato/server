import express from 'express'
import cors from 'cors'
import mongodb from 'mongodb'
import http from 'http'
import hotels from './routes/hotelRoutes.js'
import hotelguests from "./routes/hotelGuests.route.js"
import hotelroom from './routes/hotelRooms.route.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const port = process.env.PORT || 2000

app.use(cors())
app.use(express.json())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use("/api/v1/hotels",hotels)
app.use("/api/hotelGuests",hotelguests)
app.use("/api/v1/hotelRoom",hotelroom)
const server = http.createServer(app)
server.listen(port,()=>{console.log(`Apps are running on localhost: ${port}`)})
app.use("*",(req,res)=>res.status(205).json({error:"whatevr"}))

app.use("*",(req,res)=>res.status(404).json({error:"not found"}))
server.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})
export default app


