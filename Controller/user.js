const ownerRooms = [
  {
    roomId: 1,
    roomName: "Single Bed AC Room",
    roomStatus: "available",
    amenities: "Tv,mini-Fridge,Heater",
    seats: 2,
    PricePerHour: 200,
  },
  {
    roomId: 2,
    roomName: "Double Bed AC Room",
    roomStatus: "available",
    amenities: "Tv,mini-Fridge,Heater",
    seats: 4,
    PricePerHour: 300,
  },
  {
    roomId: 3,
    roomName: "Single Bed Non-AC Room",
    roomStatus: "available",
    amenities: "Tv,mini-Fridge,Heater",
    seats: 2,
    PricePerHour: 200,
  },
  {
    roomId: 4,
    roomName: "Double Bed Non-AC Room",
    roomStatus: "available",
    amenities: "Tv,mini-Fridge,Heater",
    seats: 4,
    PricePerHour: 300,
  },
];
let bookingRoom=[]

export const getOwnerRoom=(req,res)=>{
  res.status(200).json({data:"get all rooms detail",OwnerRoom:ownerRooms})
}
//create data
export const createRoom=(req,res)=>{
    const{roomName,roomStatus,amenities,seats,PricePerHour}=req.body
    
    let id=ownerRooms.length ? ownerRooms[ownerRooms.length-1].roomId+1 : 1
    const newRoom={
        roomId : id,
        roomName:roomName,
        roomStatus:roomStatus,
        amenities:amenities,
        seats:seats,
        PricePerHour:PricePerHour

    }
    ownerRooms.push(newRoom);
    res.status(200).json({message:"new room",Room:ownerRooms})
}
//booking room
export const bookRoom=(req,res)=>{
    let{customerName,date,startTime,endTime,roomId}=req.body;
    let room=ownerRooms.filter((d)=>d.roomStatus == 'available' && d.roomId == roomId)
    if(!room){
        return res.status(400).json({message:'Room is not available'})
    }
    else{
        let bookingRoomsdate=bookingRoom.filter((room)=>room.bookingDate == date)
        if(bookingRoomsdate.length>0)
        {
    console.log('truev block');
    return res.status(400).json({
        message:"date is not available"
    })
        }
        else{
           console.log('false block');
           let booking={
            customerName,
            startTime,
            endTime,
            roomId,
            Date:date,
            bookingId : bookingRoom.length+1,
            bookingDate:date,
            status:"booked"
           }
           bookingRoom.push(booking)
           return res.status(200).json({message:"booked",BookingRoom:bookingRoom})
        }
    }
}
export const  bookedRoom=(req,res)=>{
    res.status(200).json({message:"booked success",bookingRoom})

}
export const getAllCustomerData=(req,res)=>{
    const customerlist=bookingRoom.map((booking)=>{
        const rooms=ownerRooms.find((o)=>o.roomId == booking.roomId)
        return{
            customer_Name:booking.customerName,
            Room_Name:rooms ? rooms.roomName : null,
            Date:booking.Date,
            StartTime:booking.startTime,
            EndTime:booking.endTime
        }
        
    })
    res.status(200).json({message:'customer details',customerlist})
}

// Assuming this code is within an Express.js route handler
export const getCustomerBookingCount= (req, res) => {
    const { customerName } = req.body;

    if (!customerName) {
        return res.status(400).json({ error: 'Customer name is required in the request body' });
    }

    const bookingsByCustomer = bookingRoom.filter(
      (booking) => booking.customerName === customerName
    );

    const bookingCount = bookingsByCustomer.length;
    console.log(bookingCount);
    
  return  res.status(200).json({ "bookingCount is": bookingCount});
};
