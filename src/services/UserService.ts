import { axiosInstance } from '../config';

export const fetchUserData = async () => {
    try {
        const response = await axiosInstance.post('/auth/me');

        const userData = response.data;

        return userData;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
};


export default { fetchUserData }