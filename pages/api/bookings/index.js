import dbConnect from '@/src/lib/dbConnect'
import Booking from '@/src/models/Booking'
import pool from '@/src/lib/db'
//TODO mete los catch dentro de cada función concreta

export async function getBooking(_id) {
   await dbConnect()
   const [booking] = await Booking.find({ _id })
   //console.log("¿¿¿¿¿¿¿¿¿", booking);
   return booking
}

export async function addBooking(req, res) {
   const {
      from,
      to,
      bikes,
      name,
      address,
      phone,
      price,
      mail,
      homeDelivery,
      homePickup,
      duration,
   } = req.body

   const createBookingText = `
   WITH newBooking AS (
    INSERT INTO booking (customerEmail,bookingPrice,bookingDateRange,bookingDuration,deliveryAddress,pickupAddress)
        VALUES ('${mail}', ${price}, '[${from},${to}]', ${duration}, ${homeDelivery}, ${homePickup})
        RETURNING
        bookingId
    )
   `
   const getBikeSnText = () => {
      let text = ''
      bikes.forEach((bike, index) => {
         const { id, size } = bike
         text =
            text +
            `
       (
        (SELECT
          bikeSn
        FROM
          Bike
        WHERE
          modelId IN ('${id}')
          AND bikeSize IN ('${size}')
        LIMIT 1),
      (SELECT
        bookingId
        FROM
          newBooking)
          ) ${index === bikes.length - 1 ? '' : ','}
       `
      })
      return text
   }
   const text = `
   ${createBookingText}
   INSERT INTO
    BookingOrder
    VALUES
    ${getBikeSnText()}
   `
   await pool.connect()
   const response = await pool.query(text)
   console.log('@@@@@@@@@@@+++++++', response)
   res.status(201).json('response')
   try {
   } catch (error) {
      console.log('ERROR API CREATE BOOKING', err.message)
      res.status(500)
   }
}

export async function updateBooking(data) {
   await dbConnect()
   const { _id, state } = data
   const updatedBookingInfo = await Booking.updateOne(
      { _id },
      { $set: { state } }
   )
   return updatedBookingInfo
}

const request = (req, res) => {
   switch (req.method) {
      case 'GET':
         console.log('------------ GETTTTTTTT')
         const { _id } = req.query
         return getBooking(_id)
         break
      case 'POST':
         return addBooking(req, res)
         break
      case 'PATCH':
         console.log('------------ PATCH************')
         return updateBooking(req.body)
         break
      default:
         break
   }
}

export default async function handler(req, res) {
   switch (req.method) {
      case 'GET':
         console.log('------------ GETTTTTTTT')
         const { _id } = req.query
         return getBooking(_id)
         break
      case 'POST':
         return addBooking(req, res)
         break
      case 'PATCH':
         console.log('------------ PATCH************')
         return updateBooking(req.body)
         break
      default:
         break
   }
}
