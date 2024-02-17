import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import { useState } from "react";

import { CustomSwitch } from "../../UI";
import { LoginForm } from "../../components/LoginForm";
import { RegisterForm } from "../../components/RegisterForm";
import auth0Logo from "../../assets/logos/authLogo/auth0-dark.svg";
import poweredBySkim from "../../assets/logos/PoweredBy.svg";
import { AuthFormType } from "../../enums";
import classes from "./AuthenticationForm.module.css";

const AuthenticationForm = () => {
  const [formType, setFormType] = useState<AuthFormType.LOGIN | AuthFormType.REGISTER>(AuthFormType.LOGIN);

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        <Box className={classes["card__logo-container"]}>
          <img src={auth0Logo} alt="Skim Technologies" />
        </Box>

        <Box className={classes["card__switch"]}>
          <CustomSwitch onFormTypeChange={setFormType} />
        </Box>

        {formType === AuthFormType.LOGIN ? (
          <LoginForm formType={formType} />
        ) : (
          <RegisterForm formType={formType} />
        )}
      </Card>

      <Box className={classes.logo}>
        <img src={poweredBySkim} alt="Powered By Skim Technologies" />
      </Box>
    </Box>
  );
};

export default AuthenticationForm;
