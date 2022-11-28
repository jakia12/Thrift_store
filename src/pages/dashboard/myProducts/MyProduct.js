import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import { AuthState } from '../../../context/AuthProvider'
import { DataState } from '../../../context/DataProvider';

const MyProduct = () => {

    //geth logged in user info
    const { user } = AuthState();



    //get the booking data
    const { bookings, advertisedProducts } = DataState();


    const [productInfo, setProductInfo] = useState(null)

    const [isAdvertised, setIsAdvertised] = useState(false);

    //fetch the seller product 
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/products?email=${user?.email}`);
                const data = await res.json();
                return data;
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    //
    const handleDelete = (product) => {
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Your product is deleted successfully")
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }

    const handleAdvertise = (product) => {


        const advertisedProduct = {
            productName: product?.name,
            categoryName: product?.categoryName,
            image: product?.image,
            originalPrice: product?.originalPrice,
            resalePrice: product?.resalePrice,
            productCondition: product?.productCondition,
            location: product?.location,
            yearOfPurchase: product?.yearOfPurchase,
            postDate: product?.postDate,
            sellerName: user?.displayName,
            sellerEmail: product?.sellerEmail

        }

        fetch('http://localhost:5000/advertisedProducts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advertisedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Product is added successfully to the advertised items');
                    refetch();
                    //setIsAdvertised(!isAdvertised);
                }

                // navigate('/');

            })
            .catch(err => console.log(err))


    }

    // const { data: advertisedProducts = [], } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch('http://localhost:5000/advertisedProducts');
    //             const data = await res.json();
    //             return data;
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     }
    // })
    return (
        <section className='py-8 ml-2'>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Product name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Color
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {products?.map((product) => (
                            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="py-4 px-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={product.image} alt="" className="rounded-lg w-20 h-20" />
                                </th>
                                <td class="py-4 px-5 text-darkBlack text-normal">
                                    {product.name}
                                </td>
                                <td class="py-4 px-5">
                                    {product.resalePrice}
                                </td>
                                <td class="py-4 px-5">

                                    {
                                        bookings.find((booking) => booking.productName === product.name) ? <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-2.5 px-6' type="submit"

                                        >
                                            Sold
                                        </button> :
                                            <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-2.5 px-6' type="submit"

                                            >
                                                Unsold
                                            </button>
                                    }

                                </td>

                                <td class="py-4 px-5">


                                    {
                                        !bookings.find((booking) => booking.productName === product.name) ? <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-2.5 px-6 mr-3'
                                            type="submit"
                                            onClick={() => handleAdvertise(product)}
                                            disabled={advertisedProducts.find((p) => p.productName === product.name) ? true : false}
                                        >

                                            {advertisedProducts.find((p) => p.productName === product.name) ? "Advertised" : "Advertise"}

                                        </button> : " "
                                    }




                                    <label
                                        htmlFor="my-modal-3"
                                        className="bg-red-600 text-white hover:bg-red-500 rounded-lg text-normal py-2.5 px-6"
                                        onClick={() => handleDelete(product)}
                                    >Delete</label>

                                    {/* {
                                        productInfo &&
                                        <DeleteModal
                                            productInfo={productInfo}
                                            setProductInfo={setProductInfo}
                                        />
                                    } */}
                                    {/* Put this part before </body> tag */}

                                </td>
                            </tr>

                        ))}



                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default MyProduct
