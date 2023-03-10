import { query } from '@/src/lib/db'

const setText = (dateRange, size, type) => `
WITH AvaiableBikes AS (
  SELECT distinct
  bikesn,
    bikeSize,
    modelId
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
                AND bikesize='${size}'
        ORDER BY
          bikesize ASC
)
    SELECT DISTINCT
      bikeModelRange
    FROM
      AvaiableBikes
      INNER JOIN BikeModel USING (modelId) 
      WHERE bikemodeltype='${type}'
`

export default async function handler(req, res) {
   const { from, to, size, type } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange, size, type)
   try {
      const { rows } = await query(text, 'array')
      const avaiableRanges = rows.flatMap((r) => r)
      //  console.log('++++++++', avaiableRanges)
      res.status(201).json(avaiableRanges)
   } catch (err) {
      console.log('ERROR API AVAIABLE RANGES', err.message)
      res.status(500)
   }
}
