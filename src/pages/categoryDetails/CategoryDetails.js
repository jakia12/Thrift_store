import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AuthState } from '../../context/AuthProvider'
import { getSingleCategory } from '../../utils/api'
import SingleProductCard from '../../components/singleProductCard/SingleProductCard';


const CategoryDetails = () => {

    //get product data loader
    const products = useLoaderData();


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
                            <div className="sm:w-6/12 md:w-4/12 mx-auto sm:mx-0">
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
    )
}

export const loader = ({ params }) => {
    const uId = params.categoryId;
    return getSingleCategory(uId);
}

export default CategoryDetails
