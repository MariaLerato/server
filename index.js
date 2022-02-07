import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import HotelDAO from './Dao/hotelsDao.js'
import HotelGuestDAO from './Dao/hotelGuests.dao.js'
import HotelRoomDAO from './Dao/hotelRoom.dao.js'
const Mongo = mongodb.MongoClient
dotenv.config()

const port = process.env.PORT || 3000
Mongo.connect(
    process.env.Connect ,{
     maxPoolSize:50,
     wtimeoutMS:250,
     useNewUrlParser: true,
     useUnifiedTopology:true
 }  
).catch(err=>{
    console.error(err.stack)
    process.exit(1)
}).then(async client=>{
    await HotelDAO.injectDB(client)
    await HotelGuestDAO.injectDB(client)
    await HotelRoomDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`Connected to port ${port}`)
    }
    )
})


