import { selectAccessToken, selectRefreshToken, store } from "../store";
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use(
    (config) => {
        const token = selectAccessToken(store.getState());
        const refreshToken = selectRefreshToken(store.getState());
        token
            ? config.headers['Authorization'] = `Bearer ${token}`
            : delete config.headers['Authorization'];
        refreshToken
            ? (config.headers['Refresh-Token'] = refreshToken)
            : delete config.headers['Refresh-Token'];

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;