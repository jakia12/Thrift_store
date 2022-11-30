import React, { useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { AuthState } from '../../context/AuthProvider'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';
import "./Header.css";

const Header = () => {
    const { user, logOut, setLoading } = AuthState();

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(err => console.log(err))
    }


    //state for hamburger menu
    const [isOpen, setIsopen] = useState(false);

    const handleToggle = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    return (
        <div>

            <nav className="px-2 py-4 md:py-2 bg-white border-b border-gray-200 darkBlack:bg-gray-900 darkBlack:border-gray-700">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" className="flex items-center">

                        <span className="self-center text-xl font-semibold whitespace-nowrap darkBlack:text-white">Thrift Store</span>
                    </a>
                    {/* <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 darkBlack:text-gray-400 darkBlack:hover:bg-gray-700 darkBlack:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button> */}
                    <div className="responsive_menu">
                        <button
                            onClick={handleToggle}
                            className="hamburger_icon text-darkBlack">
                            <GiHamburgerMenu />
                        </button>
                        <div

                            className={`side_nav ${isOpen == true ? 'active' : ''}`}

                        >
                            <button
                                className="close_btn "
                                onClick={handleToggle}
                            >
                                <AiFillCloseCircle />
                            </button>
                            <ul className="mobile_menu">

                                <li>
                                    <NavLink
                                        to="/"
                                        className=" list_item text-white px-3 py-2 me-2 rounded  text-capitalize "

                                    // style={({ isActive }) =>
                                    //     isActive ? activeStyle : undefined
                                    // }
                                    >Home</NavLink>
                                </li>
                                <li >
                                    <NavLink
                                        to="/shop"
                                        className="list_item text-white px-3 py-2 me-2 rounded text-capitalize "

                                    // style={({ isActive }) =>
                                    //     isActive ? activeStyle : undefined
                                    // }

                                    >Shop</NavLink>
                                </li>
                                <li >
                                    <NavLink
                                        to="/blog"
                                        className="list_item text-white px-3 py-2 me-2 rounded text-capitalize "

                                    // style={({ isActive }) =>
                                    //     isActive ? activeStyle : undefined
                                    // }

                                    >Blog</NavLink>
                                </li>
                                {
                                    user?.email ? (
                                        <>
                                            <li >
                                                <NavLink
                                                    to="/dashboard"
                                                    className="list_item text-white px-3 py-2 me-2 rounded text-capitalize "

                                                // style={({ isActive }) =>
                                                //     isActive ? activeStyle : undefined
                                                // }
                                                >Dashboard</NavLink>
                                            </li>
                                            <li>

                                                <button
                                                    className="py-2.5 hover:bg-secondCol  hover:text-white px-7  bg-firstCol text-white rounded-lg"
                                                    onClick={handleLogOut}
                                                >Log Out</button>

                                            </li>

                                        </>
                                    ) :
                                        (
                                            <>

                                                <li>
                                                    <NavLink to="/login">
                                                        <button className="py-2.5 hover:bg-secondCol  hover:text-white px-7  bg-firstCol text-white rounded-lg">Login</button>
                                                    </NavLink>
                                                </li>
                                            </>
                                        )
                                }


                            </ul>
                        </div>
                    </div>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                        <ul className="flex items-center flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white darkBlack:bg-gray-800 md:darkBlack:bg-gray-900 darkBlack:border-gray-700">
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4   rounded md:bg-transparent text-darkBlackBlack md:p-0 md:darkBlack:text-white darkBlack:bg-blue-600 md:darkBlack:bg-transparent" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" className="block py-2 pl-3 pr-4   rounded md:bg-transparent text-darkBlack md:p-0 md:darkBlack:text-white darkBlack:bg-blue-600 md:darkBlack:bg-transparent" aria-current="page">Shop</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="block py-2 pl-3 pr-4   rounded md:bg-transparent text-darkBlack md:p-0 md:darkBlack:text-white darkBlack:bg-blue-600 md:darkBlack:bg-transparent" aria-current="page">Blog</Link>
                            </li>
                            {
                                user?.email ? (
                                    <>
                                        <li>
                                            <Link to="/dashboard" className="block py-2 pl-3 pr-4   rounded md:bg-transparent text-darkBlack md:p-0 md:darkBlack:text-white darkBlack:bg-blue-600 md:darkBlack:bg-transparent" aria-current="page">Dashboard</Link>
                                        </li>
                                        <li>

                                            <button
                                                className="py-2.5 hover:bg-firstCol  hover:text-white px-7 border border-firstCol bg-white text-firstCol rounded-lg"
                                                onClick={handleLogOut}
                                            >Log Out</button>

                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/login">
                                            <button className="py-2.5 hover:bg-firstCol  hover:text-white px-7 border border-firstCol bg-white text-firstCol rounded-lg">Login</button>
                                        </Link>
                                    </li>
                                )
                            }



                        </ul>


                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
