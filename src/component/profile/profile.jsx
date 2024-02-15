/* eslint-disable no-useless-escape */
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateProfileMutation } from '../../slicer/userApiSlicer';
import { setCredentials } from '../../slicer/authSlicer';
import { toast } from 'react-toastify';
import axios from 'axios';



const Profile = () => {
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [isChangeImageModalOpen, setChangeImageModalOpen] = useState(false);

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')
    // const [email, setEmail] = useState('')

    const openChangeImageModalOpen = () => {
        setChangeImageModalOpen(true)
    }
    const closeChangeImageModal = () => {
        setChangeImageModalOpen(false)
    }
    const openChangePasswordModal = () => {
        setChangePasswordModalOpen(true);
    };
    const closeChangePasswordModal = () => {
        setChangePasswordModalOpen(false);
    };
    const openEditProfileModal = () => {
        setEditProfileModalOpen(true);
    };
    const closeEditProfileModal = () => {
        setEditProfileModalOpen(false);
    };

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [updateProfile] = useUpdateProfileMutation()

    useEffect(() => {

        setName(userInfo.name)
        setMobile(userInfo.mobile)
        // setEmail(userInfo.email)


    }, [userInfo.name, userInfo.mobile])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()

        const mobileRegex = /^(?![0-5])\d{10}$/;
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

        if (!name || !mobile ) {
            toast.error("All fields should be filled");
          } else if (!name.match(nameRegex)) {
              toast.error("Name cannot contain consecutive spaces");
          } else if (!mobile.match(mobileRegex)) {
              toast.error(
                  "Enter a valid mobile number"
                  );
              }else{
                try {

                    const res = await updateProfile({
                        _id: userInfo._id,
                        name,
                        mobile
                    }).unwrap()
        
                    console.log('RES:', res)
                    dispatch(setCredentials(res))
                    toast.success('updated succesfully')
                    closeEditProfileModal()
                } catch (err) {
                    toast.error(err?.data?.message || err.error)
                }
              }
        


    }

    const handleChangePassword = async (e) => {

        e.preventDefault();

        const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;

    
        if(!password || !confirmPassword || !oldPassword){
            toast.error('Please fill all the field')
        }else if(!password.match(passwordRegex)){
            toast.error( "Password must be at least 6 characters and contain at least one special character")
        }else if(password !== confirmPassword){
            toast.error('Password do not match')
        }
        else{
            try {

                const formData = {
                    _id: userInfo._id,
                    oldPassword,
                    password,
                    confirmPassword
                };
    
                
    
    
    
                const res = await updateProfile(formData).unwrap()
                dispatch(setCredentials(res))
                toast.success('Updated successfully');
                closeChangePasswordModal();
    
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }

        




    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file)
    }


    const handleImageSave = async () => {
        console.log('asdfsadfasdfsadf', profileImage)
        const formData = new FormData()
        formData.append('profile-image', profileImage)
        console.log(formData)

        try {
            console.log('asdfsadfasdfsadf')
            const res = await axios.put('/api/users/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('res.data:', res.data)


            dispatch(setCredentials({ ...(res.data) }))
            closeChangeImageModal()

        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-gray-50 relative">
                <div onClick={openChangeImageModalOpen} className="absolute top-0 z-20">
                    <img className="w-40 h-40 m-5 rounded-full cursor-pointer" src={userInfo && userInfo.profile ? `/profilePic/${userInfo.profile}` : 'default-icom.jpg'} alt="Profile" />
                </div>
                <div className="w-[60%] h-[500px] rounded-lg relative z-10 shadow-xl bg-white  border-gray-300">
                    <div className="flex justify-between pr-3 pl-3 pt-1">
                        <button onClick={openChangePasswordModal}>Change Password</button>
                        <button onClick={openEditProfileModal}>Edit Profile</button>
                    </div>
                    <div className="flex justify-center pt-[80px]">
                        <h1 className="font-bold text-[28px]">{userInfo.name}</h1>
                    </div>
                    <div className="flex justify-center">
                        <h3>{userInfo.mobile}</h3>
                    </div>
                    <div className="flex justify-center">
                        <h3>{userInfo.email}</h3>
                    </div>

                </div>
            </div>


            <Modal isOpen={isChangePasswordModalOpen} onRequestClose={closeChangePasswordModal} style={{ overlay: { zIndex: 1000 }, content: { width: '30%', height: '60%', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: 'none' } }}>
                <button onClick={closeChangePasswordModal}><IoClose /></button>

                <div>
                    <div className='flex justify-center'>
                        <p className="title">Change Password</p>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>

                        <form onSubmit={handleChangePassword} className='flex flex-col w-[100%]'>
                            <div className="input-field">
                                <input onChange={(e) => setOldPassword(e.target.value)} className="input" type="password" />
                                <label className="label" htmlFor="emailInput">Enter Old Password</label>
                            </div>
                            <div className="input-field">
                                <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" />
                                <label className="label" htmlFor="emailInput">Enter New Password</label>
                            </div>
                            <div className="input-field">
                                <input onChange={(e) => setComfirmPassword(e.target.value)} className="input" type="password" />
                                <label className="label" htmlFor="emailInput">Confirm Password</label>
                            </div>
                            <button className="submit-btn">Submit</button>
                        </form>
                    </div>

                </div>


            </Modal>

            <Modal isOpen={isEditProfileModalOpen} onRequestClose={closeEditProfileModal} style={{ overlay: { zIndex: 1000 }, content: { width: '30%', height: '60%', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: 'none' } }}>
                <button onClick={closeEditProfileModal}><IoClose /></button>
                <div>
                    <div className='flex justify-center'>
                        <p className="title">Edit Profile</p>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>

                        <form onSubmit={handleUpdateProfile} className='flex flex-col w-[100%]'>
                            <div className="input-field">
                                <input onChange={(e) => setName(e.target.value)} value={name} className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter Name</label>
                            </div>
                            <div className="input-field">
                                <input onChange={(e) => setMobile(e.target.value)} value={mobile} className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter Number</label>
                            </div>
                            <button className="submit-btn">Submit</button>
                        </form>
                    </div>

                </div>

            </Modal>

            <Modal isOpen={isChangeImageModalOpen} onRequestClose={closeChangeImageModal} style={{ overlay: { zIndex: 1000 }, content: { width: '30%', height: '60%', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: 'none' } }}>
                <button onClick={closeChangeImageModal}><IoClose /></button>

                <div className=''>
                    <div className='flex justify-center'>
                        <label htmlFor="profile-image">
                            <img id="profile-img" className="w-40 h-40 m-5 rounded-full cursor-pointer" src={profileImage ? URL.createObjectURL(profileImage):'default-icom.jpg'} alt="Profile" />
                        </label>
                        <input type="file" id="profile-image" style={{ display: 'none' }} onChange={handleImageChange} ></input>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={handleImageSave} className='bg-blue-600 text-white ml-4 rounded-md w-[60px] h-[35px]'>Save</button>
                    </div>
                </div>


            </Modal>
        </div>
    );
};

export default Profile;
