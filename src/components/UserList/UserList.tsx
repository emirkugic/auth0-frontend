import { Box, Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';

import { useUsers } from "../../hooks";
import classes from "./UserList.module.css"
import UserItem from "../UserItem/UserItem";
import { User } from "../../types";

const UserList = () => {
    const { data, isLoading, isError } = useUsers();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleReturn = () => {
        navigate(-1);
    }

    const fuzzySearch = (data: User[], query: string) => {
        const fuse = new Fuse(data, { keys: ["firstName", "lastName", "email"] });
        const result = fuse.search(query);
        return result.map(({ item }) => item);
    };

    const filteredUsers = query ? fuzzySearch(data ?? [], query) : data;

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
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }}
                    />
                    <Button className={classes['user-list__search-action']} variant="contained">
                        Generate Auth Token
                    </Button>
                </Box>
                <Box className={classes['user-list__content-container']}>
                    {isLoading && <Box className={classes.loading}><CircularProgress /></Box>}
                    {isError && <Typography>Error fetching users</Typography>}
                    {filteredUsers?.map((user: User) => (
                        <UserItem key={user?.id} user={user} />
                    ))}
                </Box>
            </Paper>
        </Box>
    )
}

export default UserList;
