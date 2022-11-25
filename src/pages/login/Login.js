import React, { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineGoogle } from 'react-icons/ai';
import { AuthState } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, setLoading, user } = AuthState();

    //form validation by hook form



    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    //error handling while login
    const [error, setError] = useState('');

    //handlw jwt user authorization
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);


    //submit the form
    const handleLogin = (data) => {

        login(data.email, data.password)
            .then((res) => {
                const user = res.user;
                console.log(user);
                alert('user logged in successfully');
                setLoginUserEmail(data.email);
                if (token) {
                    navigate(from, { replace: true })
                }

            })
            .catch(err => {
                console.log(err);
                setError(err.message)
            })
    }

    //google login
    const handleGoogleLogin = () => {
        console.log('dfj');
    }
    return (
        <section className=" login_section lg:py-20 py-14 bg-nudeBlue ">
            <div className='container mx-auto lg:max-w-7xl md:px-10 px-6'>

                <div className=' form_wrapper bg-white px-10 py-10 w-full mx-auto lg:max-w-lg rounded'>

                    <h2 className="text-3xl font-semibold text-dark mt-5 mb-10 text-center">Login Now!</h2>
                    <h3 className="text-red-600 text-xl pb-3">{error}</h3>
                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 text-left">
                        <div className="mb-1">
                            <label for="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${(errors.email ? " border border-red-500 focus:border-red-500" : " border border-gray-300 focus:border-blue-500")}`}
                                placeholder="Your email"
                                {...register("email", {
                                    required: "Email is required",


                                })}
                            />
                            {errors.email && <p className='text-red-500 mt-1'>{errors.email.message}</p>}
                        </div>
                        <div className="mb-1">
                            <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
                            <input
                                type="password"
                                id="password"
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${(errors.password ? " border border-red-500 focus:border-red-500" : " border border-gray-300 focus:border-blue-500")}`} placeholder="Your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },

                                })}
                            />
                            {errors.password && <p className='text-red-500 mt-1'>{errors.password.message}</p>}
                        </div>



                        <button className='bg-firstCol text-white hover:bg-secondCol py-2 rounded-lg text-lg' type="submit" >
                            Login
                        </button>
                    </form>
                    <div className="flex justify-between items-center py-6">
                        <span className="text-normal text-dark font-normal ">Not signed up yet?</span><span className="text-dark text-normal font-normal"> <Link to="/signUp" className='underline'>Sign Up here</Link></span>
                    </div>

                    <div className="divider">OR</div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-white bg-lightBlue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-14 py-3 mt-6 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleGoogleLogin}
                        >
                            <div className="flex items-center">
                                <span className="text-xl text-white inline-block "><AiOutlineGoogle />
                                </span>
                                <span className='text-normal font-normal ml-2'>Continue with Google</span>
                            </div>

                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
