import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import { HeaderMenuProps } from '../../types';
import classes from "./HeaderMenu.module.css"

const HeaderMenu = ({ anchorEl, open, handleClose }: HeaderMenuProps) => {
    return (
        <Menu
            className={classes.menu}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuList>
                <MenuItem className={classes.menu__item}>
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem className={classes.menu__item}>
                    <ListItemIcon>
                        <AdminPanelSettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Admin Panel
                    </ListItemText>
                </MenuItem>
                <MenuItem className={classes.menu__item}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default HeaderMenu;
