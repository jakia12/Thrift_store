import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AuthState } from '../../context/AuthProvider'
import { getSingleCategory } from '../../utils/api'
import SellerPhoto from '../../images/avatar/1.jpg';

import BookingModal from '../../components/bookingModal/BookingModal';

const CategoryDetails = () => {
    //get the user
    const { user } = AuthState();

    const products = useLoaderData();

    const [productInfo, setProductInfo] = useState(null);

    // name, image, originalPrice, resalePrice, location, postDate, yearOfPurchase 

    const handleShow = (product) => {
        setProductInfo(product);
    }

    //console.log(products);
    return (
        <section className='py-14 lg:py-20'>
            <div className="container mx-auto w-full lg:max-w-6xl ">
                <div className="text-center pb-8">
                    <h2 className="text-3xl font-medium text-darkBlack">
                        Product per Category
                    </h2>
                    <div className="bg-firstCol w-20 h-1 mx-auto mt-4"></div>
                </div>

                {/* product Row */}
                <div className="flex flex-wrap">
                    {
                        products?.map((product) => (
                            <div className="sm:w-6/12 md:w-4/12">
                                <div className="m-4 shadow-lg shadow-gray-200">
                                    <div className="relative overlay">
                                        <img src={product.image} alt="" className="rounded w-full prod_img h-96" />
                                        <div className="bg-firstCol py-2 px-8 rounded absolute top-6 right-6 text-white cat_content">
                                            {product.location}
                                        </div>
                                        <div className="flex justify-between items-center absolute top-2/3 left-6 cat_content">
                                            <img src={SellerPhoto} alt="" className=" rounded-full border-2 border-firstCol" width="70px" height="70px" />
                                            <span className="ml-4 text-white">{user?.displayName} </span>
                                        </div>
                                    </div>
                                    <div className="p-5 ml-2 ">
                                        <h3 className="text-lg font-semibold text-darkBlack mb-4">
                                            {product.name}
                                        </h3>
                                        <h4 className="text-normal font-normal text-darkBlack mb-3">
                                            Original Price : ${product.originalPrice}
                                        </h4>
                                        <h4 className="text-normal font-normal text-darkBlack mb-3">
                                            Resale Price : $ {product.resalePrice}
                                        </h4>
                                        <h4 className="text-normal font-normal text-darkBlack mb-4">
                                            Years of Use : {2023 - parseInt(product.yearOfPurchase)}
                                        </h4>

                                        <div className="mb-5 pt-2">
                                            <label
                                                htmlFor="my-modal-3"
                                                className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-3 px-6"
                                                onClick={() => handleShow(product)}
                                            >Purchase Now</label>

                                        </div>
                                        {
                                            productInfo && (
                                                <BookingModal
                                                    productInfo={productInfo}
                                                    setProductInfo={setProductInfo}

                                                />
                                            )


                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export const loader = ({ params }) => {
    const uId = params.categoryId;
    return getSingleCategory(uId);
}

export default CategoryDetails
