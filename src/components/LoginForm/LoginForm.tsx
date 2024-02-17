import { FC, useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CardContent,
  CardActions,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { LoginFormProps } from "../../types";
import { AuthFormType } from "../../enums";
import classes from "./LoginForm.module.css";
import { ReduxHooks } from "../../hooks";
import { AuthAction } from "../../store";

const LoginForm: FC<LoginFormProps> = ({ formType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = ReduxHooks.useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Invalid credentials"),
    password: yup.string().required("Invalid credentials."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(AuthAction.login(values));
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <CardContent className={classes["card__content"]}>
        <TextField
          id="email"
          name="email"
          label="Your Skim Email"
          variant="outlined"
          className={classes["card__content__text-field"]}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          className={classes["card__content__text-field"]}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
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
            ),
          }}
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Link to="/forgot-password" className={classes["card__content__link"]}>
          Forgot Password?
        </Link>
      </CardContent>
      <CardActions className={classes["card__actions"]}>
        <Button
          type="submit"
          size="large"
          className={classes["card__actions__button"]}
        >
          {formType === AuthFormType.LOGIN ? "Login" : "Register"}
        </Button>
      </CardActions>
    </form>
  );
};

export default LoginForm;
