import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { MouseEvent } from 'react';

import { ReduxHooks, useSnackbar } from '../../hooks';
import classes from "./HeaderMenuList.module.css"
import { AuthAction } from '../../store';
import { useNavigate } from 'react-router-dom';

const HeaderMenuList = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLLIElement>) => void }) => {
    const dispatch = ReduxHooks.useAppDispatch()
    const navigate = useNavigate()
    const { showSnackbar } = useSnackbar()

    const handleAdminPanelClick = () => {
        navigate("/admin-panel")
    }

    const handleLogout = () => {
        dispatch(AuthAction.logout())

        showSnackbar("Logged out successfully", "success")
    }

    return (
        <MenuList>
            <MenuItem className={classes.item} onClick={handleProfileClick}>
                <ListItemIcon>
                    <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                    Profile
                </ListItemText>
            </MenuItem>
            <MenuItem className={classes.item} onClick={handleAdminPanelClick}>
                <ListItemIcon>
                    <AdminPanelSettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                    Admin Panel
                </ListItemText>
            </MenuItem>
            <MenuItem className={classes.item} onClick={handleLogout}>
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
