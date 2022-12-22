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
                <div className="w-full">
                    <div className="md:flex">
                        <div className="w-3/12 lg:block hidden">
                            <div id="drawer-navigation" className="drawer_height shadow-lg shadow-gray-100 z-40  p-4 overflow-y-auto h-full bg-darkBlack dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
                                <div className="py-4 ">
                                    <div className="flex items-center justify-center">
                                        <div className="py-3 text-center">
                                            <img src={user?.photoURL ? user.photoURL : "NO photo available"} className="rounded-full max-w-30 max-h-30 user_image" alt="User Photo" />
                                            <h4 className="text-lg mt-5 mb-2 text-medium text-white">{user?.displayName}</h4>
                                        </div>
                                    </div>
                                    <hr className="divider_line my-3" />
                                    <ul className="space-y-2">
                                        {
                                            isBuyer && <li>

                                                <Link to="/dashboard/myOrders" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>

                                                    <span className="ml-3">My Orders</span>
                                                </Link>
                                            </li>
                                        }
                                        {isSeller &&
                                            <>
                                                <li>

                                                    <Link to="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                        <span className="ml-3">Add Products </span>
                                                    </Link>
                                                </li>
                                                <li>

                                                    <Link to="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>

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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>

                                                            <span className="ml-3">All Sellers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>

                                                            <span className="ml-3">All Buyers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                            </svg>

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
                            <div className="mx-12">
                                <div className="text-left py-5 block lg:hidden ">
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
                                        onClick={handleToggle}
                                    >
                                        Open Side nav
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
                                            <div className="flex items-center justify-center">
                                                <div className="py-3 text-center">
                                                    <img src={user?.photoURL ? user.photoURL : "NO photo available"} className="rounded-full user_image" alt="User Photo" />
                                                    <h4 className="text-lg mt-5 mb-2 text-medium text-white">{user?.displayName}</h4>
                                                </div>
                                            </div>
                                            <hr className="divider_line my-3" />
                                            <ul className="space-y-2">
                                                {
                                                    isBuyer && <li>

                                                        <Link to="/dashboard/myOrders" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                            </svg>

                                                            <span className="ml-3">My Orders</span>
                                                        </Link>
                                                    </li>
                                                }
                                                {isSeller &&
                                                    <>
                                                        <li>

                                                            <Link to="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>

                                                                <span className="ml-3">Add Products </span>
                                                            </Link>
                                                        </li>
                                                        <li>

                                                            <Link to="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                                </svg>
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
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                    </svg>
                                                                    <span className="ml-3">All Sellers </span>
                                                                </Link>
                                                            </li>
                                                            <li>

                                                                <Link to="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                    </svg>
                                                                    <span className="ml-3">All Buyers </span>
                                                                </Link>
                                                            </li>
                                                            <li>

                                                                <Link to="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                                    </svg>
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
