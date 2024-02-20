
export interface IProduct {
    _id?: string,
    category: string,
    product_discount: number,
    product_name: string,
    product_price: number,
    product_size: object,
    product_desc: string,
    product_color: Array<string>,
    product_images: Array<string>,
    Category?: object
}