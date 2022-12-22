import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { set } from 'react-hook-form';
import { toast } from 'react-toastify';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import { AuthState } from '../../../context/AuthProvider'
import { DataState } from '../../../context/DataProvider';

const MyProduct = () => {

    //geth logged in user info
    const { user } = AuthState();



    //get the booking data
    const { bookings, advertisedProducts } = DataState();

    //new advertised products
    const [newAdvertisedProducts, setNewAdvertisedProducts] = useState([]);

    const [productInfo, setProductInfo] = useState(null)

    const [isAdvertised, setIsAdvertised] = useState(false);

    //fetch the seller product 
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://vendor-store-server.vercel.app/products?sellerEmail=${user?.email}`);
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
        fetch(`https://vendor-store-server.vercel.app/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Wow!!! Your product is deleted successfully `, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });

                    refetch();
                }
            })
            .catch(err => console.log(err))
    }

    const handleAdvertise = (product) => {

        //advertise product on click
        fetch(`https://vendor-store-server.vercel.app/advertiseProducts/${product._id}`, {
            method: 'PUT',

        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success(`Wow!!! Product is added successfully to the advertised items`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });
                    refetch();
                }
            })

        const advertisedProduct = {
            name: product?.name,
            categoryName: product?.categoryName,
            image: product?.image,
            originalPrice: product?.originalPrice,
            resalePrice: product?.resalePrice,
            productCondition: product?.productCondition,
            location: product?.location,
            yearOfPurchase: product?.yearOfPurchase,
            postDate: product?.postDate,
            sellerName: product?.sellerName,
            sellerPhoto: product?.sellerPhoto,
            sellerEmail: product?.sellerEmail,
            mobile: product?.mobile

        }

        fetch('https://vendor-store-server.vercel.app/advertisedProducts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advertisedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);


                // navigate('/');

            })
            .catch(err => console.log(err))


    }

    //react toastify
    const customId1 = "custom-id-yes";
    const customId2 = "custom-id-no";

    // const { data: advertisedProducts = [], } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch('https://vendor-store-server.vercel.app/advertisedProducts');
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
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Selling Status
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {myProducts?.map((product) => (
                            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="py-4 px-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={product.image} alt="" className="rounded-lg w-20 h-20" />
                                </th>
                                <td class="py-4 px-5 text-darkBlack text-normal">
                                    {product.name}
                                </td>
                                <td class="py-4 px-5">
                                    ${product.resalePrice}
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
                                        !bookings.find((booking) => booking.productName === product.name) ?
                                            <span className='inline-block'>
                                                {
                                                    product.isAdvertised ? (
                                                        <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-2.5 px-6 mr-3'

                                                        >Advertised</button>
                                                    )
                                                        :
                                                        (
                                                            <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-2.5 px-6 mr-3'
                                                                type="submit"
                                                                onClick={() => handleAdvertise(product)}

                                                            >Advertise</button>
                                                        )
                                                }

                                            </span>



                                            : " "
                                    }




                                    <label
                                        htmlFor="my-modal-3"
                                        className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-normal py-2.5 px-6"
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
