import  mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId

let hotelRoom

export default class HotelRoomDAO{
    static async injectDB(conn){
        if(hotelRoom){
            return
        }
        try{
            hotelRoom = await conn.db(process.env.Database).collection("hotelrooms")
        }catch(err){
            console.log(
                `Unable to establish a connection handle in hotelDao:${err},`
            )
        }
    }
   
   
    static async addHotelRoom(hotelId,name,description,date,image){
        try{
            const hotelRoomHoc = {
                hotel_id:ObjectId(hotelId),
                name:name,
                image:image,
                text:description,
                date:date

            }
            console.log(hotelRoomHoc)
            return await hotelRoom.insertOne(hotelRoomHoc)
        }catch(e){
            console.error(`Unable to post hotel room :${e}`)
        }
    }
    static async getHotelRoom({
        filters = null,
        page=0,
        hotelRoomPerPage = 10,
    } = {}){
        let query
        if(filters){
            if("name" in filters){
                query = {$text:{$search:filters["name"]}}
            }
        }
        let cursor
        try{
            cursor = await hotelRoom
            .find(query)
        }catch(e){
            console.log(`Unable to issue or find a command, ${e}`)
            return {hotelRoomList:[], totalNumHotelRoom:0}
        }
        const displayCursor = cursor.limit(hotelRoomPerPage).skip(hotelRoomPerPage * page)
        try{
            const hotelRoomList = await displayCursor.toArray()
            const totalNumHotelRoom = await hotelRoom.countDocuments(query)
            return {hotelRoomList,totalNumHotelRoom}
        }catch(e){
            console.log(`Unable to convert cursor to array, ${e}`)
            return {hotelRoomList:[],totalNumHotelRoom:0}
        }
    }
    static async deleteHotelRoom(hotelId,roomId){
        try{
           const deleteResponse = await hotelRoom.deleteOne({
               _id:ObjectId(hotelId),
               roomId:roomId
           }) 
           return deleteResponse
           
        }catch(e){
            console.error(`Unable to delete hotel:${e}`)
            return {error:e}
        }
    }
}