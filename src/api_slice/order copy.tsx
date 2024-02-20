import instance, { instanceSearch } from "./port";
import { isAuthenticate } from "../utils/LocalStorage";

const user = isAuthenticate()
let header = {}
if (user) {
    header = {
        headers: {
            Authorization: `${user.token}`,
        },
    }
}

export const httpGetAll = () => {
    return instanceSearch.get(`orders`, header);
}

export const httpGetAllProduct = () => {
    return instanceSearch.get(`products`, header);

}


