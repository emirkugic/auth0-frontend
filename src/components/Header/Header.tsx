import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { MouseEvent } from "react";

import auth0LogoDark from "../../assets/logos/authLogo/auth0-dark.svg";
import { useState } from "react";
import { HeaderMenu } from '../HeaderMenu';
import { Typography } from '@mui/material';
import { stringAvatar } from "../../utils";
import { ReduxHooks } from "../../hooks";
import { selectUser } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const user = ReduxHooks.useAppSelector(selectUser)
  if (!user) return null;

  const { firstName, lastName, imageUrl } = user;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate("/");
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
            <img src={auth0LogoDark} alt="Skim Technologies Logo" onClick={handleLogoClick} />
          </Box>

          <Box className={classes["app-bar__avatar"]}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleClick}>
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={imageUrl?.concat('.jpg')}
                  {...stringAvatar(`${firstName} ${lastName}`)}
                />
              </IconButton>
            </Tooltip>
            <Typography
              className={classes["app-bar__avatar__title"]}
              variant="h6"
              component="span"
            >
              {`Hello, ${firstName}!`}
            </Typography>
          </Box>
        </Toolbar>
      </Container>

      <HeaderMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </AppBar>
  );
}
export default ResponsiveAppBar;
