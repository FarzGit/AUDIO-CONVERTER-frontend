
import {Link} from 'react-router-dom'


const homePage = () => {


    return (
        <>
            <div className="h-[68px] bg-slate-50 border-grey flex justify-center items-center shadow-md">
                <div className="flex justify-end items-center w-full space-x-3 pr-4">
                    <Link to="/signUp" className="font-semibold cursor-pointer">Login</Link>
                    <img className="w-[50px] rounded-full cursor-pointer" src='myimage.jpg' alt="My Image" />
                </div>
            </div>
        </>
    );
}

export default homePage;
