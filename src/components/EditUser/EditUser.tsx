import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import { FC } from "react";
import * as yup from "yup";

import { EditUserProps } from "../../types";
import { PopupType } from "../../enums";
import { useSnackbar, useUpdateUser } from "../../hooks";
import { stringAvatar } from "../../utils";
import classes from "./EditUser.module.css";

const EditUser: FC<EditUserProps> = ({
    user,
    setShowPopup,
    setVisible,
    fadeProps,
    isVisible,
}) => {

    const { mutate, isLoading } = useUpdateUser();
    const { showSnackbar } = useSnackbar();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
        role: yup.string().required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                mutate({ userId: user?.id ?? 0, userData: { email: values.email, password: values.password, teamName: user?.teamName ?? '' } });
                resetForm();
                showSnackbar("Edited user successfully", "success");
            } catch (error) {
                showSnackbar("Error editing user", "error");
            } finally {
                setSubmitting(false);
            }
        }
    });

    const isFormTouched = Object.entries(formik.touched).some(
        ([, value]) => value
    );

    const handleExit = () => {
        setVisible(false);
        setShowPopup(PopupType.Exit);
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        formik.setFieldValue("role", event.target.value);
    };

    return isVisible ? (
        <Paper className={classes["edit-user-paper"]} style={fadeProps.style}>
            <form onSubmit={formik.handleSubmit}>
                <Box className={classes["edit-user-container"]}>
                    <Box className={classes["edit-user__title-container"]}>
                        <IconButton
                            className={classes["edit-user__title-action"]}
                            onClick={handleExit}
                        >
                            <ClearIcon />
                        </IconButton>
                        <Typography className={classes["edit-user__title"]}>
                            Edit User
                        </Typography>
                    </Box>
                    <Box className={classes["edit-user__content-container"]}>
                        <Avatar
                            className={classes["edit-user__avatar"]}
                            src={user?.imageUrl + '.jpeg'}
                            alt={`${user?.firstName} ${user?.lastName}`}
                            {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
                        />
                        <Box className={classes["edit-user__content"]}>
                            <Typography className={classes["edit-user__content-name"]}>
                                {`${user?.firstName} ${user?.lastName}`}
                            </Typography>
                            <TextField
                                className={classes["edit-user__input"]}
                                id="input-email"
                                label="Email Address"
                                size="small"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                className={classes["edit-user__input"]}
                                id="input-password"
                                label="Password"
                                size="small"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <FormControl
                                fullWidth
                                size="small"
                                className={classes["edit-user__input"]}
                                error={formik.touched.role && Boolean(formik.errors.role)}
                            >
                                <InputLabel id="role-select-label">Team Name</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    value={formik.values.role}
                                    label="Team Name"
                                    onChange={handleChange}
                                    size="small"
                                >
                                    <MenuItem value={10}>OUTSOURCING</MenuItem>
                                    <MenuItem value={20}>TECH</MenuItem>
                                    <MenuItem value={30}>HR</MenuItem>
                                </Select>
                                {formik.touched.role && Boolean(formik.errors.role)}
                                <FormHelperText error>{formik.errors.role}</FormHelperText>
                            </FormControl>
                            <Button
                                className={classes["edit-user__action"]}
                                type="submit"
                                variant="contained"
                                disabled={
                                    isLoading && !isFormTouched || Object.keys(formik.errors).length > 0
                                }
                            >
                                {isLoading
                                    ? <CircularProgress size={24} color="inherit" />
                                    : "Save changes"
                                }
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Paper>
    ) : null;
};

export default EditUser;
