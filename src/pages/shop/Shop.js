import React from 'react'
import SingleProductCard from '../../components/singleProductCard/SingleProductCard';
import { DataState } from '../../context/DataProvider'

const Shop = () => {
    //get all the products data from the data state
    const { products } = DataState();

    return (
        <section className='py-14 lg:py-20 '>
            <div className="container mx-auto w-full max-w-6xl">
                <div className="flex flex-wrap">
                    {
                        products.map((product) => (
                            <div className="sm:w-6/12 md:w-4/12 xs:mx-auto sm:mx-0">
                                <SingleProductCard
                                    key={product._id}
                                    product={product}
                                />
                            </div>
                        ))

                    }
                </div>
            </div>
        </section >
    )
}

export default Shop
