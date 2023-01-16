import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import { AuthState } from '../../context/AuthProvider';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdNotifications } from 'react-icons/md';
import useSeller from '../../hooks/useSeller';
import useBuyer from '../../hooks/useBuyer';
import useAdmin from '../../hooks/useAdmin';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import './DashboardLayout.css';


const DashboardLayout = () => {

    //hide sidenav by default
    const [isOpen, setIsOpen] = useState(false);


    //hide user dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    //show sidenav on toggle
    const handleToggle = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
    }

    //show user dropdown on toggle
    const handleShow = () => {
        showDropdown === true ? setShowDropdown(false) : setShowDropdown(true);
    }


    const { user, setLoading, logOut } = AuthState();

    const [isAdmin] = useAdmin(user?.email);

    // get user type data

    const [isSeller] = useSeller(user?.email);

    const [isBuyer] = useBuyer(user?.email);

    //sign out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }


    return (
        <>

            <section className=''>
                <div className="w-full">
                    <div className="md:flex">
                        <div className="w-1/5 lg:block hidden">
                            <div id="drawer-navigation" className="drawer_height w-1/5  z-40 fixed left-0 top-0 p-4 overflow-y-auto h-full bg-darkBlack dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
                                <div className="py-4 ">
                                    {/* <div className="flex items-center justify-center">
                                        <div className="py-3 text-center">
                                            <img src={user?.photoURL ? user.photoURL : "NO photo available"} className="rounded-full max-w-30 max-h-30 user_image" alt="User Photo" />
                                            <h4 className="text-lg mt-5 mb-2 text-medium text-white">{user?.displayName}</h4>
                                        </div>
                                    </div> */}
                                    <Link to="/" className="flex items-center justify-center">

                                        <span className="text-center text-2xl font-medium whitespace-nowrap text-white py-4">Thrift Store</span>
                                    </Link>

                                    <hr className="divider_line my-3" />
                                    <ul className="space-y-2">
                                        <li>
                                            <Link to="/dashboard"

                                                className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white dark:hover:bg-gray-700 text-gray-100"

                                            >
                                                <svg class="w-6 h-6 xl:w-5 xl:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12V5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>

                                                <span className="ml-3">Dashboard</span>

                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/dashboard"
                                                className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white dark:hover:bg-gray-700 text-gray-100"


                                            >
                                                <svg class="w-6 h-6 xl:w-5 xl:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"></path></svg>
                                                <span className="ml-3">Overview</span>
                                            </Link>
                                        </li>
                                        {
                                            isBuyer && <li>

                                                <Link to="/dashboard/myOrders"
                                                    className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                >
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

                                                    <Link to="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                        <span className="ml-3">Add Products </span>
                                                    </Link>
                                                </li>
                                                <li>

                                                    <Link to="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                    >
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

                                                        <Link to="/dashboard/allSellers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>

                                                            <span className="ml-3">All Sellers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>

                                                            <span className="ml-3">All Buyers </span>
                                                        </Link>
                                                    </li>
                                                    <li>

                                                        <Link to="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700"

                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                            </svg>

                                                            <span className="ml-3">Reported Products </span>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }




                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* dashboard main part */}
                        <div className="w-full lg:w-4/5">
                            <div>

                                <div className="bg-gray-800  py-4 px-3">

                                    <div className="flex items-center justify-between px-6">
                                        <div className="w-6/12 flex items-center">

                                            <span className='hidden md:inline-block text-firstCol   mr-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                                                </svg>

                                            </span>
                                            <h4 className="text-lg md:text-xl text-semibold inline-block text-gray-100">
                                                Hello, {user?.displayName}
                                            </h4>
                                        </div>
                                        <div className="w-6/12 ">


                                            <div className="flex items-center justify-center">
                                                {/* search bar */}
                                                <div className=" hidden md:block">
                                                    <form onSubmit='' className='relative'>
                                                        <span className="absolute top-3 left-5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                            </svg>
                                                        </span>

                                                        <input
                                                            type="text"
                                                            name="searchBar"
                                                            id="searchBar"
                                                            className="pl-14 py-2.5 pr-2 block  rounded-lg border-gray-300 bg-card text-sm"
                                                            placeholder="Search here..."
                                                        />
                                                    </form>

                                                </div>
                                                {/* notification icon */}
                                                <div className="pl-7 pr-3 relative inline-flex items-center cursor-pointer">
                                                    <span className="text-3xl text-white inline-block">
                                                        <MdNotifications />
                                                    </span>
                                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-firstCol border-2 border-gray-800 rounded-full -top-2 -right-0 dark:border-gray-900">5</div>

                                                </div>
                                                {/* user dropdown */}
                                                <div className="ml-5 mr-6 flex items-center cursor-pointer relative"
                                                    onClick={handleShow}
                                                >
                                                    <img src={user?.photoURL} alt="" className='rounded-full w-12 h-12 md:w-14 md:h-14 ' />
                                                    <button className="text-2xl text-white">
                                                        <IoMdArrowDropdown />
                                                    </button>
                                                    <div
                                                        className="absolute top-16 z-10 left-0 w-44 p-5 rounded shadow-lg shadow-gray-300 bg-gray-100 "
                                                        style={{ display: showDropdown === true ? "block" : "none" }}
                                                    >
                                                        <ul>
                                                            <li className='mb-3'>
                                                                <a href="">{user?.email}</a>
                                                            </li>
                                                            <li>

                                                                <button
                                                                    className='flex items-center justify-center text-base'
                                                                    onClick={handleLogOut}
                                                                >
                                                                    <span className="text-xl text-dark mr-3"> <AiOutlineLogout /></span>
                                                                    Sign Out
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                                <span className=' text-white  mx-3 md:hidden cursor-pointer' title='Open sidenav'
                                                    onClick={handleToggle}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                                    </svg>

                                                </span>

                                            </div>


                                        </div>

                                    </div>
                                    <hr className='my-3 md:hidden' />                                    {/* mobile search form */}
                                    <div className="py-4  md:hidden px-40 text-center flex justify-center items-center">
                                        <form onSubmit='' className='relative text-center'>
                                            <span className="absolute top-3 left-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                </svg>
                                            </span>

                                            <input
                                                type="text"
                                                name="searchBar"
                                                id="searchBar"
                                                className="pl-14 py-2.5 pr-2 block  rounded-lg border-gray-300 bg-card text-sm "
                                                placeholder="Search here..."
                                            />
                                        </form>
                                    </div>
                                </div>
                                <Outlet />
                                {/* sidenav for mobile screen */}
                                <div className="">

                                    <div id="drawer-navigation" className={`side_nav block lg:hidden z-40 h-screen p-4  bg-white w-80 dark:bg-gray-800 ${isOpen === true ? 'activ' : ''}`} tabindex="-1" aria-labelledby="drawer-navigation-label">
                                        {/* <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5> */}


                                        <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={handleToggle}
                                        >
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            <span className="sr-only">Close menu</span>
                                        </button>
                                        <div className="py-4 overflow-y-auto px-7">
                                            <Link to="/" className="flex items-center justify-center">

                                                <span className="text-center text-2xl font-medium whitespace-nowrap text-white py-4">Thrift Store</span>
                                            </Link>

                                            <hr className="divider_line my-3" />
                                            <ul className="space-y-2">
                                                <li>
                                                    <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg class="w-6 h-6 xl:w-5 xl:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12V5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>

                                                        <span className="ml-3">Dashboard</span>

                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                        <svg class="w-6 h-6 xl:w-5 xl:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"></path></svg>
                                                        <span className="ml-3">Overview</span>
                                                    </a>
                                                </li>
                                                {
                                                    isBuyer && <li>

                                                        <a href="/dashboard/myOrders" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                            </svg>

                                                            <span className="ml-3">My Orders</span>
                                                        </a>
                                                    </li>
                                                }
                                                {isSeller &&
                                                    <>
                                                        <li>

                                                            <a href="/dashboard/addProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>

                                                                <span className="ml-3">Add Products </span>
                                                            </a>
                                                        </li>
                                                        <li>

                                                            <a href="/dashboard/myProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                                </svg>
                                                                <span className="ml-3">My Products </span>
                                                            </a>
                                                        </li>
                                                    </>
                                                }
                                                {
                                                    isAdmin && (
                                                        <>
                                                            <li>

                                                                <a href="/dashboard/allSellers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                    </svg>
                                                                    <span className="ml-3">All Sellers </span>
                                                                </a>
                                                            </li>
                                                            <li>

                                                                <a href="/dashboard/allBuyers" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                    </svg>
                                                                    <span className="ml-3">All Buyers </span>
                                                                </a>
                                                            </li>
                                                            <li>

                                                                <a href="/dashboard/reportedProducts" className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                                    </svg>
                                                                    <span className="ml-3">Reported Products </span>
                                                                </a>
                                                            </li>
                                                        </>
                                                    )
                                                }







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
