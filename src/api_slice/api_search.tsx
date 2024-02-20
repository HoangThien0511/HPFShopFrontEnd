import instance from "./port";

export const SearchProduct = (param: { name: any, size: any, pice: any, },) => {
    const url = `/product`;
    return instance.get(url);
};