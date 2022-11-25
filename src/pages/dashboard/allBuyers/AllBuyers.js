import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'


const AllBuyers = () => {

    const [buyerQuery, setBuyerQuery] = useState('buyer');

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?userType=${buyerQuery}`);
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
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Verify
                            </th>

                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer) => (
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {buyer.name}
                                    </th>
                                    <td class="py-4 px-6">
                                        {buyer.email}
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

export default AllBuyers
