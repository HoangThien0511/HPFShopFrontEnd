import { Port_BE } from "./port";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/i_product';


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // Get all products
        getProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
            providesTags: ['Product']
        }),

        // Get product
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`
            }),
            providesTags: ['Product']
        }),

        // Get new products
        getNewProduct: builder.query({
            query: () => ({
                url: `/product/news`
            }),
            providesTags: ['Product']
        }),

        // Add product
        addProduct: builder.mutation<IProduct, Omit<IProduct, "id">>({
            query: (product) => ({
                url: '/products/news',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),

        importProduct: builder.mutation<any, any >({
            query: (file) => ({
                url: '/products/import',
                method: 'POST',
                body: file
            }),
            invalidatesTags: ['Product']
        }),

        // Edit product
        editProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/update/${product._id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),

        // Remove product   
        removeProduct: builder.mutation<IProduct, IProduct>({
            query: (id) => ({
                url: `/products/remove/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useRemoveProductMutation,
    useGetNewProductQuery,
    useImportProductMutation
} = productApi