/* eslint-disable no-useless-escape */


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

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    const mobileRegex = /^(?![0-5])\d{10}$/;
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;
    
        e.preventDefault()

        if (!name || !mobile || !email || !password) {
            toast.error("All fields should be filled");
          } else if (!name.match(nameRegex)) {
              toast.error("Name cannot contain consecutive spaces");
          } else if (!mobile.match(mobileRegex)) {
              toast.error(
                  "Enter a valid mobile number"
                  );
              } else if (!email.match(emailRegex)) {
                toast.error("Invalid email address");
          } else if (!password.match(passwordRegex)) {
            toast.error(
              "Password must be at least 6 characters and contain at least one special character"
            );
          } else if (password !== confirmPassword) {
            toast.error("Password do not match");
          }
        else {
            try {

                const res = await register({ name, mobile, email, password }).unwrap()
                console.log("res:", res)
                dispatch(setCredentials({ ...res }))
                toast.success('New user created');
                setTimeout(() => {
                    navigate('/admin-home');
                }, 1000);


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