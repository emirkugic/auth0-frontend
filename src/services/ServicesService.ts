import { axiosInstance } from '../config';
import { Service } from '../types';

export const fetchServicesByTeam = async (teamName: string): Promise<Service[]> => {
    try {
        return (await axiosInstance.get(`/services/${teamName}`)).data;
    } catch (error) {
        throw new Error('Failed to fetch services');
    }
};

export default { fetchServicesByTeam };
