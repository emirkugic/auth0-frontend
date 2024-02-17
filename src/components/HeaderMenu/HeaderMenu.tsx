import { Menu } from '@mui/material';
import { HeaderMenuProps } from '../../types';
import classes from "./HeaderMenu.module.css"
import { HeaderMenuList } from '../HeaderMenuList';

const HeaderMenu = ({ anchorEl, open, handleClose }: HeaderMenuProps) => {

    const handleProfileClick = () => {
    }

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
            <HeaderMenuList handleProfileClick={handleProfileClick} />
        </Menu>
    )
}

export default HeaderMenu;
