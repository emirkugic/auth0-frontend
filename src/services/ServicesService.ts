import { axiosInstance } from '../config';
import { Service } from '../types';

export const fetchServicesByTeam = async (teamName: string): Promise<Service[]> => {
    try {
        const response = await axiosInstance.get(`/services/${teamName}`);

        const servicesData = response.data;

        return servicesData;
    } catch (error) {
        throw new Error('Failed to fetch services');
    }
};

export default { fetchServicesByTeam };
