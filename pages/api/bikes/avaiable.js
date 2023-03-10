import pool from '@/src/lib/db'

const text = ({ range, type }) => `

SELECT
  modelId as id,
  bikemodelname as model,
  bikemodeltype as type,
  bikemodelrange as range,
  bikemodelbrand as brand,
  bikemodeldescription desc,
  bikemodelimages as images
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
   console.log('---------> API AVAIABLE BIKES')
   //const dateRange = `${from},${to}`
   try {
      console.log('+++++++++   1')
      await pool.connect()
      //console.log('@@@@@@@  ', pol)

      console.log('+++++++++   2')
      const { rows: avaiableBikes } = await pool.query(query({ range, type }))
      console.log('+++++++++   3')
      console.log('++++++++++++', !!avaiableBikes)
      // const avaiableBikes = rows.flatMap((r) => r)
      // console.log('++++++++', avaiableBikes)
      res.status(201).json(avaiableBikes)
   } catch (err) {
      console.log('ERROR API AVAIABLE BIKES', err.message)
      res.status(500)
   }
}
