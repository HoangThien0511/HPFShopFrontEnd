import { Port_BE } from "./port";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/i_product';
import { Icart } from "../interfaces/i_cart";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // Add cart
        createOrder: builder.mutation<Icart, any>({
            query(body) {
                return {
                    url: "/order",
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ['Order']
        }),

        // Get All
        getOrderAll: builder.query({
            query: () => ({
                url: `/orders`
            }),
            providesTags: ['Order']
        }),

        // Update order
        updateOrder: builder.mutation<any, any>({
            query: (order) => ({
                url: `/orders/update/${order._id}`,
                method: 'PATCH',
                body: order
            }),
            invalidatesTags: ['Order']
        }),

        // Detail
        detailOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`
            }),
            providesTags: ['Order']
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderAllQuery,
    useUpdateOrderMutation,
    useDetailOrderQuery
} = orderApi