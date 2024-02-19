

import  {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './component/userNavBar/navbar'

function App() {
 

  return (
    <>
   
    <NavBar/>
    <ToastContainer/>
     <Outlet/>
     
    </>
  )
}

export default App
