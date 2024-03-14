import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import { setIsAuthenticated, setTokens } from "../store";
import { RootState, User } from "../types";
import { axiosInstance } from "../config";

const login = async (
    loginData: User | undefined,
    dispatch: ThunkDispatch<RootState, unknown, Action>
): Promise<void> => {
    try {
        const {
            data: { access_token },
        } = await axios.post(
            `${import.meta.env.VITE_BE_BASE_URL}auth/login`,
            loginData
        );

        dispatch(setTokens({ access_token, refreshToken: null }));
        dispatch(setIsAuthenticated(true));
    } catch (error: any) {
        console.error('Authentication Error:', error);
        const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
        throw new Error(errorMessage);
    }
};

const register = async (registerData: User) => {
    try {
        await axios.post(`${import.meta.env.VITE_BE_BASE_URL}auth/register`, registerData);

        return Promise.resolve();
    } catch (error: any) {
        console.error('Registration Error:', error);
        const errorMessage = error.response?.data?.statusText || 'Registration failed.';
        return Promise.reject(errorMessage);
    }
};

const logout = async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    try {
        await axiosInstance.post('auth/logout');

        dispatch(setIsAuthenticated(false));

        dispatch(setTokens({ access_token: null, refreshToken: null }));

        return Promise.resolve()
    } catch (error: any) {
        console.error('Logout Error', error);
        const errorMessage = error.response?.data?.statusText || 'Logout failed.';
        return Promise.reject(errorMessage);
    }
}

const validateToken = async () => {
    try {
        const response = await axiosInstance.get('auth/validate');

        if (response.data.message === true) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;
    }
};

const me = async () => {
    try {
        const response = (await axiosInstance.post('auth/me')).data

        return response
    } catch (error) {
        console.error('Failed to fetch user information:', error);
        return false;
    }
};

const refresh = async () => {
    try {
        const response = (await axiosInstance.post('auth/refresh')).data

        return response
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return false;
    }
};

const forgotPassword = async (email: string) => {
    try {
        const response = await axiosInstance.post('auth/forgotPassword', { email });
        return response.data;
    } catch (error) {
        console.error('Forgot Password Error:', error);
        throw new Error('Forgot password request failed.');
    }
};

const validateResetCode = async (email: string, resetCode: number) => {
    try {
        const response = await axiosInstance.post('auth/validateResetCode', { email, reset_code: resetCode });
        return response.data;
    } catch (error) {
        console.error('Validate Reset Code Error:', error);
        throw new Error('Failed to validate reset code.');
    }
};

const resetPassword = async (password: string, confirmPassword: string, resetToken: string) => {
    try {
        const response = await axiosInstance.post('auth/resetPassword', { password, password_confirmation: confirmPassword }, {
            headers: {
                Authorization: `Bearer ${resetToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Reset Password Error:', error);
        throw new Error('Failed to reset password.');
    }
};

const generateAuthToken = async (email: string, role: string) => {
    try {
        const response = await axiosInstance.post('auth/generateAuthToken', { email, role });
        return response.data;
    } catch (error) {
        console.error('Generate Auth Token Error:', error);
        throw new Error('Failed to generate auth token.');
    }
};

export default { login, register, logout, validateToken, me, refresh, forgotPassword, validateResetCode, resetPassword, generateAuthToken };
