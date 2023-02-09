import Layout from '@/src/components/layout/Layout'
import Link from '@/src/lib/Link'
import { Button } from '@mui/material'
import Image from 'next/image'
import photo from '@/public/booking.jpg'
export default function Home() {
   return (
      <Layout>
         <Image
            src={photo}
            alt="Imagen de producto"
            style={{
               backgroundColor: '#F1F1F1',
               objectFit: 'contain',
            }}
         />
         <Link href="/bookings">
            <Button variant="contained">reservar</Button>
         </Link>
      </Layout>
   )
}
