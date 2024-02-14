import { apiSlicer } from "./apiSlicer";
const ADMIN_URL = '/api/admin'


export const adminApiSlicer = apiSlicer.injectEndpoints({
    endpoints:(builder)=>({
        logIn:builder.mutation({
            query: (data)=>({
                url:`${ADMIN_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        logOut:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'POST',

            })
        }),
        getUserData: builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/users`,
                method:'GET'
            })
        }),

        updateUserData: builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/users/edit-user`,
                method:'PUT',
                body:data
            })
        }),
        blockUser:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/users/block-unblock?id=${data}`,
                method:'PATCH'
            })
        })

    })
})

export const {useLogInMutation,useLogOutMutation,useGetUserDataMutation,useUpdateUserDataMutation,useBlockUserMutation} = adminApiSlicer