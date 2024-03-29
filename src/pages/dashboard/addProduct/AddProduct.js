import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthState } from '../../../context/AuthProvider';
import { DataState } from '../../../context/DataProvider';

const AddProduct = () => {

    //get the logged in user 
    const { user } = AuthState();

    //get verified seller data
    const { verifiedSellers } = DataState();
    console.log(verifiedSellers)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    //get the secret imgbb api key
    const imgbbApiKey = process.env.REACT_APP_IMG_API_KEY;

    //check if product is submitted
    const [isProductSubmitted, setIsProductSubmitted] = useState(false);

    //react toastify
    const customId1 = "custom-id-yes";
    const customId2 = "custom-id-no";
    const handleAddProduct = (data) => {

        //img upload data
        const image = data.img[0];
        console.log(image);

        const formData = new FormData();

        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

        fetch(url, {
            method: 'POST',
            body: formData

        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);

                if (imgData.success) {
                    console.log(imgData.data.url);

                    //all product data
                    const product = {

                        name: data.name,
                        categoryName: data.category,
                        categoryId: data.categoryId,
                        image: imgData.data.url,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        productCondition: data.conditionType,
                        mobile: data.mobile,
                        location: data.location,
                        description: data.description,
                        yearOfPurchase: data.purchaseYear,
                        postDate: new Date(),
                        sellerName: user?.displayName,
                        sellerPhoto: user?.photoURL,
                        sellerEmail: user?.email
                    }
                    console.log(product);
                    //send data to the server
                    fetch('https://vendor-store-server.vercel.app/products', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success(`Wow!!! Your product is added successfully`, {
                                    position: toast.POSITION.TOP_CENTER,
                                    toastId: customId1,
                                    autoClose: 1000
                                });

                            }

                            //set product submitted true
                            setIsProductSubmitted(!isProductSubmitted);
                            navigate('/dashboard/myProducts');

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))





    }

    //filter if the seller is verified
    const filteredSeller = verifiedSellers.filter((seller) => seller.name === user?.displayName);
    console.log(filteredSeller)
    return (
        <section className=" login_section py-10 bg-lightGray ">
            <div className='container mx-auto lg:max-w-7xl '>
                {
                    filteredSeller.length > 0 ?
                        (
                            <div className=' form_wrapper bg-white px-10 py-10 w-full mx-auto md:max-w-4xl lg:max-w-2xl rounded'>

                                <h2 className="text-3xl font-semibold text-dark mt-5 mb-10 text-center">Add Your Product!</h2>

                                <form onSubmit={handleSubmit(handleAddProduct)} className="flex flex-col gap-4 text-left">
                                    <div className="mb-1">

                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-300 focus:border-blue-500"
                                            placeholder="Product Name"
                                            {...register("name", {
                                                required: "Name is required",


                                            })}
                                        />
                                        {errors.name && <p className='text-red-500 mt-1'>{errors.name.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                                            {...register("img", {
                                                required: "Image is required",


                                            })}
                                        />
                                        {errors.img && <p className='text-red-500 mt-1'>{errors.img.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <select id="countries" className="bg-gray-50border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            {...register("category", {
                                                required: "category is required",


                                            })}
                                        >
                                            <option value="" disabled selected>Choose a category</option>
                                            <option value="Polo-shirt">Polo-shirt</option>
                                            <option value="Sleveless-middi">Sleveless-middi</option>
                                            <option value="Sweat-shirt">Sweat-shirt</option>
                                            <option value="Hoodie">Hoodie</option>
                                            <option value="T-shirt">Mini Skirt</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Crop-blouse">Crop-blouse</option>
                                        </select>
                                        {errors.category && <p className='text-red-500 mt-1'>{errors.category.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <input
                                            type="text"
                                            id="catId"
                                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-300 focus:border-blue-500" placeholder="Id must be similar for individual category"
                                            {...register("categoryId", {
                                                required: "Category Id is required",


                                            })}
                                        />
                                        {errors.categoryId && <p className='text-red-500 mt-1'>{errors.categoryId.message}</p>}
                                    </div>
                                    <div className="mb-1">

                                        <input
                                            type="text"
                                            id="originalPrice"
                                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-300 focus:border-blue-500" placeholder="Product Original Price"
                                            {...register("originalPrice", {
                                                required: "Original Price is required",


                                            })}
                                        />
                                        {errors.originalPrice && <p className='text-red-500 mt-1'>{errors.originalPrice.message}</p>}
                                    </div>
                                    <div className="mb-1">

                                        <input
                                            type="text"
                                            id="resalePrice"
                                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-300 focus:border-blue-500" placeholder="Product Resale Price"
                                            {...register("resalePrice", {
                                                required: "Resale Price is required",


                                            })}
                                        />
                                        {errors.resalePrice && <p className='text-red-500 mt-1'>{errors.resalePrice.message}</p>}

                                    </div>
                                    <div className="mb-1">
                                        <select id="condition" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            {...register("conditionType", {
                                                required: "Condition type is required",


                                            })}
                                        >
                                            <option value="" disabled selected>Choose a condition type</option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>

                                        </select>
                                        {errors.conditionType && <p className='text-red-500 mt-1'>{errors.conditionType.message}</p>}
                                    </div>
                                    <div className="mb-1">

                                        <input
                                            type="text"
                                            id="phone"
                                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-300 focus:border-blue-500" placeholder="Mobile Number"
                                            {...register("mobile", {
                                                required: "Mobile Number is required",


                                            })}
                                        />
                                        {errors.mobile && <p className='text-red-500 mt-1'>{errors.mobile.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            {...register("location", {
                                                required: "location is required",


                                            })}
                                        >
                                            <option value="" disabled selected>Choose a location</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Barisal">Barisal</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                            <option value="Rongpur">Rongpur</option>

                                        </select>
                                        {errors.location && <p className='text-red-500 mt-1'>{errors.location.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <textarea id="desc"
                                            rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Production description here..."
                                            {...register("description", {
                                                required: "description is required",


                                            })}
                                        ></textarea>
                                        {errors.description && <p className='text-red-500 mt-1'>{errors.description.message}</p>}
                                    </div>
                                    <div className="mb-1">
                                        <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            {...register("purchaseYear", {
                                                required: "Years of purchase is required",


                                            })}
                                        >
                                            <option value="" disabled selected>Choose a year of purchase</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>

                                        </select>
                                        {errors.purchaseYear && <p className='text-red-500 mt-1'>{errors.purchaseYear.message}</p>}
                                    </div>

                                    <button className='bg-firstCol text-white hover:bg-secondCol py-2 rounded-lg text-lg' type="submit" >
                                        Add Product
                                    </button>
                                </form>

                            </div>
                        )
                        :
                        filteredSeller.length === 0 ?
                            (
                                <div className='py-48 flex justify-center items-center'>
                                    <div className="py-3">
                                        <h2 className='text-dark font-medium text-2xl'>Sorry!! You're not allowed to add a product untill you get verified</h2>
                                    </div>
                                </div>
                            )
                            :
                            " "


                }

            </div>
        </section>
    )
}

export default AddProduct
