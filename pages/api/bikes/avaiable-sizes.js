import pool from '@/src/lib/db'

const text = ({ dateRange }) => `
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
                  /*DONDE el rango dado se superpone en algún día
                   con algunos de los rangos que contiene la columna
                   tzdate de la tabla Booking*/
                  '[${dateRange}]'::tstzrange && bookingDateRange)))                 
          ORDER BY
            bikesize ASC
  `

const query = (filter) => ({
   text: text(filter),
   rowMode: 'array',
})

export default async function handler(req, res) {
   const { from, to } = req.query
   const dateRange = `${from},${to}`
   try {
      await pool.connect()
      const { rows } = await pool.query(query({ dateRange }))
      const avaiableSizes = rows.flatMap((r) => r)
      res.status(201).json(avaiableSizes)
   } catch (err) {
      console.log('ERROR API AVAIABLE SIZES', err.message)
      res.status(500)
   }
}
