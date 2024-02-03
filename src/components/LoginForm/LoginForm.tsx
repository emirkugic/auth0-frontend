import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";

import {
  CustomSwitch,
  CustomTextField,
  CustomOutlinedInputField,
  CustomLabelForField,
} from "../../UI";
import auth0Logo from "../../assets/logos/authLogo/auth0-dark.svg";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Card className={classes.card}>
      <Box className={classes["card__logo-container"]}>
        <img src={auth0Logo} alt="Skim Technologies" />
      </Box>

      <Box className={classes["card__switch"]}>
        <CustomSwitch />
      </Box>

      <CardContent className={classes["card__content"]}>
        <CustomTextField
          id="email"
          label="Your Skim Email"
          variant="outlined"
          className={classes["card__content__text-field"]}
        />
        <FormControl variant="outlined">
          <CustomLabelForField htmlFor="password">Password</CustomLabelForField>
          <CustomOutlinedInputField
            id="password"
            className={classes["card__content__text-field"]}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </CardContent>
      <CardActions className={classes["card__actions"]}>
        <Button size="large" className={classes["card__actions__button"]}>
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginForm;
