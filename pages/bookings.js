import BookingStepper from '@/src/components/bookingStepper/BookingStepper'
import { storeWrapper } from '@/src/app/store'
import { setDatabaseInfo } from '@/src/app/databaseInfoSlice'
import { query } from '@/src/lib/db'

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
         bikeModelType as type,
         bikeModelRange as range,
         segmentPrice as price
      FROM
        Segment  
        `

      try {
         const [
            { rows: bikeSizeList },
            { rows: typeList },
            { rows: rangeList },
            { rows: segmentList },
         ] = await Promise.all([
            query(size, 'array'),
            query(type, 'array'),
            query(range, 'array'),
            query(segment),
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
