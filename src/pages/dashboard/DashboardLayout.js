import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import { AuthState } from '../../context/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import useSeller from '../../hooks/useSeller';
import useBuyer from '../../hooks/useBuyer';
import useAdmin from '../../hooks/useAdmin';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
    }


    const { user, userTypeVal, setUserTypeVal } = AuthState();



    const [isAdmin] = useAdmin(user?.email);

    // get user type data

    const [isSeller] = useSeller(user?.email);

    const [isBuyer] = useBuyer(user?.email);


    return (
        <>
            <Header />
            <section className=''>
                <div className="container w-full lg:max-w-7xl   mx-auto">
                    <div className="md:flex">
                        <div className="w-3/12 lg:block hidden">
                            <div id="drawer-navigation" className="mr-3 shadow-lg shadow-gray-100 z-40 h-screen p-4 overflow-y-auto bg-darkBlack w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
                                <div className="py-4 overflow-y-auto">
                                    <ul className="space-y-2">
                                        {
                                            isBuyer && <li>

                                                <Link to="/dashboard/myOrders" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                    <span className="ml-3">My Orders</span>
                                                </Link>
                                            </li>
                                        }
                                        {isSeller &&
                                            <>
                                                <li>

                                                    <Link to="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">Add Products </span>
                                                    </Link>
                                                </li>
                                                <li>

                                                    <Link to="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">My Products </span>
                                                    </Link>
                                                </li>
                                            </>
                                        }
                                        {
                                            isAdmin && (
                                                <>
                                                    <li>

                                                        <Link to="/dashboard/allSellers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                            <span className="ml-3">All Sellers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                            <span className="ml-3">All Buyers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                            <span className="ml-3">Reported Products </span>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }




                                        {/* {
                                            isAdmin && <>
                                                <li>
                                                    <Link to="/dashboard/allUsers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">All users</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/dashboard/addDoctor" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">Add Doctors</span>
                                                    </Link>
                                                </li>
                                            </>
                                        } */}



                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-9/12">
                            <div className="ml-4 mr-3 lg:ml- lg:mr-2">
                                <div className="text-left py-5 block lg:hidden ">
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
                                        onClick={handleToggle}
                                    >
                                        Show Side nav
                                    </button>
                                </div>

                                <Outlet />
                                <div className="">



                                    <div id="drawer-navigation" className={`side_nav block lg:hidden z-40 h-screen p-4  bg-white w-80 dark:bg-gray-800 ${isOpen == true ? 'active' : ''}`} tabindex="-1" aria-labelledby="drawer-navigation-label">
                                        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>


                                        <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={handleToggle}
                                        >
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            <span className="sr-only">Close menu</span>
                                        </button>
                                        <div className="py-4 overflow-y-auto">
                                            <ul className="space-y-2">
                                                {
                                                    isBuyer && <li>

                                                        <Link to="/dashboard/myOrders" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                            <span className="ml-3">My Orders</span>
                                                        </Link>
                                                    </li>
                                                }
                                                {isSeller &&
                                                    <>
                                                        <li>

                                                            <Link to="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                                <span className="ml-3">Add Products </span>
                                                            </Link>
                                                        </li>
                                                        <li>

                                                            <Link to="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                                <span className="ml-3">My Products </span>
                                                            </Link>
                                                        </li>
                                                    </>
                                                }
                                                {
                                                    isAdmin && (
                                                        <>
                                                            <li>

                                                                <Link to="/dashboard/allSellers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                                    <span className="ml-3">All Sellers </span>
                                                                </Link>
                                                            </li>
                                                            <li>

                                                                <Link to="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                                    <span className="ml-3">All Buyers </span>
                                                                </Link>
                                                            </li>
                                                            <li>

                                                                <Link to="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                                    <span className="ml-3">Reported Products </span>
                                                                </Link>
                                                            </li>
                                                        </>
                                                    )
                                                }




                                                {/* {
                                            isAdmin && <>
                                                <li>
                                                    <Link to="/dashboard/allUsers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">All users</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/dashboard/addDoctor" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                                        <span className="ml-3">Add Doctors</span>
                                                    </Link>
                                                </li>
                                            </>
                                        } */}



                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}

export default DashboardLayout
