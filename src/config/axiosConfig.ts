import axios from 'axios';

import { selectAccessToken, setIsAuthenticated, setTokens, store } from '../store';
import { AuthService } from '../services';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = selectAccessToken(store.getState());

        if (accessToken) {
            try {
                const isValidToken = await AuthService.validateToken(accessToken);

                if (!isValidToken) {
                    throw new Error('Token is invalid');
                }

                store.dispatch(setIsAuthenticated(true));
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (error) {
                store.dispatch(setTokens({ access_token: null, refreshToken: null }));
                store.dispatch(setIsAuthenticated(false));
                console.error('Token validation failed:', error);
                throw error;
            }
        } else {
            store.dispatch(setIsAuthenticated(false));
            delete config.headers['Authorization'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
