import { axiosInstance } from '../config';

export const fetchTasksByUserId = async (userId: number) => {
    try {
        return (await axiosInstance.get(`/tasks/user/${userId}`)).data;
    } catch (error) {
        throw new Error('Failed to fetch tasks data');
    }
};

export default { fetchTasksByUserId }