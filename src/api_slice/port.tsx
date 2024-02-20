import axios from "axios";

export const instanceSearch = axios.create({
    baseURL: "http://localhost:8080/api",
})

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
});
instance.interceptors.response.use(
    function (response) {
        console.log(response);
        return response.data;
    },
    function (error) {
        if (error.response.status == 401) {
        }
        return Promise.reject(error);
    }
);
export default instance;


export const Port_BE = "http://localhost:8080/api";