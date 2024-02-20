import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Icategory } from "../interfaces/i_category";
import { Port_BE } from "./port";


export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        // Get all category
        getCategories: builder.query<Icategory[], void>({
            query: () => "/categories",
            providesTags: ['Categories']
        }),

        // Get one category
        getCategory: builder.query<Icategory, any>({
            query: (id) => `/categories/${id}`,
            providesTags: ['Categories']
        }),

        // Get name category
        nameCategory: builder.query<Icategory, string>({
            query: (id) => `/categories/name/${id}`,
            providesTags: ['Categories']
        }),

        // Create Category
        createCategory: builder.mutation<Icategory, any>({
            query(body) {
                return {
                    url: "/categories/news",
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ['Categories']
        }),
        
        // Remove Category
        removeCategory: builder.mutation<Icategory, Icategory>({
            query: (id) => ({
                url: `/categories/remove/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories']
        }),

        // Edit Category
        editCategory: builder.mutation<Icategory, Icategory>({
            query: (categories) => ({
                url: `categories/update/${categories._id}`,
                method: 'PATCH',
                body: categories
            }),
            invalidatesTags: ['Categories']
        }),

        // Remove Category
        removeCategories: builder.mutation<Icategory, Icategory>({
            query: (id) => ({
                url: `categories/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories']
        }),
        
    })
})

export const { useGetCategoriesQuery,useNameCategoryQuery, useCreateCategoryMutation, useRemoveCategoryMutation, useEditCategoryMutation, useRemoveCategoriesMutation, useGetCategoryQuery } = categoriesApi