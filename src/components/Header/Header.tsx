import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import skimLogoDark from "../../assets/logos/CompanyLogo/skim-dark.svg";
import classes from "./Header.module.css";
import { useState } from "react";
import { HeaderMenu } from '../HeaderMenu';
import { Typography } from '@mui/material';

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={1} className={classes["app-bar"]}>
      <Container
        className={classes["app-bar__content"]}
        maxWidth={false}
        disableGutters
      >
        <Toolbar disableGutters>
          <Box className={classes["app-bar__logo"]}>
            <img src={skimLogoDark} alt="Skim Technologies Logo" />
          </Box>

          <Box className={classes["app-bar__avatar"]}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleClick}>
                <Avatar
                  alt="Miloš Milaković"
                  src="https://images.mubicdn.net/images/cast_member/830947/cache-738230-1638187722/image-w856.jpg?size=800x"
                />
              </IconButton>
            </Tooltip>
            <Typography
              className={classes["app-bar__avatar__title"]}
              variant="h6"
              component="span"
            >
              Hello, Miloš!
            </Typography>
          </Box>
        </Toolbar>
      </Container>

      <HeaderMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </AppBar>
  );
}
export default ResponsiveAppBar;
