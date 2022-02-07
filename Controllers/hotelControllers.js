import HotelDAO from "../Dao/hotelsDao.js";
import BSON from "bson";

const ObjectId = BSON.ObjectID

export default class HotelsController{
    static async apiPostHotel(req,res,next){
        try{
            const hotelsId = req.body.hotels_id
            const adminId = req.body.adminId
            const image = req.body.image
            const description = req.body.text
            const hotelInfo = {
                name:req.body.name,  
                province:req.body.province
            }
         
            const HotelResponse = await HotelDAO.addHotel(
                ObjectId(hotelsId),
                hotelInfo,
                description,
                adminId,
                image
            )
            res.json({status: "Success Ok"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiUpdateHotel(req,res,next){
        try{
            const adminId = req.body.adminId
            const text = req.body.text
            const hotel ={
                checkIn:req.body.checkIn,
                checkOut:req.body.checkOut
            }

            const hotelResponse = await HotelDAO.updateHotel(
                adminId,
                req.body.hotelId,
                text,
                hotel
            )
            var {error} = hotelResponse
            if(error){
                res.status(400).json({error})
            }
            if(hotelResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update hotel - user may not be original poster"
                )
            }
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetHotels(req,res,next){
        const hotelsPerPage = req.query.hotelsPerPage ? parseInt(req.hotelsPerPage, 10) :20
        const page = req.query.page  ? parseInt(req.query.page, 10): 0
        console.log('loading....................')
        const filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        const {hotelList,totalNumHotels} = await HotelDAO.getHotels(
            filters,
            page,
            hotelsPerPage
        )
            let response = {
                hotels:hotelList,
                page:page,
                filters:filters,
                entries_per_page:hotelsPerPage,
                total_results:totalNumHotels
            }
            res.json(response)
            console.log(response)
    }
    static async apiDeleteHotel(req,res,next){
        try{
            const hotelId = req.query.id
            const adminId = req.body.adminId
            console.log(hotelId)
            const HotelResponse = await HotelDAO.deleteHotel(
              hotelId,
              adminId
            )
                console.log(HotelResponse)
            res.json({ status :"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }

    }


}