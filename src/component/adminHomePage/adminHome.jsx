import { HiOutlineLogout } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import '../adminDashboard/dashboard.css'

const Dashboard = () => {
    return (
        <div className="">
            <div className="h-[68px] bg-slate-50 border-grey flex justify-center items-center shadow-md">
                <div className="flex justify-between items-center w-full pl-3 pr-3">
                    <span className="font-bold">DASHBOARD</span>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <button className="font-semibold text-xl">Logout </button>
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="myimage.jpg" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-5">
                                <button className="">
                                <FaUserEdit size={30}/> 
                                </button>
                                <button className="">
                                 <MdDelete size={30}/>
                                </button>
                            </td>
                            <td className="px-6 py-4">
                            <button   type="button" data-modal-show="editUserModal" className="font-medium text-white  bg-slate-500 p-1 rounded-md hover:bg-red-500">Block</button>

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="myimage.jpg" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Bonnie Green</div>
                                    <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                Designer
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-5">
                                <button  className="">
                                <FaUserEdit size={30}/> 
                                </button>
                                <button className="">
                                 <MdDelete size={30}/>
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button   type="button" data-modal-show="editUserModal" className="font-medium text-white  bg-slate-500 p-1 rounded-md hover:bg-red-500">Block</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Dashboard;
