import { axiosInstance } from '../config';

export const fetchTasksData = async () => {
    try {
        const response = await axiosInstance.get('/tasks');

        const tasksData = response.data;

        return tasksData;
    } catch (error) {
        throw new Error('Failed to fetch tasks data');
    }
};


export default { fetchTasksData }