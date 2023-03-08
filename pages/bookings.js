import BookingStepper from '@/src/components/bookingStepper/BookingStepper'
import { storeWrapper } from '@/src/store'
import { setDatabaseInfo } from '@/src/store/databaseInfoSlice'
import pool from '@/src/lib/db'
const BookingsPage = () => {
   // console.log('***********', bikeSizeList)
   return <BookingStepper />
}

export const getStaticProps = storeWrapper.getStaticProps(
   (storeWrapper) => async (context) => {
      //console.log('##################################################')
      //  const dispatch = useDispatch()
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
      const segment = `
      SELECT
         bikeModelType,
         bikeModelRange,
         segmentPrice
      FROM
        Segment  
        `
      const query = (text) => ({
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
         const [
            { rows: bikeSizeList },
            { rows: typeList },
            { rows: rangeList },
            { rows: segmentList },
         ] = await Promise.all([
            queryFn(size),
            queryFn(type),
            queryFn(range),
            await pool.query(segment),
         ])
         //  console.log('1----', bikeSizeList)
         //   console.log('2----', typeList)
         //    console.log('3----', rangeList)
         //  console.log('4----', segmentList)
         storeWrapper.dispatch(
            setDatabaseInfo({
               bikeSizeList,
               typeList,
               rangeList,
               segmentList,
            })
         )
      } catch (error) {
         console.log('getStaticProps error: ' + error)
      }

      return {
         props: { bikeSizeList: 'oo' }, // will be passed to the page component as props
         revalidate: 1,
      }
   }
)
export default BookingsPage
