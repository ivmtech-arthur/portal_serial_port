import { Alert, AlertColor, Snackbar } from "@mui/material"
import { SyntheticEvent } from "react"

export type SnackBarProps = {
    open: boolean,
    handleClose: () => void,
    message: String,
    severity: AlertColor
}

function BasicSnackBar(props: SnackBarProps) {
    const { open, handleClose, message, severity } = props
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        // <Alert severity="error">This is an error message!</Alert>
        // <Alert severity="warning">This is a warning message!</Alert>
        // <Alert severity="info">This is an information message!</Alert>
        // <Alert severity="success">This is a success message!</Alert>
    )
}

export default BasicSnackBar