import { IconButton, Paper } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from "react";

import { GenerateUserProps } from "../../types";
import { PopupType } from "../../enums";
import classes from './GenerateUser.module.css';

const GenerateUser: FC<GenerateUserProps> = ({ setShowPopup, setVisible, fadeProps, isVisible }) => {
    const handleExit = () => {
        setVisible(false);
        setShowPopup(PopupType.Exit)
    }

    return isVisible ? (
        <Paper className={classes['generate-user-paper']} style={fadeProps.style}>
            <IconButton onClick={handleExit}>
                <ClearIcon />
            </IconButton>
        </Paper>
    ) : null;
}

export default GenerateUser;
