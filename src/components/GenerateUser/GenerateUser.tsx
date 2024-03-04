import { Box, Button, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { GenerateUserProps } from "../../types";
import { PopupType } from "../../enums";
import { useSnackbar } from "../../hooks";
import classes from './GenerateUser.module.css';

const GenerateUser: FC<GenerateUserProps> = ({ setShowPopup, setVisible, fadeProps, isVisible }) => {
    const { showSnackbar } = useSnackbar();

    const validationSchema = yup.object({
        email: yup.string().email("Invalid email address").required("Email is required"),
        role: yup.string().required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            role: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                console.log(values);
                resetForm();
                showSnackbar("Generated user successfully", "success");
            } catch (error) {
                showSnackbar("Error generating user", "error");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const isFormTouched = Object.entries(formik.touched).some(([, value]) => value);

    const handleExit = () => {
        setVisible(false);
        setShowPopup(PopupType.Exit)
    }

    const handleChange = (event: SelectChangeEvent<string>) => {
        formik.setFieldValue('role', event.target.value);
    };

    return isVisible ? (
        <Paper className={classes['generate-user-paper']} style={fadeProps.style}>
            <form onSubmit={formik.handleSubmit}>
                <Box className={classes['generate-user-container']}>
                    <Box className={classes['generate-user__title-container']}>
                        <IconButton className={classes['generate-user__title-action']} onClick={handleExit}>
                            <ClearIcon />
                        </IconButton>
                        <Typography className={classes['generate-user__title']}>
                            Generate Auth Token
                        </Typography>
                    </Box>
                    <Box className={classes['generate-user__input-container']}>
                        <TextField
                            className={classes['generate-user__input']}
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
                        <FormControl fullWidth size="small" className={classes['generate-user__input']} error={formik.touched.role && Boolean(formik.errors.role)}>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={formik.values.role}
                                label="Role"
                                onChange={handleChange}
                                size="small"
                            >
                                <MenuItem value={10}>Admin</MenuItem>
                                <MenuItem value={20}>Developer</MenuItem>
                                <MenuItem value={30}>HR</MenuItem>
                            </Select>
                            {formik.touched.role && Boolean(formik.errors.role)}
                            <FormHelperText error>
                                {formik.errors.role}
                            </FormHelperText>
                        </FormControl>
                        <Button
                            className={classes['generate-user__action']}
                            type="submit"
                            variant="contained"
                            disabled={!isFormTouched || Object.keys(formik.errors).length > 0}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    ) : null;
}

export default GenerateUser;

