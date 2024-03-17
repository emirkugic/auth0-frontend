import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MouseEvent, useState } from "react";
import { StringManipulations, stringAvatar } from "../../utils";
import { selectUser } from "../../store/slice/userSlice";
import { ReduxHooks } from "../../hooks";

import { UploadImagePopup } from "../UploadImagePopup";
import classes from "./ProfileMenu.module.css";

const ProfileMenu = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLButtonElement>) => void }) => {
    const user = ReduxHooks.useAppSelector(selectUser);
    if (!user) return null;

    const { firstName, lastName, email, roles, imageUrl } = user;
    const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);

    const handleEmailClick = () => {
        window.open(`mailto:${email}`);
    };

    const handleEditImageClick = () => {
        setIsUploadImageOpen(true);
    };

    const handleCloseUploadImage = () => {
        setIsUploadImageOpen(false);
    };

    return (
        <Box className={classes["profile-menu-container"]}>
            <IconButton className={classes["profile-menu__action"]} onClick={handleProfileClick} >
                <ArrowBackIcon className={classes["profile-menu__action__icon"]} />
            </IconButton>
            <Box className={classes["profile-menu__content"]}>
                <Tooltip title="Edit Image">
                    <Avatar
                        className={classes["profile-menu__avatar"]}
                        alt={`${firstName} ${lastName}`}
                        src={imageUrl}
                        onClick={handleEditImageClick}
                        {...stringAvatar(`${firstName} ${lastName}`)}
                    />
                </Tooltip>
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
            <UploadImagePopup open={isUploadImageOpen} onClose={handleCloseUploadImage} />
        </Box>
    )
}

export default ProfileMenu;
