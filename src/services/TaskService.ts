import { axiosInstance } from '../config';

export const fetchTasksByUserId = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/tasks/user/${userId}`);

        const tasksData = response.data;

        return tasksData;
    } catch (error) {
        throw new Error('Failed to fetch tasks data');
    }
};

export default { fetchTasksByUserId }