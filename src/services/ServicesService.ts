import { axiosInstance } from "../config";


export const fetchAllServicesData = async () => {
	try {
		const response = await axiosInstance.get("/services/getAll");
		const servicesData = response.data;
		return servicesData;
	} catch (error) {
		throw new Error("Failed to fetch services data");
	}
};
