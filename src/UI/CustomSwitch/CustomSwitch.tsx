import { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";

import { AuthFormType } from "../../enums";
import classes from "./CustomSwitch.module.css";

const CustomSwitch = ({
  onFormTypeChange,
}: {
  onFormTypeChange: Dispatch<SetStateAction<AuthFormType.LOGIN | AuthFormType.REGISTER>>;
}) => {
  const [isLoginActive, setLoginActive] = useState(true);

  const handleClick = () => {
    setLoginActive(!isLoginActive);

    onFormTypeChange(isLoginActive ? AuthFormType.REGISTER : AuthFormType.LOGIN);
  };

  return (
    <Box className={classes.switch}>
      <div
        className={classes.switch__background}
        style={{ transform: `translateX(${isLoginActive ? "0%" : "100%"})` }}
      />
      <Box
        className={`${classes.switch__button} ${classes.switch__login} ${isLoginActive ? classes.active : classes.inactive
          }`}
        onClick={handleClick}
      >
        LOGIN
      </Box>
      <Box
        className={`${classes.switch__button} ${classes.switch__register} ${!isLoginActive ? classes.active : classes.inactive
          }`}
        onClick={handleClick}
      >
        REGISTER
      </Box>
    </Box>
  );
};

export default CustomSwitch;
