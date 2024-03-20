import { ThunkDispatch } from "redux-thunk";
import { jwtDecode } from "jwt-decode";
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

const validateToken = async (accessToken: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BE_BASE_URL}auth/validate/${accessToken}`);

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
        const response = await axiosInstance.post('auth/me')

        return response;
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
        return (await axiosInstance.post('auth/forgotPassword', { email })).data;
    } catch (error) {
        console.error('Forgot Password Error:', error);
        throw new Error('Forgot password request failed.');
    }
};

const resetPassword = async (password: string, confirmPassword: string, userId: number) => {
    try {
        return (
            await axiosInstance.post(`auth/reset-password/${userId}`, { password, password_confirmation: confirmPassword })
        ).data;
    } catch (error) {
        console.error('Reset Password Error:', error);
        throw new Error('Failed to reset password.');
    }
};

const generateAuthToken = async (email: string, role: string) => {
    try {
        return (await axiosInstance.get('auth/generate-auth-token', { params: { email, role } })).data;
    } catch (error) {
        console.error('Generate Auth Token Error:', error);
        throw new Error('Failed to generate auth token.');
    }
};

const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export default { login, register, logout, decodeToken, validateToken, me, refresh, forgotPassword, resetPassword, generateAuthToken };


