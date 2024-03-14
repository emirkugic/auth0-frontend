import { axiosInstance } from '../config';
import { Image } from '../types';

const uploadImage = async (imageData: FormData): Promise<Image> => {
    try {
        const response = await axiosInstance.post('/images', imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const image = response.data;

        return image;
    } catch (error) {
        throw new Error('Failed to upload image');
    }
};

const fetchAllImages = async (): Promise<Image[]> => {
    try {
        const response = await axiosInstance.get('/images');

        const images = response.data;

        return images;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
};

const fetchImageByUserId = async (userId: string): Promise<Image> => {
    try {
        const response = await axiosInstance.get(`/images/user/${userId}`);

        const image = response.data;

        return image;
    } catch (error) {
        throw new Error('Failed to fetch User image');
    }
};

const fetchImageById = async (id: number): Promise<Image> => {
    try {
        const response = await axiosInstance.get(`/images/${id}`);

        const image = response.data;

        return image;
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
