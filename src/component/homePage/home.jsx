/* eslint-disable react-hooks/rules-of-hooks */


import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './home.css'

const homePage = () => {

    const { userInfo } = useSelector((state) => state.auth)

    return (
        <>

            {userInfo ? (

                <div className='m-10 flex'>

                    <Link to="/text-audio-converter" >

                        <div className="card-container">
                            <div className="cards">
                                <h1 className="text-black text-center ">Text Audio <span className='font-bold'>Converter</span></h1>
                                
                            </div>
                        </div>

                    </Link>



                    
                </div>

            ) : (

                <div className='flex flex-col items-center h-[500px] justify-center'>
                    <div>
                        <h1>Hi Users,Welcome and explore your Ai World </h1>
                    </div>
                    <div className='flex '>
                        <Link to="/signUp" className='btn mr-3 rounded pl-2 pt-1'>SignUp</Link>
                        <Link to="/signIn" className='btn rounded pl-2 pt-1'>SignIn</Link>

                    </div>
                </div>


            )}




            
        </>
    );
}

export default homePage;
