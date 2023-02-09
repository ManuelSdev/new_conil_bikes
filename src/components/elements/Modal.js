import {
    DialogTitle,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material'

export default function Modal({
    open,
    title,
    content,
    handleClose,
    full,
    children,
}) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={full ? true : false}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>{children}</DialogActions>
            </Dialog>
        </div>
    )
}
