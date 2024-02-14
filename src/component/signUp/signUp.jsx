/* eslint-disable react-hooks/rules-of-hooks */


import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../slicer/userApiSlicer'
import { setCredentials } from '../../slicer/authSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './signup.css'

const signUp = () => {

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // console.log(name)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register] = useRegisterMutation()



    const {userInfo} = useSelector((state)=>state.auth)


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('password donot match')
        } else {
            try {

               const res = await register({name, mobile, email, password}).unwrap()
                console.log("res:", res)
                dispatch(setCredentials({ ...res }))
                toast.success('Sign up successful! ');
                setTimeout(() => {
                    navigate('/');
                }, 2000); 
                

            } catch (err) {
                console.log(err)

            }
        }
    }




    return (
        <>

            <div className='form-container '>

                <form onSubmit={handleSubmit} className="form-control" action="">
                    <p className="title ">Sign Up</p>
                    <div className="input-field">
                        <input onChange={(e) => setName(e.target.value)} className="input" type="text" value={name} />
                        <label className="label" htmlFor="emailInput">Enter Name</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e) => setMobile(e.target.value)} className="input" type="text" value={mobile} />
                        <label className="label" htmlFor="emailInput">Enter Mobile</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e) => setEmail(e.target.value)} className="input" type="text" value={email} />
                        <label className="label" htmlFor="emailInput">Enter Email</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" value={password} />
                        <label className="label" htmlFor="passwordInput">Enter Password</label>
                    </div>
                    <div className="input-field">
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className="input" type="text" value={confirmPassword} />
                        <label className="label" htmlFor="emailInput">Confirm Password</label>
                    </div>
                    {/* <a href="/">Forgot your password?</a> */}
                    <button type='submit' className="submit-btn">Sign Up</button>
                    <div className='flex justify-center'>
                        <span className=''>Already have an account?<Link to="/signIn" className='pl-2 underline cursor-pointer' style={{ color: "#5488e3" }}>Login</Link></span>

                    </div>
                </form>

            </div>

        </>
    )
}


export default signUp