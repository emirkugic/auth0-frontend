import { MouseEvent, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { FormDialogProps, FormValues } from '../types';
import { ReduxHooks, useResetPassword } from '../hooks';
import { selectUser } from '../store/slice/userSlice';
import { UserAction } from '../store';

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = ReduxHooks.useAppDispatch();

    const user = ReduxHooks.useAppSelector(selectUser);
    if (!user) return null;

    const { id } = user;

    const { mutate, isLoading } = useResetPassword();

    const validationSchema = yup.object({
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: FormValues) => {
            mutate({ password: values.password, confirmPassword: values.confirmPassword, userId: id ?? 0 })
            await dispatch(UserAction.fetchUserData())
            onClose();
            window.location.reload()
        },
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const isFormTouched = Object.entries(formik.touched).some(([, value]) => value);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>First time login: Change password</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" disabled={!isFormTouched || isLoading || Object.keys(formik.errors).length > 0}>
                        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormDialog;
