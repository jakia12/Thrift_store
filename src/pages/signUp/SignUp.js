import React, { useEffect, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { AuthState } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';



const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { user, createUser, setLoading, loading, updateUserProfile, setUserTypeVal, userTypeVal } = AuthState();

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const [value, setValue] = useState('');

    // setUserTypeVal(value);
    //destructure token from use usetoken


    const [token] = useToken(createdUserEmail);

    //get form registered from react form hook


    const [error, setError] = useState('');



    //navigate to homepage after signup
    const navigate = useNavigate();


    //state for form validation




    if (token) {

        navigate('/');
    }
    //react toastify
    const customId1 = "custom-id-yes";
    const customId2 = "custom-id-no";
    //submit the form

    //get the secret photobb api key
    const photoApiKey = process.env.REACT_APP_IMG_API_KEY;

    const handleSignUp = (data) => {
        console.log(data.userType);

        // const photo = data.photo[0];
        // console.log(photo)
        // const formData = new FormData();
        // formData.append('photo', photo);

        // const url = `https://api.imgbb.com/1/upload?key=${photoApiKey}`;

        // fetch(url, {
        //     method: 'POST',
        //     body: formData

        // })
        //     .then(res => res.json())
        //     .then(photoData => {
        //         console.log(photoData);
        //     })
        //     .catch(err => console.log(err))

        createUser(data.email, data.password)
            .then((res) => {
                const user = res.user;
                console.log(user);

                handleUpdateUser();
                toast.success(`Wow!!! User signed up successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: customId1,
                    autoClose: 1000
                });


                setValue(data.userType);

                setValue((state) => {
                    console.log(state);

                    return state;
                });

                setUserTypeVal(value);
                //console.log(userTypeVal);


            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

        const handleUpdateUser = () => {
            const profile = {
                photoURL: data.photo,
                displayName: data.name,

            };
            //display user
            updateUserProfile(profile)
                .then(() => {
                    saveUser(data.name, data.email, data.userType);

                })
                .catch(err => console.log(err))
        }
    }
    // 



    const saveUser = (name, email, userType) => {

        const user = {
            name: name,
            email: email,
            userType: userType
        };

        console.log(user);

        fetch('https://vendor-store-server.vercel.app/users', {
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
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User photo Url</label>

                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="text" placeholder="User Photo Url"
                                {...register("photo", {
                                    required: "User photo Url is required",


                                })}
                            />

                            {errors.photo && <p className='text-red-500 mt-1'>{errors.photo.message}</p>}
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
                            Sign Up
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
