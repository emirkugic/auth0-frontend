import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import { setIsAuthenticated, setTokens } from "../store";
import { RootState, User } from "../types";
import { axiosInstance } from "../config";

const login = async (
    loginData: User | undefined,
    dispatch: ThunkDispatch<RootState, unknown, Action>
) => {
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
        await axiosInstance.post('auth/register', registerData);

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

const validateToken = async (accessToken: string | null) => {
    try {
        if (accessToken) {
            const response = await axios.get(`${import.meta.env.VITE_BE_BASE_URL}auth/validate`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.data.message === true) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;
    }
};

export default { login, register, logout, validateToken };