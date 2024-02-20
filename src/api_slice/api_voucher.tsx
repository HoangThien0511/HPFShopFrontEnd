import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVoucher } from "../interfaces/i_voucher";
import { Port_BE } from "./port";


export const voucherApi = createApi({
    reducerPath: "voucherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Voucher'],
    endpoints: (builder) => ({
        // Get all category
        getVouchers: builder.query<IVoucher[], void>({
            query: () => `/vouchers`,
            providesTags: ['Voucher']
        }),

        // Get one category
        getVoucher: builder.query<IVoucher, any>({
            query: (id) => `/voucher/${id}`,
            providesTags: ['Voucher']
        }),

        // Get name category
        nameCategory: builder.query<IVoucher, string>({
            query: (id) => `/voucher/name/${id}`,
            providesTags: ['Voucher']
        }),

        // Create Category
        createVoucher: builder.mutation<IVoucher, any>({
            query(voucher: IVoucher) {
                return {
                    url: "/voucher/add",
                    method: "POST",
                    body: voucher
                }
            },
            invalidatesTags: ['Voucher']
        }),

        // Remove Category
        removeVoucher: builder.mutation<IVoucher, IVoucher>({
            query: (id) => ({
                url: `/voucher/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Voucher']
        }),

        // Edit Category
        editVoucher: builder.mutation<IVoucher, IVoucher>({
            query: (voucher) => ({
                url: `voucher/update/${voucher._id}`,
                method: 'PUT',
                body: voucher
            }),
            invalidatesTags: ['Voucher']
        }),

        // Remove Category
        useRemoveVoucherMutation: builder.mutation<IVoucher, IVoucher>({
            query: (id) => ({
                url: `voucher/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Voucher']
        }),

    })
})

export const {
    useGetVouchersQuery,
    useNameCategoryQuery,
    useCreateVoucherMutation,
    useEditVoucherMutation,
    useRemoveVoucherMutation,
    useGetVoucherQuery
} = voucherApi