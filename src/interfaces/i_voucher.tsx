export interface IVoucher {
    _id?: string,
    id_product: string,
    name: string,
    discount: number,
    startDate: Date,
    expirationDate: Date,
    userUsed: Array<String>,
    code: string,
    type: Array<String>,
    quantity: number,
    description: string
}