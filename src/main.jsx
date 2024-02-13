import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import './index.css'
import SignUp from "./component/signUp/signUp"
import HomePage from "./component/homePage/home"
import SignIn from './component/signIn/signIn.jsx'
import Profile from './component/profile/profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true}  path="/" element={<HomePage/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='/profile' element={<Profile/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  </Provider>
)
