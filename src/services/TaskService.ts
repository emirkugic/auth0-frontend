import { axiosInstance } from '../config';

export const fetchTasksByUserId = async (teamName: string) => {
    try {
        return (await axiosInstance.get(`/tasks/team/${teamName}`)).data;
    } catch (error) {
        throw new Error('Failed to fetch tasks data');
    }
};

export default { fetchTasksByUserId }