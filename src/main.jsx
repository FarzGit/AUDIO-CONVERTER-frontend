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
import PrivateRoute from './component/privateRoute.jsx'
import Dashboard from './component/adminHomePage/adminHome.jsx'
import AdminSignIn from './component/adminLogin/adminLogin.jsx'
import AdminAddNewUser from './component/adminAddNewUser/addNewUser.jsx'
import TextAudioConverter from './component/openAi/textAudioConverter.jsx'
import Modal from 'react-modal';
Modal.setAppElement('#root');
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true}  path="/" element={<HomePage/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='' element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/admin-home' element={<Dashboard/>}/>
      <Route path='/admin-sign' element={<AdminSignIn/>}/>
      <Route path='/admin-addNewUser' element={<AdminAddNewUser/>}/>
      <Route path='/text-audio-converter' element={<TextAudioConverter/>} />


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
