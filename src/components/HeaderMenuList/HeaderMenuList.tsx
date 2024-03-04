import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { faIdCard, faUser } from '@fortawesome/free-regular-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent } from 'react';

import { ReduxHooks, useSnackbar } from '../../hooks';
import { AuthAction } from '../../store';
import { selectUser } from "../../store/slice/userSlice";
import { UserRoles } from "../../enums";
import classes from "./HeaderMenuList.module.css"

const HeaderMenuList = ({ handleProfileClick }: { handleProfileClick: (event: MouseEvent<HTMLLIElement>) => void }) => {
    const dispatch = ReduxHooks.useAppDispatch()
    const user = ReduxHooks.useAppSelector(selectUser)
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
                    <FontAwesomeIcon icon={faUser as IconProp} />
                </ListItemIcon>
                <ListItemText>
                    Profile
                </ListItemText>
            </MenuItem>
            {user?.roles?.includes(UserRoles.ADMIN)
                && <MenuItem className={classes.item} onClick={handleAdminPanelClick}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faIdCard as IconProp} />
                    </ListItemIcon>
                    <ListItemText>
                        Admin Panel
                    </ListItemText>
                </MenuItem>
            }
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
