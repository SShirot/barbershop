import apiHelper from '../api/apiHelper';

const apiUpload = {
    uploadImage: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        return apiHelper.post('/uploads/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default apiUpload;
