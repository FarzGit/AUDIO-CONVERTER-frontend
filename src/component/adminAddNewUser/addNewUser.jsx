

/* eslint-disable react-hooks/rules-of-hooks */


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../slicer/userApiSlicer'
import { setCredentials } from '../../slicer/authSlicer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './addNewUser.css'

const AdminAddNewUser = () => {

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register] = useRegisterMutation()







    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('password donot match')
        } else if (!name || !mobile || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
        }
        else {
            try {

                const res = await register({ name, mobile, email, password }).unwrap()
                console.log("res:", res)
                dispatch(setCredentials({ ...res }))
                toast.success('New user created');
                setTimeout(() => {
                    navigate('/admin-home');
                }, 3000);


            } catch (err) {
                console.log(err)

            }
        }
    }




    return (
        <>

            <div className='form-container '>

                <form onSubmit={handleSubmit} className="form-control" action="">
                    <p className="title ">Add New User</p>
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

                    </div>
                </form>

            </div>

        </>
    )
}


export default AdminAddNewUser