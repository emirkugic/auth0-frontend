import { IconButton, Paper, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from "react";

import { GenerateUserProps } from "../../types";
import { PopupType } from "../../enums";
import classes from './EditUser.module.css'

const EditUser: FC<GenerateUserProps> = ({ setShowPopup, setVisible, fadeProps, isVisible }) => {
    const handleExit = () => {
        setVisible(false);
        setShowPopup(PopupType.Exit)
    }

    return isVisible ? (
        <Paper className={classes['edit-user-paper']} style={fadeProps.style}>
            <IconButton onClick={handleExit}>
                <ClearIcon />
            </IconButton>
            <Typography>
                Edit User
            </Typography>
        </Paper>
    ) : null;
}

export default EditUser
