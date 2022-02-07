import express from 'express'
import HotelsCtrl from '../Controllers/hotelControllers.js'

const router = express.Router()

router.route("/")
.get(HotelsCtrl.apiGetHotels)
.post(HotelsCtrl.apiPostHotel)
.delete(HotelsCtrl.apiDeleteHotel)
.put(HotelsCtrl.apiUpdateHotel)


export default router

