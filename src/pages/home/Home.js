import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BookingModal from '../../components/bookingModal/BookingModal';
import Spinner from '../../components/spinner/Spinner';
import { AuthState } from '../../context/AuthProvider';
import { DataState } from '../../context/DataProvider';

import { AiOutlineCheck } from 'react-icons/ai';
import Slider from "react-slick";

import { featureBoxes, promoBanners } from '../../data/PlaceholderData';

import PromoBannerCard from '../../components/promoBannerCard/PromoBannerCard';
// import PromoBannerCard from '../../components/promoBannerCard/PromoBannerCard';
import './Home.css';
import sl1 from '../../images/slider/s1.jpg';
import FeatureBox from '../../components/featureBox/FeatureBox';
import Carosels from '../../data/PlaceholderData';
import SingleProductCard from '../../components/singleProductCard/SingleProductCard';

const Home = () => {
    let uniqueIds = [];
    const [categoryArr, setCategoryArr] = useState([]);

    //get the advertised producsts



    const { advertisedProducts, users, verifiedSellers } = DataState();


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://vendor-store-server.vercel.app/products')
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

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,


        autoplaySpeed: 2000,
        fade: true,
    };



    return (
        <>
            {/* product slider  */}
            <section className='slider_section'>
                <div className='carousel_sec clearfix'>

                    <Slider {...settings}>
                        {
                            Carosels.map((carosel) => (
                                <div className='slider_wrapper' >

                                    <div className="slider_content sl-h" style={{
                                        background: `linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)),url(${carosel.backgroundImg})`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>
                                        <div className="content_wraper text-center px-5">
                                            <div className="flex justify-center">
                                                <h1 className='lg:text-6xl text-4xl font-medium text-white  uppercase  pb-4 ' >{carosel.sliderTitle}</h1>
                                            </div>

                                            <p className="text-white lg:max-w-3xl max-w-xl">{carosel.sliderSubTitle}</p>
                                            <div className="pt-6">
                                                <Link to="/shop">
                                                    <button className=" text-white py-3 px-6   rounded-lg text-lg  bg-firstCol hover:bg-secondCol" type="submit">
                                                        {carosel.btnText}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }




                    </Slider>



                </div>

            </section>

            {/* promo banner section */}
            <section className="py-8 ">
                <div className="container mx-auto lg:max-w-7xl">
                    <div className="flex flex-wrap lg:flex-nowrap">
                        {
                            promoBanners.map((banner) => (
                                <PromoBannerCard
                                    key={banner.id}
                                    banner={banner}

                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='py-14 lg:py-20'>
                <div className="container mx-auto w-full lg:max-w-6xl ">
                    <div className="text-center pb-8">
                        <h2 className="text-3xl font-medium text-darkBlack">
                            Product Categories
                        </h2>
                        <div className="bg-firstCol w-20 h-1 mx-auto mt-4"></div>
                    </div>


                    {loading ? <Spinner /> : ""}
                    <div className="flex flex-wrap">
                        {
                            unique ? (unique.map((category) => (
                                <div className="sm:w-6/12 md:w-3/12 mx-auto sm:mx-0" key={category.id}>
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
            </section >

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
                                <div className="xs:12/12 sm:w-6/12 md:w-4/12 mx-auto sm:mx-0">
                                    {/* <div className="m-4 shadow-lg shadow-gray-200">
                                        <div className="relative overlay">
                                            <img src={product.image} alt="" className="rounded w-full prod_img h-96 text-white" />
                                            <div className="bg-firstCol py-2 px-8 rounded absolute top-6 right-6 text-white cat_content">
                                                {product.location}
                                            </div>
                                            <div className="flex justify-between items-center absolute top-2/3 left-6 cat_content">
                                                <img src={product.sellerPhoto} alt="Seller Photo" className="seller_photo  rounded-full border-2 border-firstCol" width="70px" height="70px" />
                                                <div>
                                                    {
                                                        verifiedSellers.find((vSeller) => vSeller.name === product.sellerName) ?
                                                            <span className="ml-4 text-white text-lg inline-block text-center">
                                                                <AiOutlineCheck />
                                                            </span> : ""
                                                    }

                                                    <span className="ml-2 text-white text-lg inline-block"> {product.sellerName}</span>
                                                </div>

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
                                                            <Link to="/login">
                                                                <button className='bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-3 px-6'>
                                                                    Purchase Now
                                                                </button>
                                                            </Link>
                                                        )
                                                }


                                            </div>
                                            {
                                                productInfo && (
                                                    <BookingModal
                                                        productInfo={productInfo}
                                                        setProductInfo={setProductInfo}

                                                    />
                                                )}
                                        </div>
                                    </div> */}
                                    <SingleProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-14 lg:py-20">
                <div className="container mx-auto lg:max-w-6xl w-full">
                    <div className="flex flex-wrap lg:flex-nowrap">
                        {
                            featureBoxes.map((box) => (
                                <FeatureBox
                                    key={box.id}
                                    box={box}
                                />
                            ))
                        }
                    </div>

                </div>
            </section>
        </>

    )
}

export default Home
