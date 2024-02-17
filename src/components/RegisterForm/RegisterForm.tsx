import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CardContent,
  CardActions,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Visibility from "@mui/icons-material/Visibility";
import InfoIcon from '@mui/icons-material/Info';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RegisterFormProps } from "../../types";

import classes from "./RegisterForm.module.css";

const RegisterForm: FC<RegisterFormProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAuthKey, setShowAuthKey] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs('2024-01-01'));

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Invalid credentials.")
      .min(8, "Password is too short - should be 8 characters minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    authKey: yup
      .string()
      .required("Auth Key is required")
      .matches(/^[0-9]{6}$/, "Auth Key must be a 6-digit number"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      authKey: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Register Form submitted with values:", values);
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickShowAuthKey = () => setShowAuthKey((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted with values:", formik.values);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <CardContent className={classes["card__content"]}>
        <Grid container spacing={2} className={classes["card__content__grid"]}>
          <Grid item xs={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid>
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
        <DatePicker
          label="Date of Birth"
          className={classes["card__content__text-field"]}
          views={["day", "month", "year"]}
          value={value}
          onChange={(newValue) => setValue(newValue)}
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
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          className={classes["card__content__text-field"]}
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <TextField
          id="authKey"
          name="authKey"
          className={classes["card__content__text-field"]}
          type={showAuthKey ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowAuthKey}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showAuthKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <IconButton>
                    <Tooltip title="Registration key provided by SKIM">
                      <InfoIcon />
                    </Tooltip>
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
          label="Auth Key"
          value={formik.values.authKey}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.authKey && Boolean(formik.errors.authKey)}
          helperText={formik.touched.authKey && formik.errors.authKey}
        />
      </CardContent>
      <CardActions className={classes["card__actions"]}>
        <Button
          type="submit"
          size="large"
          className={classes["card__actions__button"]}
        >
          Register
        </Button>
      </CardActions>
    </form>
  );
};

export default RegisterForm;
