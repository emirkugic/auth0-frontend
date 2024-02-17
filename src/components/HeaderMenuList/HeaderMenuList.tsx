import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { MouseEvent } from 'react';

import classes from "./HeaderMenuList.module.css"

const HeaderMenuList = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLDivElement>) => void }) => {
    return (
        <MenuList>
            <MenuItem className={classes.item}>
                <ListItemIcon onClick={handleProfileClick}>
                    <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                    Profile
                </ListItemText>
            </MenuItem>
            <MenuItem className={classes.item}>
                <ListItemIcon>
                    <AdminPanelSettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                    Admin Panel
                </ListItemText>
            </MenuItem>
            <MenuItem className={classes.item}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>
                    Logout
                </ListItemText>
            </MenuItem>
        </MenuList>
    )
}

export default HeaderMenuList
