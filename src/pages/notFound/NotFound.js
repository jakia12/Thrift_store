import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    //create dynamic title

    return (
        <div className='py-14 lg:py-40 text-center bg-lightGray'>
            <span className='text-9xl font-semibold text-blue-400  my-8'>404</span>

            <h3 className="text-lg text-dark font-base">
                Oops!! Page not found
            </h3>
            <Link to="/">
                <button type="button" class="text-white bg-lightBlue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-2.5 
                mt-5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go to Home</button>
            </Link>
        </div>
    )
}

export default NotFound
