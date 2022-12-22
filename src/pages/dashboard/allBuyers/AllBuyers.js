import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DeleteModal from '../../../components/deleteModal/DeleteModal';


const AllBuyers = () => {
    //save the seller data to delete 
    const [deletedUser, setDeletedUser] = useState(null);

    const [buyerQuery, setBuyerQuery] = useState('buyer');

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`https://vendor-store-server.vercel.app/users?userType=${buyerQuery}`);
            const data = await res.json();
            return data;
        }
    });

    const handleShow = (buyer) => {
        setDeletedUser(buyer);
    }

    //react toastify
    const customId1 = "custom-id-yes";
    const customId2 = "custom-id-no";
    const handleDelete = () => {

        fetch(`https://vendor-store-server.vercel.app/users/${deletedUser._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Wow!!! ${deletedUser.name} deleted successfully `, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });

                    refetch()
                }


            })
            .catch(err => console.log(err))

    }


    const handleMakeAdmin = (buyer) => {
        fetch(`https://vendor-store-server.vercel.app/users/admin/${buyer._id}`, {
            method: 'PUT',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success(`Wow!!! Admin created successfully`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });


                    refetch();
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <section className='py-8 ml-2'>

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
                                Make Admin
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
                                    <th scope="row" class="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {buyer.name}
                                    </th>
                                    <td class="py-4 px-4 text-darkBlack text-normal">
                                        {buyer.email}
                                    </td>

                                    <td class="py-4 px-4">
                                        {buyer?.role !== "admin" ? (<button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit"

                                            onClick={() => handleMakeAdmin(buyer)}
                                        >
                                            Make admin
                                        </button>) : ""}
                                    </td>
                                    <td class="py-4 px-4">
                                        <label
                                            htmlFor="my-modal-3"
                                            className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-normal py-3 px-7"
                                            onClick={() => handleShow(buyer)}
                                        >Delete</label>

                                        {/* Put this part before </body> tag */}
                                        {
                                            deletedUser && (
                                                <DeleteModal
                                                    handleDelete={handleDelete}
                                                    deletedUser={deletedUser}
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

        </section>
    )
}

export default AllBuyers
