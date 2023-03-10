import { query } from '@/src/lib/db'

const setText = (dateRange, size, range, type) => `
WITH AvaiableBikes AS (
  SELECT DISTINCT
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
                '[${dateRange}]'::tstzrange && bookingDateRange)))
          AND bikesize = '${size}'
        ORDER BY
          bikesize ASC
),
SelectedBikeModels AS (
  SELECT
    modelId,
    bikemodelname AS model,
    bikemodeltype AS type,
    bikemodelrange AS RANGE,
    bikemodelbrand AS brand,
    bikemodeldescription as description,
    bikemodelimages AS images
  FROM
    BikeModel
  WHERE
    bikemodelrange = '${range}'
    AND bikemodeltype = '${type}'
)
SELECT
  count(bikesn) count,
modelid AS id,
bikesize,
model,
type,
RANGE,
brand,
description,
images
FROM
  AvaiableBikes
  INNER JOIN SelectedBikeModels USING (modelid)
GROUP BY
  id,
  bikesize,
  model,
  type,
  RANGE,
  brand,
  description,
  images     
`

export default async function handler(req, res) {
   //  console.log('==========', req.query)
   const { from, to, size, range, type } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange, size, range, type)
   try {
      const { rows } = await query(text)
      console.log(rows)

      res.status(201).json(rows)
   } catch (err) {
      console.log('ERROR API AVAIABLE BIKES', err.message)
      res.status(500)
   }
}
