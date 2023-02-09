//import {bikes, bookings} from "../../../fake/bikes";
import { bikes, bookings } from "@/fake/bikes";
import dbConnect from "@/src/lib/dbConnect";
import Bike from "@/src/models/Bike";
import Booking from "@/src/models/Booking";


export default async function handler(req, res) {
  await dbConnect();
  try {
    const { deletedCount } = await Bike.deleteMany();
    await Booking.deleteMany();
    console.log(`Eliminados ${deletedCount} productos.`);
    const result = await Bike.insertMany(bikes);
    /*
        const bikesIds = result.map(bike => bike._id)
        const [id1, id2] = bikesIds
        const books = bookings.map((booking, index) =>
            ({ ...booking, bikes: [bikesIds[index]] })
        )
        const bookingss = await Booking.insertMany(books)
        */
    res.status(201).json({ result });
  } catch (err) {
    console.log("ERROR PRODUCT INIT", err.message);
    res.status(500);
  }
}
