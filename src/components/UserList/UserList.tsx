import { Box, Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Tooltip, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';

import { useFade, useUsers } from "../../hooks";
import UserItem from "../UserItem/UserItem";
import { User } from "../../types";
import { PopupType } from "../../enums";
import classes from "./UserList.module.css"
import { GenerateUser } from "../GenerateUser";
import { EditUser } from "../EditUser";

const UserList = () => {
    const [showPopup, setShowPopup] = useState<PopupType | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [query, setQuery] = useState('');

    const { data, isLoading, isError } = useUsers();
    const [isVisible, setVisible, fadeProps] = useFade(false);
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    }

    const handleGenerateAuthTokenButtonClick = () => {
        setShowPopup(PopupType.ShowGenerateAuthToken);
        setVisible(true);
    }

    const handleEditButtonClick = (user: User) => {
        setShowPopup(PopupType.ShowEditUser);
        setSelectedUser(user);
        setVisible(true);
    }

    const fuzzySearch = (data: User[], query: string) => {
        const fuse = new Fuse(data, { keys: ["firstName", "lastName", "email"] });
        const result = fuse.search(query);
        return result.map(({ item }) => item);
    };

    const filteredUsers = query ? fuzzySearch(data ?? [], query) : data;

    const conditionalPopups = (popupType: PopupType) => {
        switch (popupType) {
            case PopupType.ShowGenerateAuthToken:
                return (
                    <GenerateUser
                        setShowPopup={setShowPopup}
                        isVisible={isVisible}
                        setVisible={setVisible}
                        fadeProps={fadeProps}
                    />
                );
            case PopupType.ShowEditUser:
                return (
                    <EditUser
                        user={selectedUser ?? undefined}
                        setShowPopup={setShowPopup}
                        isVisible={isVisible}
                        setVisible={setVisible}
                        fadeProps={fadeProps}
                    />
                );
            case PopupType.Exit:
                return null;
            default:
                return null;
        }
    }

    return (
        <Box className={classes['user-list-container']}>
            <Paper className={classes['user-list-paper']}>
                <Box className={classes['user-list__title-container']}>
                    <IconButton className={classes['user-list__action-return']} onClick={handleReturn}>
                        <ArrowBackIosIcon fontSize="small" className={classes['user-list__action-icon']} />
                    </IconButton>
                    <Typography className={classes['user-list__title']}>
                        List of Users
                    </Typography>
                </Box>
                <Box className={classes['user-list__search-container']}>
                    <TextField
                        className={classes['user-list__search']}
                        id="input-search"
                        placeholder="Search employees..."
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }}
                    />
                    <Tooltip title="Generate Auth Token" arrow placement="bottom">
                        <Button
                            className={classes['user-list__search-action']}
                            variant="contained"
                            onClick={handleGenerateAuthTokenButtonClick}>
                            Generate Auth Token
                        </Button>
                    </Tooltip>
                </Box>
                <Box className={classes['user-list__content-container']}>
                    {isLoading && <Box className={classes.loading}><CircularProgress /></Box>}
                    {isError && <Typography>Error fetching users</Typography>}
                    {filteredUsers?.map((user: User) => (
                        <UserItem
                            key={user?.id}
                            user={user}
                            handleEditButtonClick={handleEditButtonClick} />
                    ))}
                </Box>
            </Paper>
            {
                showPopup && conditionalPopups(showPopup)
            }
        </Box>
    )
}

export default UserList;
