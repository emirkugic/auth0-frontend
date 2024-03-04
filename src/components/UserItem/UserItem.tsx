import { Avatar, Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC } from "react";

import { UserItemProps } from "../../types";
import classes from "./UserItem.module.css";

const UserItem: FC<UserItemProps> = ({ user, handleEditButtonClick }) => {

    const handleEmailClick = () => {
        window.open(`mailto:${user.email}`);
    };

    return (
        <Box key={user.id} className={classes['user-list__content']}>
            <Box className={classes['user-list__user-info']}>
                <Avatar
                    className={classes['user-list__avatar']}
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
            <Button
                className={classes['user-list__edit-action']}
                variant="contained"
                onClick={handleEditButtonClick}>
                <FontAwesomeIcon
                    className={classes["user-list__edit-icon"]}
                    icon={faPenToSquare as IconProp}
                />
            </Button>
        </Box>
    );
};

export default UserItem;
