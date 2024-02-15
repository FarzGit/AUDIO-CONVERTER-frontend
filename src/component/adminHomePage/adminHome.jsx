import { HiOutlineLogout } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import '../adminDashboard/dashboard.css'
import { useLogOutMutation, useGetUserDataMutation, useUpdateUserDataMutation, useBlockUserMutation, useDeleteUserMutation } from "../../slicer/adminSlicer";
import { adminlogOut, logOut } from '../../slicer/authSlicer'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};


const Dashboard = () => {
    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [userId, setUserId] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(true)
    // const [filteredUser,setFilteredUser] = useState([])

    console.log('user is :', users)


    const openEditProfileModal = () => {
        setEditProfileModalOpen(true);
    };
    const closeEditProfileModal = () => {
        setEditProfileModalOpen(false);
    };


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)

    const [adminLogout] = useLogOutMutation()
    const [getUserData] = useGetUserDataMutation()
    const [updateUserData] = useUpdateUserDataMutation()
    const [blockUser] = useBlockUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    useEffect(() => {

        async function fetchUser() {
            const res = await getUserData().unwrap()
            console.log('res.user:', res.user)
            setUsers(res.user)
        }
        fetchUser()

    }, [data, getUserData])


    // useEffect(()=>{
    //     const filterUser = ()=>{
    //         const filtered = users.filter((user)=>{
    //             const name = user.name
    //             const mobile = user.mobile
    //             const email = user.email
    //         })
    //         setFilteredUser(filtered)
    //     }
    //     filterUser()
    // },[users])



    const handleLogout = async () => {
        try {
            await adminLogout().unwrap()
            dispatch(adminlogOut())
            navigate('/admin-sign')
        } catch (err) {
            console.log(err)

        }
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()

        try {

            const res = await updateUserData({ _id: userId, name, mobile }).unwrap()
            console.log('userUpdateRes is :', res);
            setEditProfileModalOpen(false)


        } catch (err) {
            console.log(err)
        }


    }

    const handleUpdate = (user) => {
        setUserId(user._id)
        setName(user.name)
        setMobile(user.mobile)
        openEditProfileModal()

    }

    const handleBlockUser = async (userId) => {

        const res = await blockUser(userId).unwrap()

        if (userInfo && userInfo._id === userId) {
            dispatch(logOut())
        }

        const updatedUsers = users.map((user) => {
            if (user._id === userId) {
                return {
                    ...user,
                    isStatus: res.isStatus,
                };
            }
            return user;
        });

        setUsers(updatedUsers);


    }

    const handleDelete = async () => {

        console.log('userId id :' , userId)

        if (userId) {
            await deleteUser(userId).unwrap()
            setData((prev) => !prev)
            setUserId(null)
            setIsOpen(false)
            if (userInfo && userInfo._id === userId) {
                dispatch(logOut())
            }
        }


    }

    const handleDeleteClick = (userId) => {
        setUserId(userId)
        setIsOpen(true)

    }

    const closeModal = () => {
        setIsOpen(false);
    };


    return (
        <div className="">
            <div className="h-[68px] bg-slate-50 border-grey flex justify-center items-center shadow-md">
                <div className="flex justify-between items-center w-full pl-3 pr-3">
                    <span className="font-bold">DASHBOARD</span>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <button onClick={handleLogout} className="font-semibold text-xl">Logout </button>
                        <span><HiOutlineLogout /></span>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 p-5">
                    <div>

                        <h1 className="text-white">User Management</h1>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative flex">
                        <input type="text" id="table-search-users" className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-tl-md rounded-bl-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                        <button className="bg-sky-500 p-2 rounded-tr-md rounded-br-md text-white">Search</button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((user) => (



                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src="myimage.jpg" alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.mobile}
                                </td>
                                <td className="px-6 py-4 flex items-center space-x-5">
                                    <button onClick={() => handleUpdate(user)} className="">
                                        <FaUserEdit size={30} />
                                    </button>
                                    <button onClick={() => handleDeleteClick(user._id)} className="">
                                        <MdDelete size={30} />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    {user.isStatus ? (
                                        <button onClick={() => handleBlockUser(user._id)} type="button" data-modal-show="editUserModal" className="font-medium text-white  bg-slate-500 p-1 rounded-md hover:bg-red-500">Block</button>

                                    ) : (
                                        <button onClick={() => handleBlockUser(user._id)} type="button" data-modal-show="editUserModal" className="font-medium text-white  bg-slate-500 p-1 rounded-md hover:bg-green-500">Unblock</button>

                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


            <Modal isOpen={isEditProfileModalOpen} onRequestClose={closeEditProfileModal} style={{ overlay: { zIndex: 1000 }, content: { width: '30%', height: '60%', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: 'none' } }}>
                <button onClick={closeEditProfileModal}><IoClose /></button>
                <div>
                    <div className='flex justify-center'>
                        <p className="title">Edit Profile</p>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>

                        <form onSubmit={handleUpdateUser} className='flex flex-col w-[100%]'>
                            <div className="input-field">
                                <input onChange={(e) => setName(e.target.value)} className="input" type="text" value={name} />
                                <label className="label" htmlFor="emailInput">Enter Name</label>
                            </div>
                            <div className="input-field">
                                <input onChange={(e) => setMobile(e.target.value)} className="input" type="text" value={mobile} />
                                <label className="label" htmlFor="emailInput">Enter Number</label>
                            </div>
                            <button className="submit-btn">Submit</button>
                        </form>
                    </div>

                </div>

            </Modal>

            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Delete User Modal"
            >
                <p className="font-bold text-xl mt-5 text-blue-600">
                    Are you sure you want to delete this user?
                </p>
                <div className="flex justify-around mt-10">
                    <button
                        onClick={closeModal}
                        className="h-10 w-20 hover:bg-green-700 bg-black rounded-lg text-white hover:scale-105"
                    >
                        No
                    </button>
                    <button
                        onClick={handleDelete}
                        className="h-10 w-20 hover:bg-red-700 bg-black rounded-lg text-white hover:scale-105"
                    >
                        Proceed
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Dashboard;
