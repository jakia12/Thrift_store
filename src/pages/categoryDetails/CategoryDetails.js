import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AuthState } from '../../context/AuthProvider'
import { getSingleCategory } from '../../utils/api'
import SellerPhoto from '../../images/avatar/1.jpg';
import { MdReportProblem } from 'react-icons/md';
import BookingModal from '../../components/bookingModal/BookingModal';
import { DataState } from '../../context/DataProvider';
import { toast } from 'react-toastify';


const CategoryDetails = () => {
    //get the user
    const { user } = AuthState();

    //get users data

    const { sellers } = DataState();

    const products = useLoaderData();

    const [productInfo, setProductInfo] = useState(null);

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
                        autoClose: 1000
                    });


                    //setIsAdvertised(!isAdvertised);
                }

                // navigate('/');

            })
            .catch(err => console.log(err))

        console.log(reportedProduct);
    }
    console.log(sellers);
    const test = sellers.filter((seller) => seller.verificationStatus === "verified");
    console.log(test);
    // const verifiedSeller = test.find((t) => t.verificationStatus === "verified");
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
                            <div className="sm:w-6/12 md:w-4/12 xs:mx-auto sm:mx-0">
                                <div className="m-4 shadow-lg shadow-gray-200">
                                    <div className="relative overlay">
                                        <img src={product.image} alt="" className="rounded w-full prod_img h-96" />
                                        <div className="bg-firstCol py-2 px-8 rounded absolute top-6 right-6 text-white cat_content">
                                            {product.location}
                                        </div>
                                        <div className="flex justify-between items-center absolute top-2/3 left-6 cat_content">
                                            <img src={SellerPhoto} alt="" className=" rounded-full border-2 border-firstCol" width="70px" height="70px" />
                                            <div>
                                                <span className="ml-4 text-white text-normal block text-center">
                                                    {
                                                        // verifiedSeller ? "Verified" : "Unverified"

                                                    }
                                                </span>
                                                <span className="ml-4 text-white">{product?.sellerName} </span>
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
