import BookingStepper from '@/src/components/bookingStepper/BookingStepper'
//import pool from '@/src/lib/db'

const BookingsPage = () => {
   // console.log('***********', bikeSizeList)
   return <BookingStepper />
}

/*
export async function getStaticProps(context) {
   //console.log('##################################################')
   const size = `
SELECT
  bikesize,
  minheight,
  maxheight
FROM
  bikesize    
    `
   const type = `
SELECT
  bikemodeltype
FROM
  bikemodeltype
  `
   const range = `
SELECT
  bikemodelrange
FROM
  bikemodelrange
  `
   const querys = (text) => ({
      text: size,
      rowMode: 'array',
   })

   const queryFn = async (text) =>
      await pool.query({
         text: text,
         rowMode: 'array',
      })
   try {
      await pool.connect()
      const [{ rows: bikeSizeList }, { rows: typeRows }, { row: rangeRows }] =
         await Promise.all([queryFn(size), queryFn(type), queryFn(range)])
      console.log('1----', bikeSizeList)
      console.log('2----', typeRows)
      console.log('3----', rangeRows)
   } catch (error) {
      console.log('error: ' + error)
   }

   //quita esto
   await pool.connect()
   const { rows } = await pool.query({
      text: size,
      rowMode: 'array',
   })
   console.log('0000', rows)
   const h = await JSON.parse(rows)
   const bikeSizeList = JSON.parse(JSON.stringify(rows))
   console.log('1111', h)
   console.log('22222', bikeSizeList)
   //quita lo de arriba
   
   return {
      props: { bikeSizeList:'oo' }, // will be passed to the page component as props
      revalidate: 1,
   }
}
*/
export default BookingsPage
