import axios from 'axios';
import { selectAccessToken, setIsAuthenticated, setTokens, store } from '../store';
import { AuthService } from '../services';

let isTokenValidationInProgress = false;

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = selectAccessToken(store.getState());

        if (accessToken) {
            try {
                if (isTokenValidationInProgress) {
                    return config;
                }

                isTokenValidationInProgress = true;

                const isValidToken = await AuthService.validateToken(accessToken);

                console.log(isValidToken)

                if (!isValidToken) {
                    throw new Error('Token is invalid');
                }

                const decodedToken = AuthService.decodeToken(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken?.exp && decodedToken.exp < currentTime) {
                    throw new Error('Token has expired');
                }

                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (error) {
                store.dispatch(setTokens({ access_token: null, refreshToken: null }));
                store.dispatch(setIsAuthenticated(false));
                console.error('Token validation failed:', error);
                throw error;
            } finally {
                isTokenValidationInProgress = false;
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
