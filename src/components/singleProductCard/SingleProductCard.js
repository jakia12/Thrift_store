import React from 'react'
import BookingModal from '../bookingModal/BookingModal';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdReportProblem } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { DataState } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthProvider';


const SingleProductCard = ({ product }) => {

    const { verifiedSellers } = DataState();
    const [productInfo, setProductInfo] = useState(null);

    //get the user
    const { user } = AuthState();
    const navigate = useNavigate();
    // name, image, originalPrice, resalePrice, location, postDate, yearOfPurchase 
    //react toastify
    const customId1 = "custom-id-yes";
    const customId2 = "custom-id-no";

    const handleShow = (product) => {
        setProductInfo(product);
    }

    const handleReport = (product) => {

        const reportedProduct = {
            productName: product?.name,
            categoryName: product?.categoryName,
            image: product?.image,
            originalPrice: product?.originalPrice,
            resalePrice: product?.resalePrice,
            productCondition: product?.productCondition,
            location: product?.location,
            yearOfPurchase: product?.yearOfPurchase,
            postDate: product?.postDate,
            sellerName: product?.sellerName,
            sellerEmail: product?.sellerEmail

        };

        fetch('https://vendor-store-server.vercel.app/reportedProducts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(reportedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Wow!!! 'Product is reported successfully to the reported  items`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1500
                    });


                    //setIsAdvertised(!isAdvertised);
                }

                // navigate('/');

            })
            .catch(err => console.log(err))

        console.log(reportedProduct);
    }

    //handle click to login
    const handleClick = () => {
        toast.warning(`Please login to book the Product`, {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId1,
            autoClose: 1500
        });

        //navigate user to the login page
        navigate('/login');
    }
    return (
        <div className="m-4 shadow-lg shadow-gray-200">
            <div className="relative overlay">
                <img src={product.image} alt="" className="rounded w-full prod_img h-96" />
                <div className="bg-firstCol py-2 px-8 rounded absolute top-6 right-6 text-white cat_content">
                    {product.location}
                </div>
                <div className="flex justify-between items-center absolute top-2/3 left-6 cat_content">
                    <img src={product.sellerPhoto} alt="Seller Photo" className="seller_photo rounded-full border-2 text-white border-firstCol" width="70px" height="70px" />
                    <div>
                        {
                            verifiedSellers.find((vSeller) => vSeller.name === product.sellerName) ?
                                <span className="ml-4 text-white text-lg inline-block text-center">
                                    <AiOutlineCheck />
                                </span> : ""
                        }
                        <span className="ml-2 text-lg  text-white inline-block"> {product.sellerName}</span>
                    </div>
                </div>
            </div>
            <div className="p-5 ml-2 ">
                <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-darkBlack mb-4">
                        {product.name}
                    </h3>
                    <button
                        className='ml-auto mb-4'
                        onClick={() => handleReport(product)}
                    >
                        <span className="text-gray-400  text-2xl" title='Report to Admin'>
                            <MdReportProblem />
                        </span>
                    </button>
                </div>
                <h4 className="text-normal font-normal text-darkBlack mb-3">
                    Original Price : ${product.originalPrice}
                </h4>
                <h4 className="text-normal font-normal text-darkBlack mb-3">
                    Resale Price : $ {product.resalePrice}
                </h4>
                <h4 className="text-normal font-normal text-darkBlack mb-3">
                    Date of post : {product.postDate.slice(0, 10)}
                </h4>
                <h4 className="text-normal font-normal text-darkBlack mb-4">
                    Years of Use : {2023 - parseInt(product.yearOfPurchase)}
                </h4>

                <div className="mb-5 pt-2">
                    {
                        user?.email ?
                            (
                                <label
                                    htmlFor="my-modal-3"
                                    className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-3 px-6"
                                    onClick={() => handleShow(product)}
                                >Purchase Now</label>
                            ) :
                            (
                                // <Link to="/login">

                                // </Link>
                                <button
                                    className='bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-3 px-6'
                                    onClick={handleClick}
                                >
                                    Purchase Now
                                </button>
                            )
                    }



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
    )
}

export default SingleProductCard

