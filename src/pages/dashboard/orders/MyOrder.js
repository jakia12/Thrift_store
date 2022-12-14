import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom';
import { AuthState } from '../../../context/AuthProvider';

const MyOrder = () => {

    //get logged in email
    const { user } = AuthState();


    const { data: bookings = [], refetch } = useQuery({
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


    //delete the booking
    const handleDelete = (booking) => {
        fetch(`https://vendor-store-server.vercel.app/bookings/${booking._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Your booking is deleted successfully")
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="py-4 ml-2">

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
                                                    // <Link to={`/dashboard/payment/${booking._id}`}></Link>
                                                    <button
                                                        className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7'
                                                        type="submit"

                                                    >
                                                        Pay
                                                    </button>
                                                )
                                        }

                                    </td>
                                    <td class="py-4 px-6">
                                        <button className=" text-white py-3 px-7 rounded-lg text-normal  bg-firstCol hover:bg-secondCol" type="submit"
                                            onClick={() => handleDelete(booking)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default MyOrder
