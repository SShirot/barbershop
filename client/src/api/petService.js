import apiHelper from '../api/apiHelper';

const petService = {
    getPets: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/pets?${paramsSearch.toString()}`);
    },

    addPet: (petData) => {
        return apiHelper.post('user/pets', petData);
    },

    updatePet: (id, petData) => {
        return apiHelper.put(`user/pets/${id}`, petData);
    },

    deletePet: (id) => {
        return apiHelper.delete(`user/pets/${id}`);
    },

    uploadPetImage: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        return apiHelper.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default petService;
