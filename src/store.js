import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slicer/authSlicer'
import {apiSlicer} from './slicer/apiSlicer'


const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlicer.reducerPath] : apiSlicer.reducer,

    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlicer.middleware),
    devTools:true
})

export default store