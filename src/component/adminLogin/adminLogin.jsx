/* eslint-disable react-hooks/rules-of-hooks */
import '../adminLogin/adminLogin.css'
import { setAdminCredentials } from '../../slicer/authSlicer'
import { useLogOutMutation } from '../../slicer/adminSlicer'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'

const adminSignIn = () => {


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {adminInfo} = useSelector((state)=>state.auth)
    const [login] = useLogOutMutation()

    useEffect(()=>{
        if(adminInfo){
            navigate('/admin-home')
        }
    },[navigate,adminInfo])


    const handleAdminLogin = async (e)=>{
        e.preventDefault();

        try {

            const res = await login({email,password}).unwrap()
            dispatch(setAdminCredentials({...res}))
            navigate('/admin-home')
            
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }


    return (
        <>
            <div className='flex justify-center items-center h-screen'>

                <form onSubmit={handleAdminLogin} className="form-control" action="">
                    <p className="title flex justify-center">Admin Login</p>

                    <div className="input-field">
                        <input onChange={(e)=>setEmail(e.target.value)} className="input" type="text" value={email} />
                        <label className="label" htmlFor="emailInput">Enter Email</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e)=>setPassword(e.target.value)} className="input" type="password" value={password} />
                        <label className="label" htmlFor="passwordInput">Enter Password</label>
                    </div>

                    <button className="submit-btn">Login</button>
                    <div className='flex justify-center'>

                    </div>
                </form>

            </div>

        </>


    )
}

export default adminSignIn