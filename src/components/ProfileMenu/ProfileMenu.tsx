import { Avatar, Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MouseEvent, useEffect } from "react";

import { StringManipulations, stringAvatar } from "../../utils";
import { selectUser } from "../../store/slice/userSlice";
import { ReduxHooks, useImageByUser } from "../../hooks";
import classes from "./ProfileMenu.module.css";

const ProfileMenu = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLButtonElement>) => void }) => {
    const user = ReduxHooks.useAppSelector(selectUser);
    if (!user) return null;

    const { firstName, lastName, email, roles, imageUrl } = user;

    const handleEmailClick = () => {
        window.open(`mailto:${email}`);
    };

    return (
        <Box className={classes["profile-menu-container"]}>
            <IconButton className={classes["profile-menu__action"]} onClick={handleProfileClick} >
                <ArrowBackIcon className={classes["profile-menu__action__icon"]} />
            </IconButton>
            <Box className={classes["profile-menu__content"]}>
                <Avatar
                    className={classes["profile-menu__avatar"]}
                    alt={`${firstName} ${lastName}`}
                    src={imageUrl}
                    {...stringAvatar(`${firstName} ${lastName}`)}
                />
                <Typography
                    className={classes["profile-menu__title"]}
                    variant="h6"
                    component="span"
                >
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography
                    className={classes["profile-menu__email"]}
                    variant="subtitle1"
                    component="span"
                    onClick={handleEmailClick}
                >
                    {email}
                </Typography>
                <Typography
                    className={classes["profile-menu__roles"]}
                    variant="subtitle1"
                    component="span">
                    {roles && StringManipulations.capitalizeFirstLetter(roles[0])}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProfileMenu;
