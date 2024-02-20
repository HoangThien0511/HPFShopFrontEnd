import { Iuser } from "../interfaces/i_user";

export const isAuthenticate = (): Iuser | undefined => {
    const user = localStorage.getItem('user');
    if (!user) return undefined;

    return JSON.parse(user) as Iuser;
};

export const userHeader = (): Iuser | undefined => {
    const userHeader = localStorage.getItem('userHeader');
    if (!userHeader) return undefined;

    return JSON.parse(userHeader) as Iuser;
};
