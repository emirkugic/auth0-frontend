import { HeaderMenuList } from '../HeaderMenuList';
import { HeaderMenuProps } from '../../types';
import classes from "./HeaderMenu.module.css"
import { Menu } from '@mui/material';
import { useState } from 'react';
import { ProfileMenu } from '../ProfileMenu';

const HeaderMenu = ({ anchorEl, open, handleClose }: HeaderMenuProps) => {
    const [isProfile, setIsProfile] = useState(false)

    const handleProfileClick = () => {
        setIsProfile(prevstate => !prevstate)
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
            {isProfile
                ? <ProfileMenu handleProfileClick={handleProfileClick} />
                : <HeaderMenuList handleProfileClick={handleProfileClick} />
            }
        </Menu>
    )
}

export default HeaderMenu;
