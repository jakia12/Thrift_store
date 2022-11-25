import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'



const AllSellers = () => {

    const [sellerQuery, setSellerQuery] = useState('seller');

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?userType=${sellerQuery}`);
            const data = await res.json();
            return data;
        }
    });


    return (
        <section className='py-12 pl-14 '>

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
                        {
                            sellers?.map((seller) => (
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {seller.name}
                                    </th>
                                    <td class="py-4 px-6">
                                        {seller.email}
                                    </td>
                                    <td class="py-4 px-6">
                                        <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit" >
                                            Unverified
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">
                                        <button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit" >
                                            Make admin
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">
                                        <button className='bg-red-600 text-white hover:bg-red-500 rounded-lg text-normal py-3 px-7' type="submit" >
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

export default AllSellers
