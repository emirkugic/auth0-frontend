import { axiosInstance } from '../config';
import { User } from '../types';

export const fetchUserData = async () => {
    try {
        return (await axiosInstance.post('/auth/me')).data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
};

const fetchAllUsersData = async (): Promise<User[]> => {
    try {
        return (await axiosInstance.get('/users')).data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
}

export default { fetchUserData, fetchAllUsersData }