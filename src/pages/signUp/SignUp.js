import React, { useEffect, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { AuthState } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';



const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { user, createUser, setLoading, updateUserProfile } = AuthState();

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    //destructure token from use usetoken


    const [token] = useToken(createdUserEmail);

    //get form registered from react form hook


    const [error, setError] = useState('');



    //navigate to homepage after signup
    const navigate = useNavigate();


    //state for form validation






    //submit the form
    const handleSignUp = (data) => {


        createUser(data.email, data.password)
            .then((res) => {
                const user = res.user;
                console.log(user);

                handleUpdateUser();



            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

        const handleUpdateUser = () => {
            const profile = {
                displayName: data.name,

            };
            //display user
            updateUserProfile(profile)
                .then(() => {
                    saveUser(data.name, data.email);
                })
                .catch(err => console.log(err))
        }
    }
    // 



    const saveUser = (name, email) => {

        const user = {
            name: name,
            email: email
        };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email);
                if (token) {
                    alert('token is taken');
                    navigate('/');
                }

            })
            .catch(err => console.log(err))
    }



    return (
        <section className=" register_section lg:py-20 py-14 bg-nudeBlue">
            <div className='container mx-auto lg:max-w-7xl md:px-10 px-6'>
                <div className=' form_wrapper bg-white  px-10 py-10 w-full mx-auto lg:max-w-lg rounded'>
                    <h2 className="text-3xl font-semibold text-dark mt-5 mb-10 text-center">Sign Up Now!</h2>
                    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4 text-left">


                        <div className="mb-1">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>

                            <input
                                type="text"

                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${(errors.name ? " border border-red-500 focus:border-red-500" : " border border-gray-300 focus:border-blue-500")}`} placeholder="Your name"
                                {...register("name", {
                                    required: "Name is required",


                                })}


                            />
                            {errors.name && <p className='text-red-500 mt-1'>{errors.name.message}</p>}
                        </div>
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
                            <label for="types" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select User Type</label>
                            <select
                                id="types"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("userType", {
                                    required: "User type is required",


                                })}
                            >
                                <option selected>Choose a user type</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>

                            </select>
                            {errors.userType && <p className='text-red-500 mt-1'>{errors.userType.message}</p>}
                        </div>
                        <div className="mb-1">
                            <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${(errors.password ? " border border-red-500 focus:border-red-500" : " border border-gray-300 focus:border-blue-500")}`} placeholder="Your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })}
                            />
                            {errors.password && <p className='text-red-500 mt-1'>{errors.password.message}</p>}
                        </div>
                        <button className=" text-white py-2 rounded-lg text-lg  bg-firstCol hover:bg-secondCol" type="submit">
                            Register
                        </button>
                    </form>
                    <div className="flex justify-between items-center py-6">
                        <span className="text-normal text-dark font-normal ">Have an Account?</span><span className="text-dark text-normal font-normal"> <Link to="/login" className='underline'>Login here</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
