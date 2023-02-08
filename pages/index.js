import Link from '@/src/lib/Link'
import { Button } from '@mui/material'
import Head from 'next/head'



export default function Home() {
  return (

    <>
      <Head>
        <title>Conil Bikes Web</title>
        <meta name="description" content="Web de Conil Bikes: venta, alquiler y reparación de bicicletas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Link href="/bookings">
          <Button variant="contained">reservar</Button>
        </Link>
      </main>
    </>
  )
}
