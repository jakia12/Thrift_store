import React from 'react'
import { useRouteError } from 'react-router-dom'
import { AuthState } from '../../context/AuthProvider';

const DislayError = () => {
    const error = useRouteError();

    //get log out data from authState

    const { logOut, setLoading } = AuthState();

    //log out when getting error
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <div className='py-28 text-center'>
            <h4 className='text-gray-900 text-xl'>Oops!!Something went wrong. </h4>
            <p className='text-red-500'>
                {error.statusText || error.message}
            </p>

            <div className="text-center">
                <button
                    className="py-2.5 hover:bg-secondCol  hover:text-white px-7  bg-firstCol text-white rounded-lg"
                    onClick={handleLogOut}
                >Log Out</button>
            </div>
        </div>
    )
}

export default DislayError
