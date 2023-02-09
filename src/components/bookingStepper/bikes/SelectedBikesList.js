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
import { getBikes } from '@/src/store/selectors'
import { deleteBike } from '@/src/store/bookingFormSlice'

export default function SelectedBikesList() {
    const bikes = useSelector(getBikes)
    const dispatch = useDispatch()

    const handleDelete = (bike) => (ev) => {
        // console.log(ev)
        console.log(bike)
        dispatch(deleteBike(bike))
    }
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <List sx={{ pb: 0, mb: 0 }} dense>
                {bikes.map((bike) => (
                    <ListItem
                        disablePadding
                        key={bike._id}
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
                            //  secondary={`${bike.type} - ${bike.range === 'premium' ? '' : 'gama'} ${bike.range} - ${bike.price}€/día`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
