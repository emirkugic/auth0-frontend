import { Button, Paper } from "@mui/material";
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
            <Button onClick={handleExit}>
                Exit
            </Button>
        </Paper>
    ) : null;
}

export default GenerateUser;
