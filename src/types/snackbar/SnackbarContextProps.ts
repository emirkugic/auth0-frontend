import { AlertColor } from "@mui/material";
import SnackbarState from "./SnackbarState";

type SnackbarContextProps = {
    snackbarState: SnackbarState;
    showSnackbar: (newMessage: string, newSeverity?: AlertColor) => void;
    handleClose: () => void;
}

export default SnackbarContextProps;