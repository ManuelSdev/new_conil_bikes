/**MEJORAS */
//Socket io?
//Indican cuantas quedan en la tabla de bicis
/*
import { deleteBike } from '@/src/store/bookingFormSlice'
import { useDispatch } from 'react-redux'
const dispatch = useDispatch()
*/
/**********************************************************************************************
 * Durante el margen de tiempo que un cliente tarda en finalizar su reserva, es posible
 * que otros clientes hayan finalizado la suya. Las solicitudes del formulario de seleccíón
 * de bicicletas se hacen de manera individiual por cada campo y en tiempo real. Aun así, es
 * posible que durante el tramite de la reserva se haya agotado alguna bicicleta seleccionada
 * por el cliente. Esto lanzaría una excepción desde la base de datos.
 *
 * Este módulo gestiona las funciones encargadas de mantener, durante el trámite de una reserva,
 * la máxima síncronía posible entre el stock de la base de datos y las bicicletas que puede
 * reservar el cliente
 *********************************************************************************************/

/**
 * Si el api retorna una lista de bicicletas para seleccionar, estas se comparan con las bicicletas ya
 * seleccionadas y almacenadas en el store. La comparación se basa en id+size.
 *
 * La variable count almacena la cantidad actual de ese id+size en la base de datos. Si este valor es igual
 * o menor a la cantidad de ese id+size almacenadas en el store, esa bicicleta no podrá ser seleccionada.
 *
 * En el segundo caso, cuando el valor es menor, además, ese valor será el numeró máximo de ese id+size
 * que el cliente podrá reservar, de manera que se modificará la cantidad almacenada en el store,
 * eliminando las bicicletas sobrantes y enviando un mensaje de aviso al cliente.
 *
 * Este método recorre el array de bicicletas que retorna el api. Si las condiciones anteriormente
 * descritas impiden que vuelva a ser selecciona, se le añade la clave avaiable=false. En caso contrario
 * , será avaiable=true
 *
 */
/*
export const getCheckedNewBikes = (newBikes, currentBikes) => {
   //Si aun no hay bicicletas seleccionadas en el store, no se aplican cambios
   if (currentBikes.length === 0) return newBikes
   const checkedNewBikes = newBikes.map((nBike) => {
      const { id, size, count } = nBike
      currentBikes.forEach((cBike) => {
         if (id === cBike.id && size === cBike.size) {
            if (count === cBike.quantity) nBike.avaiable = false
            if (count > cBike.quantity) nBike.avaiable = true
            if (count < cBike.quantity) {
               dispatch(deleteBike({ id, size, count }))
               nBike.avaiable = false
            }
         }
      })
      return nBike
   })
   return checkedNewBikes
}
*/
