
import { apiSlicer } from "./apiSlicer";
const USER_URL = '/api/users'


export const userApiSlicer = apiSlicer.injectEndpoints({
    endpoints: (builder)=>({
        login:builder.mutation({
            query: (data)=>({
                url:`${USER_URL}/auth`,
                method:'POST',
                body:data
            })
            
        }),
        logout:builder.mutation({
            query: ()=>({
                url:`${USER_URL}/logout`,
                method:'POST',

            })
        })
    })
})

export const {useLoginMutation,useLogoutMutation} = userApiSlicer