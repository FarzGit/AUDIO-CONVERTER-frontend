

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slicer/userApiSlicer'
import { logOut } from '../../slicer/authSlicer'
import { useNavigate } from 'react-router-dom'
// import './home.css'

function NavBar(){



    const { userInfo } = useSelector((state) => state.auth)

    const [logOutApi] = useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logoutHandle = async () => {
        try {
            await logOutApi().unwrap()
            dispatch(logOut())
            navigate('/')
        } catch (error) {
            console.log(error)

        }
    }

    return(

        <>
        
        <div className="h-[68px] bg-slate-50 border-grey flex justify-center items-center shadow-md">
                <div className="flex justify-end items-center w-full space-x-3 pr-4">
                    {userInfo ? (
                        <>
                            <span onClick={logoutHandle} className='font-medium cursor-pointer'>Logout</span>
                            <span className='font-semibold'>{userInfo.name}</span>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/signIn" className="font-semibold cursor-pointer">Login</Link> */}
                        </>
                    )}

                    <Link to="/profile"> <img className="w-[50px] rounded-full cursor-pointer" src={userInfo && userInfo.profile ? `/profilePic/${userInfo.profile}` : 'default-icom.jpg'} alt="My Image" /></Link>
                </div>
            </div>
        
        </>
    )
}

export default NavBar