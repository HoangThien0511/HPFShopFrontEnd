import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Port_BE } from "./port";


export const imagesApis = createApi({
    reducerPath: "uploadImages",
    baseQuery: fetchBaseQuery({
        baseUrl: Port_BE,
    }),
    tagTypes: ['Images'],
    endpoints: (builder) => ({
        // Create Images
        uploadImages: builder.mutation<any, any>({
            query(file) {
                return {
                    url: "/images/upload",
                    method: "POST",
                    body: file
                }
            },
            invalidatesTags: ['Images']
        }),

    })
})

export const { useUploadImagesMutation } = imagesApis