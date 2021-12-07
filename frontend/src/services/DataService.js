import { BASE_API_URL } from "./Common";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    UploadFile: async function (formData, onUploadProgress) {
        return await axios.post(BASE_API_URL + "/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress
        });
    },
}

export default DataService;