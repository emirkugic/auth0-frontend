import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { GenerateUserProps } from "../../types";
import { PopupType } from "../../enums";
import { useSnackbar } from "../../hooks";
import useGenerateAuthToken from "../../hooks/useGenerateAuthToken";
import classes from './GenerateUser.module.css';

const GenerateUser: FC<GenerateUserProps> = ({ setShowPopup, setVisible, fadeProps, isVisible }) => {
    const { showSnackbar } = useSnackbar();
    const { mutate, isLoading } = useGenerateAuthToken()

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
                resetForm();
                showSnackbar("Sent user credentials successfully", "success");
                mutate({ email: values.email, role: values.role })
            } catch (error) {
                showSnackbar("Error sending user credentials", "error");
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
                            <InputLabel id="role-select-label">Team Name</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={formik.values.role}
                                label="Team Name"
                                onChange={handleChange}
                                size="small"
                            >
                                <MenuItem value="TECH">TECH</MenuItem>
                                <MenuItem value="OUTSOURCING">OUTSOURCING</MenuItem>
                                <MenuItem value="HR">HR</MenuItem>
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
                            disabled={isLoading && !isFormTouched || Object.keys(formik.errors).length > 0}
                        >
                            {isLoading
                                ? <CircularProgress size={24} color="inherit" />
                                : "send"
                            }
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    ) : null;
}

export default GenerateUser;

