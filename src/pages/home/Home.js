import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BookingModal from '../../components/bookingModal/BookingModal';
import Spinner from '../../components/spinner/Spinner';
import { AuthState } from '../../context/AuthProvider';
import { DataState } from '../../context/DataProvider';
import SellerPhoto from '../../images/avatar/1.jpg';
import './Home.css';

const Home = () => {
    let uniqueIds = [];
    const [categoryArr, setCategoryArr] = useState([]);

    //get the advertised producsts

    const { advertisedProducts } = DataState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setCategoryArr(data);
                setLoading(false);

            })
            .catch(err => console.log(err))
    }, [categoryArr]);

    console.log(categoryArr)



    const unique = categoryArr.filter((element) => {

        const isDuplicate = uniqueIds.includes(element.categoryId);

        if (!isDuplicate) {
            uniqueIds.push(element.categoryId);

            return true

        }


    });

    const [productInfo, setProductInfo] = useState(null);

    //get logged in user

    const { user } = AuthState();

    // name, image, originalPrice, resalePrice, location, postDate, yearOfPurchase 

    const handleShow = (product) => {
        setProductInfo(product);
    }

    return (
        <>
            <section className='py-14 lg:py-20'>
                <div className="container mx-auto w-full lg:max-w-6xl ">
                    <div className="text-center pb-8">
                        <h2 className="text-3xl font-medium text-darkBlack">
                            Product Categories
                        </h2>
                        <div className="bg-firstCol w-20 h-1 mx-auto mt-4"></div>
                    </div>

                    {/* product category column */}
                    {loading ? <Spinner /> : ""}
                    <div className="flex flex-wrap">
                        {
                            unique ? (unique.map((category) => (
                                <div className="sm:w-6/12 md:w-3/12" key={category.id}>
                                    <div className="m-3 relative overlay rounded">
                                        <img src={category.image} alt="" className="w-full rounded" />
                                        <div className="absolute top-24 left-10 cat_content">
                                            <h3 className="text-lg font-medium text-white py-2">
                                                {category.categoryName}
                                            </h3>
                                            <Link to={`/category/${category.categoryId}`}>
                                                <button className='bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-2.5 px-6' type="submit" >
                                                    Buy Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))) : ""


                        }

                    </div>
                </div>
            </section>

            {/* advertised items */}
            <section className="py-14 lg:py-20 bg-gray-50">
                <div className="container mx-auto w-full lg:max-w-6xl">
                    <div className="text-center pb-8">
                        <h2 className="text-3xl font-medium text-darkBlack">
                            Advertised products
                        </h2>
                        <div className="bg-firstCol w-20 h-1 mx-auto mt-4"></div>
                    </div>
                    <div className="flex flex-wrap">
                        {
                            advertisedProducts.map((product) => (
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
                                                {product.productName}
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
        </>

    )
}

export default Home
