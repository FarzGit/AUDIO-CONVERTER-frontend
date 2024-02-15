import { useEffect, useState } from 'react'
import { ComplexNavbar } from '../Components/NavBar'
import { MdOutlineAddAPhoto } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import { setCridentials } from '../Slices/authSlice';
import { Spinner } from '@material-tailwind/react';
import { BASE_URL } from '../urls/urls';

function ProfileScreen() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [profile, setProfile] = useState('')
    const [isLoading, setIsLoading] = useState('')


    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo || userInfo?.isBlocked) {
            navigate('/')
            return
        }
        setEmail(userInfo.email)
        setName(userInfo.name)
        setProfile(userInfo.profile)
    }, [navigate, userInfo.email, userInfo.name, userInfo.profile])

    const handleImageChange = async (e) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('profile-image', e.target.files[0])
        try {
            const res = await axios.put('/api/users/profile-image', formData, {
                header: { 'Content-Type': 'multipart/form-data' }
            })


            dispatch(setCridentials({ ...(res.data) }))
            setIsLoading(false)
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
            setIsLoading(false)
        }

    }

    return (
        <>
            <ComplexNavbar />
            <section className=' h-[100vh]'>
                <div className='container mx-auto m-5  p-8 shadow-md'>
                    <div className='grid  md:grid-cols-3 p-8 border-2'>
                        <div className='p-3'>

                            <div style={{ backgroundImage: `url(${BASE_URL}/static/profilePic/${profile || 'placeholder.jpg'})` }} className={`hover:opacity-90 cursor-pointer h-36 w-36 bg-cover mx-auto rounded-full flex items-center relative ${isLoading ? 'bg-[#00000018]' : ''}`} >
                                {isLoading ? <Spinner className='m-auto' /> : ''}
                                <label htmlFor="profile" className='absolute bottom-1 right-1 text-xl bg-gray-100 text-black rounded-full p-2 cursor-pointer'>

                                    <MdOutlineAddAPhoto />

                                </label>
                                <input type="file" id='profile' className='hidden' onChange={handleImageChange} />

                            </div>
                        </div>
                        <div className='col-span-2 p-3 py-5'>
                            <div className='md:flex items-center'>
                                <h3 className='md:mr-7'>{name}</h3>
                                <NavLink to={'/edit_profile'}><button className='text-sm bg-gray-100 px-5 py-2 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-900'>Edit Profile</button></NavLink>

                            </div>
                            <p className='text-sm mt-5'>{email}</p>
                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}

export default ProfileScreen








import multer from "multer"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/profilePic'))

    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname
        cb(null,name)
    }
})

export const upload=multer({storage:storage})

















import express from 'express'
import { upload } from '../middleware/imageUpload.js'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    uploadProfileImage
} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.put('/profile-image', protect, upload.single('profile-image'), uploadProfileImage)
export default router 