import { query } from '@/src/lib/db'

const setText = (dateRange) => `
    SELECT distinct
      bikeSize
    FROM
      Bike
    WHERE
      bikeSn IN (
        SELECT
          bikeSn avaiableBikeSn
        FROM
          bike
        WHERE
          bikeSn NOT IN (
            SELECT
              bikeSn reservedBikeSn
            FROM
              BookingOrder
            WHERE
              bookingId IN (
                SELECT
                  bookingId reservedId
                FROM
                  Booking
                WHERE
                  '[${dateRange}]'::tstzrange && bookingDateRange)))                 
          ORDER BY
            bikesize ASC
  `

export default async function handler(req, res) {
   const { from, to } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange)
   try {
      const { rows } = await query(text, 'array')
      console.log('test----------------', rows)
      const avaiableSizes = rows.flatMap((r) => r)
      res.status(201).json(avaiableSizes)
   } catch (err) {
      console.log('ERROR API AVAIABLE SIZES', err.message)
      res.status(500)
   }
}
