import pool from '@/src/lib/db'

const text = ({ range, type }) => `

SELECT
modelId,
  bikemodelname,
  bikemodeltype,
  bikemodelrange,
  bikemodelbrand,
  bikemodeldescription,
  bikemodelimages
FROM
  BikeModel
WHERE
  bikemodelrange='${range}'
  AND
  bikemodeltype='${type}'
`
const query = (filter) => ({
   text: text(filter),
   //rowMode: 'array',
})
export default async function handler(req, res) {
   const { range, type } = req.query
   //const dateRange = `${from},${to}`
   try {
      await pool.connect()
      const { rows: avaiableBikes } = await pool.query(query({ range, type }))
      // const avaiableBikes = rows.flatMap((r) => r)
      console.log('++++++++', avaiableBikes)
      res.status(201).json(avaiableBikes)
   } catch (err) {
      console.log('ERROR API AVAIABLE RANGES', err.message)
      res.status(500)
   }
}
