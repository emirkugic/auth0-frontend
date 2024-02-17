import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import { setIsAuthenticated, setTokens } from "../store";
import { RootState, User } from "../types";
import { triggerReload } from "../utils";
import { axiosInstance } from "../config";

const setAuthData = async (
    loginData: User | undefined,
    dispatch: ThunkDispatch<RootState, unknown, Action>
) => {
    try {
        const {
            data: { token, refreshToken },
        } = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/auth/login`,
            loginData
        );

        dispatch(setTokens({ token, refreshToken }));
        dispatch(setIsAuthenticated(true));

        triggerReload();
    } catch (error: any) {
        console.error('Authentication Error:', error);
        const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
        throw new Error(errorMessage);
    }
};

const register = async (registerData: User) => {
    try {
        await axiosInstance.post('/auth/register', {
            email: registerData.email,
            password: registerData.password
        });

        return Promise.resolve();
    } catch (error: any) {
        console.error('Registration Error:', error);
        const errorMessage = error.response?.data?.statusText || 'Registration failed.';
        return Promise.reject(errorMessage);
    }
};

export default { setAuthData, register };