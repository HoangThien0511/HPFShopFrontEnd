import { Port_BE } from "./port";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/i_product';
import { Icart } from "../interfaces/i_cart";


export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        // Add cart
        addCart: builder.mutation<Icart, any>({
            query(body) {
                return {
                    url: "/cart",
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ['Cart']
        }),
        // Update cart
        updateCart: builder.mutation<Icart, any>({
            query: (product) => ({
                url: `/cart/update/${product._id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Cart']
        }),
        // Remove cart
        removeCart: builder.mutation<Icart, string>({
            query: (id) => ({
                url: `/cart/remove/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        // Get cart
        getCarts:  builder.query({
            query: () => ({
                url: `/carts`
            }),
            providesTags: ['Cart']
        }),
    })
})

export const {
    useAddCartMutation,
    useGetCartsQuery,
    useUpdateCartMutation,
    useRemoveCartMutation
} = cartApi