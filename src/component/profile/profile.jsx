import { useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

const Profile = () => {
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

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

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-gray-50 relative">
                <div className="absolute top-0 z-20">
                    <img className="w-40 h-40 m-5 rounded-full cursor-pointer" src="myimage.jpg" alt="Profile" />
                </div>
                <div className="w-[60%] h-[500px] rounded-lg relative z-10 shadow-xl bg-white  border-gray-300">
                    <div className="flex justify-between pr-3 pl-3 pt-1">
                        <button onClick={openChangePasswordModal}>Change Password</button>
                        <button onClick={openEditProfileModal}>Edit Profile</button>
                    </div>
                    <div className="flex justify-center pt-[80px]">
                        <h1 className="font-bold text-[28px]">FARZIN AHAMMED K</h1>
                    </div>
                    <div className="flex justify-center">
                        <h3>7994371305</h3>
                    </div>
                    <div className="flex justify-center">
                        <h3>farzinahammed.in@gmail.com</h3>
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

                        <form className='flex flex-col w-[100%]'>
                            <div className="input-field">
                                <input required="" className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter Old Password</label>
                            </div>
                            <div className="input-field">
                                <input required="" className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter New Password</label>
                            </div>
                            <div className="input-field">
                                <input required="" className="input" type="text" />
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

                        <form className='flex flex-col w-[100%]'>
                            <div className="input-field">
                                <input required="" className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter Name</label>
                            </div>
                            <div className="input-field">
                                <input required="" className="input" type="text" />
                                <label className="label" htmlFor="emailInput">Enter Number</label>
                            </div>
                            
                            <button className="submit-btn">Submit</button>
                        </form>
                    </div>

                </div>

            </Modal>
        </div>
    );
};

export default Profile;
