import BSON from 'bson'
import HotelRoomDAO from '../Dao/hotelRoom.dao.js'

const ObjectId = BSON.ObjectId
export default class HotelRoomController{
    static async apiPostHotelRooms(req,res,next){
        try{
            const hotelId = req.body.hotel_id
             const name=  req.body.name
             const image = req.body.image
             const roomId = req.body.roomId
            const description = req.body.text
            const date = new Date()
            const HotelRoomResponse = await HotelRoomDAO.addHotelRoom(
                ObjectId(hotelId),
                name,
                description,
                date,
                image,
                roomId
            )
            console.log(HotelRoomResponse)
            res.json({status:"Success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetHotelRooms(req,res,next){
        const  hotelRoomPerPage = req.query. hotelRoomPerPage ? parseInt(req. hotelRoomPerPage, 10) :20
        const page = req.query.page  ? parseInt(req.query.page, 10): 0
        const filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        const { hotelRoomList,totalNumHotelRoom} = await HotelRoomDAO.getHotelRoom(
            filters,
            page,
            hotelRoomPerPage
        )
            let response = {
                hotelrooms: hotelRoomList,
                page:page,
                filters:filters,
                entries_per_page:hotelRoomPerPage,
                total_results:totalNumHotelRoom
            }
            res.json(response)
            console.log(response)
    }
    static async apiDeleteHotelRooms(req,res,next){
        try{
            const hotelId = req.query.id
            const roomId = req.body.roomId
            console.log(hotelId)
            const HotelResponse = await HotelRoomDAO.deleteHotelRoom(
              hotelId,
              roomId
            )
                console.log(HotelResponse)
            res.json({ status :"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }

    }
}