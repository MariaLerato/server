import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId

let hotelGuests

export  default class HotelGuestsDAO{
    static async injectDB(conn){
        if(hotelGuests){
            return
        }
        try{
            hotelGuests = conn.db(process.env.Database).collection("hotelguests")
        }catch(e){
            console.error(`Unable to establish connection handle in hotelsDao: ${e}`)
        }
    }
    static async addHotelGuests(guestId,name,address,status,adminId){
        try{
            const hotelGuestsHoc = {
                guest_id:ObjectId(guestId),
                name:name,
                province:address.province,
                city:address.city,
                status:status,
                adminId:adminId,
                room:address.room,
                checkIn:address.checkIn,
                checkOut:address.checkOut
               
            }
            console.log(hotelGuestsHoc)
            return await hotelGuests.insertOne(hotelGuestsHoc)
        }catch(e){
            console.error(`Unable to post hotel guests :${e}`)
        }
    }
    static async getHotelGuests({
        filters = null,
        page=0,
        GuestPerPage = 10,
    } = {}){
        let query
        if(filters){
            if("name" in filters){
                query = {$text:{$search:filters["name"]}}
            }
        }
        let cursor
        try{
            cursor = await hotelGuests
            .find(query)
        }catch(e){
            console.log(`Unable to issue or find a command, ${e}`)
            return {GuestList:[], totalNumGuests:0}
        }
        const displayCursor = cursor.limit(GuestPerPage).skip(GuestPerPage * page)
        try{
            const GuestList = await displayCursor.toArray()
            const totalNumGuests = await hotelGuests.countDocuments(query)
            return {GuestList,totalNumGuests}
        }catch(e){
            console.log(`Unable to convert cursor to array, ${e}`)
            return {GuestList:[],totalNumGuests:0}
        }
    }
    static async deleteHotel(hotelId,adminId){
        try{
           const deleteResponse = await hotelGuests.deleteOne({
               _id:ObjectId(hotelId),
               adminId:adminId
           }) 
           return deleteResponse
           
        }catch(e){
            console.error(`Unable to delete hotel:${e}`)
            return {error:e}
        }
    }
}
