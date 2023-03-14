import {
   Box,
   IconButton,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
} from '@mui/material'
import PedalBikeIcon from '@mui/icons-material/PedalBike'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import {
   bikeRemoved,
   selectBikesByUnits,
} from '@/src/app/features/user/booking/bookingProcessSlice'
import { BIKE_TYPES_MAP } from '@/src/utils/appValues'
import { capitalizeFirst } from '@/src/utils/functions'
import SelectedBikesListItem from './SelectedBikesListItem'

export default function SelectedBikesList() {
   const bikes = useSelector(selectBikesByUnits)
   const dispatch = useDispatch()

   const handleDelete = (bike) => (ev) => {
      // console.log(ev)
      console.log(bike)
      dispatch(bikeRemoved(bike))
   }

   return (
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
         <List sx={{ pb: 0, mb: 0 }} dense>
            {bikes.map((bike, index) => (
               <ListItem
                  disablePadding
                  key={index}
                  //  alignItems="flex-start"
                  secondaryAction={
                     <IconButton
                        onClick={handleDelete(bike)}
                        edge="end"
                        aria-label="delete"
                     >
                        <DeleteIcon />
                     </IconButton>
                  }
               >
                  <ListItemIcon>
                     <PedalBikeIcon fontSize="large" />
                  </ListItemIcon>

                  <ListItemText
                     primary={`${bike.brand} ${bike.model}`}
                     secondary={`${capitalizeFirst(
                        BIKE_TYPES_MAP[bike.type]
                     )}, talla ${bike.size}`}
                  />
               </ListItem>
            ))}
         </List>
      </Box>
   )
}
BIKE_TYPES_MAP
