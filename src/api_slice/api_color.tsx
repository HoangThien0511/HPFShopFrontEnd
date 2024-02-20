import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Icolor } from "../interfaces/i_color";
import { Port_BE } from "./port";


export const colorsApis = createApi({
    reducerPath: "colorsApis",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Colors'],
    endpoints: (builder) => ({
        // Create Category
        createColors: builder.mutation<any,any>({
            query(color_name) {
                return {
                    url: "/colors/news",
                    method: "POST",
                    body: color_name
                }
            },
            invalidatesTags: ['Colors']
        }),

         // GET COLOR
         getColors: builder.query<Icolor[], void>({
            query: () => '/colors',
            providesTags: ['Colors']
        }),
        
    })
})

export const { 
    useCreateColorsMutation,
    useGetColorsQuery
} = colorsApis