import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductDeleteModal from '../../../components/productDeleteModal/ProductDeleteModal';
import Spinner from '../../../components/spinner/Spinner';
import { AuthState } from '../../../context/AuthProvider';

const MyOrder = () => {

    //get logged in email
    const { user } = AuthState();


    const { data: bookings = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://vendor-store-server.vercel.app/bookings?email=${user?.email}`,
                    {
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                );

                const data = await res.json();
                console.log(data);
                return data;
            }
            catch (err) {
                console.log(err);
            }
        }
    });
    console.log(bookings)

    //state to save the deleted Item data
    const [deletedItem, setDeletedItem] = useState(null);

    //display delete modal clicking on delete button
    const handleShow = (booking) => {
        setDeletedItem(booking);
    }
    //delete the booking
    const handleDelete = () => {
        fetch(`https://vendor-store-server.vercel.app/bookings/${deletedItem._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Wow!!! Booking is deleted successfully`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: 'custom_order_id',
                        autoClose: 1000
                    });
                    setDeletedItem(null);
                    refetch();

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="py-4 ml-2">
            <div className={`py-10 ${(isLoading ? "block" : "hidden")}`}>
                <Spinner />
            </div>
            {
                bookings.length > 0 ?
                    (
                        <div class="overflow-x-auto relative shadow-md sm:rounded-lg px-7">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">
                                            Product Image
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Name
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Price
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Payment status
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookings.map((booking) => (
                                            <tr class="border-b shadow-lg shadow-gray-100 m-3 md:shadow-none md:rounded-none md:m-0 dark:bg-gray-900 dark:border-gray-700 bg-gray-100">
                                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img src={booking.productImage} alt="" className="rounded-lg w-20 h-20" />
                                                </th>
                                                <td class="py-4 px-6 text-darkBlack text-normal">
                                                    {booking.productName}
                                                </td>
                                                <td class="py-4 px-6">
                                                    ${booking.resalePrice}
                                                </td>
                                                <td class="py-4 px-6">
                                                    {
                                                        booking.paid ?
                                                            (<button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit" >
                                                                Paid
                                                            </button>)
                                                            :
                                                            (
                                                                <Link to={`/dashboard/payment/${booking._id}`}>
                                                                    <button
                                                                        className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7'
                                                                        type="submit"

                                                                    >
                                                                        Pay
                                                                    </button>
                                                                </Link>


                                                            )
                                                    }

                                                </td>
                                                <td class="py-4 px-6">
                                                    <label
                                                        htmlFor="my-modal-3"
                                                        className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-normal py-3 px-7"
                                                        onClick={() => handleShow(booking)}
                                                    >Delete</label>
                                                    {
                                                        deletedItem && (
                                                            <ProductDeleteModal
                                                                handleDelete={handleDelete}
                                                                deletedItem={deletedItem}
                                                            />
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                    :
                    (
                        <div className='py-48 flex justify-center items-center'>
                            <div className="py-3">
                                <h2 className='text-dark font-medium text-2xl'>Oops!! You've not purchased any product Yet</h2>
                            </div>
                        </div>
                    )
            }


        </section>
    )
}

export default MyOrder
