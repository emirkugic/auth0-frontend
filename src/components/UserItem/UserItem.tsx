import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC, useEffect } from "react";

import { UserItemProps } from "../../types";
import { stringAvatar } from "../../utils";
import classes from "./UserItem.module.css";

const UserItem: FC<UserItemProps> = ({ user, handleEditButtonClick }) => {

    const handleEmailClick = () => {
        window.open(`mailto:${user.email}`);
    };

    useEffect(() => {
        console.log(user.imageUrl)
    }, [])

    return (
        <Box key={user.id} className={classes['user-list__content']}>
            <Box className={classes['user-list__user-info']}>
                <Avatar
                    className={classes['user-list__avatar']}
                    src={user.imageUrl + '.jpeg'}
                    alt={`${user.firstName} ${user.lastName}`}
                    {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                />
                <Box>
                    <Typography
                        className={classes['user-list__user-name']}>
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography
                        className={classes['user-list__user-email']}
                        onClick={handleEmailClick}>
                        {user.email}
                    </Typography>
                </Box>
            </Box>
            <Tooltip title={`Edit ${user.firstName}`} arrow placement="left">
                <Button
                    className={classes['user-list__edit-action']}
                    variant="contained"
                    onClick={() => handleEditButtonClick(user)}>
                    <FontAwesomeIcon
                        className={classes["user-list__edit-icon"]}
                        icon={faPenToSquare as IconProp}
                    />
                </Button>
            </Tooltip>
        </Box>
    );
};

export default UserItem;
