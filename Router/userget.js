import express from 'express'
import { bookRoom, bookedRoom, createRoom, getAllCustomerData, getCustomerBookingCount, getOwnerRoom } from '../Controller/user.js';

const router=express.Router()
router.get('/rooms',getOwnerRoom)
router.post('/newroom',createRoom)
router.post('/bookroom',bookRoom)
router.get('/bookedroom',bookedRoom)
router.get('/customer',getAllCustomerData)
router.post('/countcustomer',getCustomerBookingCount)


export default router;