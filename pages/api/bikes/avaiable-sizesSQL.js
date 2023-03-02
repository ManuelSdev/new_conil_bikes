import pool from '@/src/lib/db'
import dbConnect from '@/src/lib/dbConnect'
import Bike from '@/src/models/Bike'
import Booking from '@/src/models/Booking'

/**
 * OBTIENE RESERVAS ACTIVAS EN FECHA SELECCIONADA:
 * -Busco los id dentro del rango de fechas de la tabla booking
 * -Devuelvo as *matchedBookingId
 * OBTIENE Las BICICLETAS QUE INCLUYEN ESAS RESERVAS ACTIVAS
 * -Busco los bikeSn de los *matchedBookingId   en la tabla bookingOrder
 * -Devuelvo as *matchedBikeSn
 * OBTIENE TODAS LAS BICICLETAS EXCEPTO LAS INCLUIDAS EN RESERVAS ACTIVAS
 * -Busco los size que no son *matchedBikeSn en la tabla bike
 * -Eliminio duplicados
 * -Devuelvo as *avaiableSizes
 *
 */

/**
 * Pilla las sizes de Bike
 * - sn esta en BookingOrder
 * - su bookingId tiene las fechas del rango
 */
const query = (dateRange) => `
SELECT
  id
FROM
  test
WHERE
  '[${dateRange}]'::tstzrange && tzdate
`
export async function getSizes(filters) {
   return 'avaiableBikesSizes'
}

export default async function handler(req, res) {
   // const dateRange = req.query
   const { from, to } = req.query
   const strDateRange = `${from},${to}`
   console.log('--------> ', strDateRange)
   try {
      await pool.connect()
      const { rows } = await pool.query(query(strDateRange))
      //await getSizes(date)
      console.log('SQL---------', rows)
      res.status(201).json(rows)
   } catch (err) {
      console.log('ERROR BIKES GET', err.message)
      res.status(500)
   }
}

/*
db.hotels.find({
    $and: [
        {
            bookings: {
                $elemMatch: {

                    $or: [
                        { from: { $gte: to_date } },
                        { to: { $lte: from_date } }
                    ]

                }
            }
        },
        {
            bookings: {
                $not: {
                    $elemMatch: {

                        $or: [
                            { from: { $gte: from_date, $lte: to_date } },
                            { to: { $lte: to_date, $gte: from_date } }
                        ]

                    }
                }
            }
        }]
})

*/
