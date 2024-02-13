/* eslint-disable no-unused-vars */
   

import { createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({baseUrl:''})

export const apiSlicer = createApi({
    baseQuery,
    tagTypes: ['User'],

    endpoints: (builder)=>({})
})

