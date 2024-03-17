import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { ReduxHooks, useUploadImage } from '../../hooks';
import { selectUser } from '../../store/slice/userSlice';

const UploadImagePopup = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const user = ReduxHooks.useAppSelector(selectUser);
    if (!user) return null;

    const { id } = user;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate, isLoading } = useUploadImage();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
                setSelectedFile(file);
                console.log('File uploaded:', file);
            } else {
                console.error('Please select a JPEG image.');
            }
        }
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                mutate({ formData, userId: id ?? 0 });
                onClose();
            } catch (error) {
                console.error('Error uploading image:', error);
            }

        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
                <input type="file" accept="image/jpeg" onChange={handleFileChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUploadClick}
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Upload'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadImagePopup;

