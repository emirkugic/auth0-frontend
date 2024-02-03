import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import skimLogoDark from "../../assets/logos/CompanyLogo/skim-dark.svg";
import classes from "./Header.module.css";
import { Typography } from "@mui/material";

function ResponsiveAppBar() {
  return (
    <AppBar position="static" className={classes["app-bar"]}>
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
              <IconButton sx={{ p: 0 }}>
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
    </AppBar>
  );
}
export default ResponsiveAppBar;
