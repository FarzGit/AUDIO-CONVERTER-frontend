import { apiSlicer } from "./apiSlicer";
const ADMIN_URL = '/api/admin'


export const adminApiSlicer = apiSlicer.injectEndpoints({
    endpoints:(builder)=>({
        logOut:builder.mutation({
            query: (data)=>({
                url:`${ADMIN_URL}/auth`,
                method:'POST',
                body:data
            })
        })
    })
})

export const {useLogOutMutation} = adminApiSlicer