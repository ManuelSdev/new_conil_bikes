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
import { getBikes } from '@/src/app/selectors'
import { deleteBike } from '@/src/app/features/user/booking/bookingProcessSlice'
import { BIKE_TYPES_MAP } from '@/src/utils/appValues'
import { capitalizeFirst } from '@/src/utils/functions'

export default function SelectedBikesListItem({ bike, handleDelete }) {
   return (
      <ListItem
         disablePadding
         //  key={index}
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
            secondary={`${capitalizeFirst(BIKE_TYPES_MAP[bike.type])}, talla ${
               bike.size
            }`}
         />
      </ListItem>
   )
}
BIKE_TYPES_MAP
