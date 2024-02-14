/* eslint-disable react-hooks/rules-of-hooks */

import { Link,useNavigate } from 'react-router-dom'
import '../signIn/sign.css'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {setCredentials} from '../../slicer/authSlicer'
import { useLoginMutation } from '../../slicer/userApiSlicer'
import {toast} from 'react-toastify'




const signIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{

        if(userInfo){
            navigate('/')
        }

    },[navigate,userInfo])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
            
        } catch (err) {

            toast.error(err?.data?.message || err.message)
            
        }
    }



    return (
        <>
            <div className='flex justify-center items-center h-screen'>

                <form onSubmit={handleSubmit} className="form-control" action="">
                    <p className="title">Sign In</p>
                    
                    <div className="input-field">
                        <input onChange={(e)=>setEmail(e.target.value)} className="input" type="text" value={email} />
                        <label className="label" htmlFor="emailInput">Enter Email</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e)=> setPassword(e.target.value)} className="input" type="password" value={password} />
                        <label className="label" htmlFor="passwordInput">Enter Password</label>
                    </div>
                    
                    
                    <button className="submit-btn">Login</button>
                    <div className='flex justify-center'>
                    <span  className=''>Create an account?<Link to="/signUp" className='pl-2 underline cursor-pointer'style={{color:"#5488e3"}}>SignUp</Link></span>

                    </div>
                </form>

            </div>

        </>
    )
}


export default signIn