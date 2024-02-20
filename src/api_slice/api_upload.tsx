import axios from "axios";

export const uploadCloudinary = (data: FormData) => {
    const url = `https://api.cloudinary.com/v1_1/vietkhiem/image/upload`;

    const headers = {
        "Content-Type": "multipart/form-data",
    };

    return axios.post(url, data, { headers });
};
