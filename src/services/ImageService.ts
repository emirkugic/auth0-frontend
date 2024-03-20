import { axiosInstance } from '../config';
import { Image } from '../types';

const uploadImage = async (formData: FormData): Promise<Image> => {
    try {
        const response = await axiosInstance.post(`/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to upload image');
    }
};

const fetchAllImages = async (): Promise<Image[]> => {
    try {
        return (await axiosInstance.get('/images')).data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
};

const fetchImageByUserId = async (userId: number): Promise<Image> => {
    try {
        const response = await axiosInstance.get(`/images/user/${userId}`);

        console.log(response.data)

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch User image');
    }
};

const fetchImageById = async (id: number): Promise<Image> => {
    try {
        return (await axiosInstance.get(`/images/${id}`)).data;
    } catch (error) {
        throw new Error('Failed to fetch image');
    }
};

const deleteImage = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/images/${id}`);
    } catch (error) {
        throw new Error('Failed to delete image');
    }
};

export default { uploadImage, fetchAllImages, fetchImageById, fetchImageByUserId, deleteImage };
