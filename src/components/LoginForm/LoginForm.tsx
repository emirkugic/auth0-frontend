import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CardContent,
  CardActions,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { AuthAction } from "../../store";
import useSnackbar from "../../hooks/useSnackbar";
import { ReduxHooks } from "../../hooks";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const dispatch = ReduxHooks.useAppDispatch();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setIsLoading(true);
        await dispatch(AuthAction.login(values));

        resetForm();
        showSnackbar("Logged in successfully", "success");

      } catch (error) {
        showSnackbar("Error logging in", "error");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const isFormTouched = Object.entries(formik.touched).some(([, value]) => value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
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
          disabled={!isFormTouched || isLoading || Object.keys(formik.errors).length > 0}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </CardActions>
    </form>
  );
};

export default LoginForm;
