import T from 'prop-types'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useDispatch, useSelector } from 'react-redux'
import { addBike, setFormIsActive } from '@/src/store/bookingFormSlice'
import { getRange, getSize, getType } from '@/src/store/selectors'
import Image from 'next/image'

export default function BikeCard({ bike }) {
   //Los modelos están disponibles en la tallla seleccionada
   //Añado talla para que esta conste en el formulario final que se envía al api

   const { brand, model, description, images } = bike

   const dispatch = useDispatch()

   const handleClick = () => {
      dispatch(addBike(bike))
      dispatch(setFormIsActive(false))
      // dispatch(setSize(''))
   }

   const a = () => {
      if (true) return false
   }
   // console.log(images)
   //TODO: mete en alt la descripción de la bici
   return (
      <Card
      //  sx={{ maxWidth: 345 }}
      >
         <CardMedia
            component="img"
            alt="green iguana"
            //height="140"
            image={images[0]}
         />
         {/**
           <Image
            src={images[0]}
            alt="Vercel Logo"
            //className={styles.vercelLogo}
            width="800"
            height="400"
            //TODO: mira bien esto de priority
            //priority
            style={{ width: '100%', height: '50%' }}
         />
          */}

         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {`${brand} ${model}`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
               {description}
            </Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleClick} size="small">
               Resevar
            </Button>
         </CardActions>
      </Card>
   )
}

BikeCard.propTypes = {
   bike: T.shape({
      avaiable: T.bool,
      bookings: T.array,
      brand: T.string,
      description: T.string,
      images: T.array,
      model: T.string,
   }),
}
