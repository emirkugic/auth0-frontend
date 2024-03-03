import { axiosInstance } from '../config';
import { User } from '../types';

export const fetchUserData = async () => {
    try {
        const response = await axiosInstance.post('/auth/me');

        const userData = response.data;

        return userData;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
};

const fetchAllUsersData = async (): Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/users');

        const userData = response.data;

        return userData;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
}

export default { fetchUserData, fetchAllUsersData }