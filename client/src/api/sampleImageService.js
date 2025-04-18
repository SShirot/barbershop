import apiHelper from "./apiHelper";

const sampleImageService = {
    add: (hairData) => {
        return apiHelper.post('/staff/hairswap', hairData);
    },

    update: (id, hairData) => {
        return apiHelper.put(`/staff/hairswap/${id}`, hairData);
    },
    delete: (id) => {
        return apiHelper.delete(`/staff/hairswap/${id}`);
    },
    getList: (params) => {
        const query = new URLSearchParams(params).toString();
        return apiHelper.get(`/staff/hairswap?${query}`);
    },
    getHairStyles: (gender) => {
        return apiHelper.get(`/staff/hairswap/gender/${gender}`);
    }
}

export default sampleImageService;
