import express from 'express'
import HotelGuestCtrl from "../Controllers/hotelGuests.controller.js"

const router =  express()
router.route("/").get(HotelGuestCtrl.apiGetHotelGuests)
.post(HotelGuestCtrl.apiPostHotelGuests)
.delete(HotelGuestCtrl.apiDeleteHotelGuests)

export default router
