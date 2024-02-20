import instance from "./port";
import { isAuthenticate } from '../utils/LocalStorage'


const user = isAuthenticate()
let header = {}
if (user) {
    header = {
        headers: {
            Authorization: `${user.token}`,
        },
    }
}
export const login = (values: any) => {
    const url = `signin`;
    return instance.post(url, values);
};
export const register = (values: any) => {
    const url = `signup`;
    return instance.post(url, values);
};

export const logout = async (req: any, res: any) => {
    try {
        const tokenHeaders = req.headers['authorization'] ? req.headers['authorization'].split(" ") : null;
        const token = tokenHeaders ? tokenHeaders[0] : null;

        res.status(200).json({ message: 'Đã logout thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Lỗi server' });
    }
};
export const changeAccountStatus = (phoneNumber: any, status: any, token: any) => {
    const url = `change-account-status?phone=${phoneNumber}&status=${status}`;
    const header = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.put(url, null, header);
};


export const checkValidPhoneNumber = (phoneNumber: any) => {
    const url = `/check-valid-phone-number`
    return instance.post(url, phoneNumber)
}

export const resetPassword = (data: any, token: any) => {
    const url = `reset-password`
    const header = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.put(url, data, header)
}

export const getProfile = (token: any) => {
    const url = `/user/my-profile`;
    const header2 = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.get(url, header2);
};

export const getProduct = () => {
    const url = `/products`;
    return instance.get(url);
};

export const updateProfile = (token: any, data: any) => {
    const url = `/user/my-profile/edit`;
    const header2 = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.put(url, data, header2);
};

export const httpGetOneUser = (token: any, id: any) => {
    const header = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.get(`user/${id}`, header);
};
export const httpUpdateOneUser = (token: any, id: any, data: any) => {
    const header = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.put(`user/edit/${id}`, data, header);
};

export const updatePass = (token: any, data: any) => {
    const url = `/update-password`;
    const header = {
        headers: {
            Authorization: `${token}`,
        },
    };
    return instance.put(url, data, header);
};

export const userAccountStatistics = () => {
    const url = `/users/acccount-status-statistics`;
    return instance.get(url);
};

export const httpGetTopUser = () => {
    return instance.get(`users/loyal-customer`);
};