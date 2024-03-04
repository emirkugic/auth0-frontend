import { FC } from "react";
import { Button, Paper, Typography } from "@mui/material";

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
            <Button onClick={handleExit}>
                Exit
            </Button>
            <Typography>
                Edit User
            </Typography>
        </Paper>
    ) : null;
}

export default EditUser
