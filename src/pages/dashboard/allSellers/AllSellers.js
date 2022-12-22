import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import { AuthState } from '../../../context/AuthProvider';

import { DataState } from '../../../context/DataProvider';


const AllSellers = () => {

    const { user } = AuthState();

    //get all the sellers data

    const { verifiedSellers } = DataState();
    console.log(verifiedSellers);

    //save the seller data to delete 
    const [deletedUser, setDeletedUser] = useState(null);

    const [sellerQuery, setSellerQuery] = useState('seller');

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`https://vendor-store-server.vercel.app/users?userType=${sellerQuery}`);
            const data = await res.json();
            return data;
        }
    });

    //pass the seller data when clicking 

    const handleShow = (seller) => {
        setDeletedUser(seller);
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
                    setDeletedUser(null);
                    refetch();
                    // const remainingSellers = sellers.filter((seller) => seller._id !== deletedUser._id);
                    // setSellers(remainingSellers);


                }


            })
            .catch(err => console.log(err))

    }


    //make admin

    const handleMakeAdmin = (seller) => {
        fetch(`https://vendor-store-server.vercel.app/users/admin/${seller._id}`, {
            method: 'PUT',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {

                    toast.success(`Admin is created successfully `, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });
                    refetch();

                }
            })
            .catch(err => console.log(err))
    }


    //verify the seller


    const handleVerifySeller = (seller) => {

        //update the seller data to verify seller

        fetch(`https://vendor-store-server.vercel.app/users/verified/${seller._id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success(`Seller is verified successfully`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId1,
                        autoClose: 1000
                    });
                    refetch();
                }
            })

        //create a new verified seller data
        const verifiedSeller = {
            name: seller.name,
            email: seller.email
        }

        console.log(verifiedSeller);
        fetch('https://vendor-store-server.vercel.app/users/verifiedSellers', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(verifiedSeller)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
            .catch(err => console.log(err))
    }


    return (
        <section className='py-8 ml-2'>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-4">
                                Product name
                            </th>
                            <th scope="col" class="py-3 px-4">
                                Email
                            </th>
                            <th scope="col" class="py-3 px-4">
                                Verification status
                            </th>
                            <th scope="col" class="py-3 px-4">
                                Make Admin
                            </th>
                            <th scope="col" class="py-3 px-4">
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
                                    <td class="py-4 px-6 text-darkBlack text-normal">
                                        {seller.email}
                                    </td>
                                    <td class="py-4 px-6">
                                        {
                                            seller.verificationStatus === "Verified" ?
                                                <button
                                                    className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7'

                                                >
                                                    Verified
                                                </button>
                                                :
                                                <button
                                                    className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit"
                                                    onClick={() => handleVerifySeller(seller)}
                                                >
                                                    Verify
                                                </button>

                                        }


                                        {/* {
                                            seller.verificationStatus === 'Verified' ? (
                                                <button className='flex items-center bg-white   border-2 border-blue-700 text-blue-700 py-2.5 px-7 rounded-lg '>
                                                    Verified

                                                </button>
                                            ) :
                                                
                                        } */}

                                    </td>
                                    <td class="py-4 px-6">
                                        {seller?.role !== "admin" ? (<button className='bg-lightBlue text-white hover:bg-blue-800 rounded-lg text-normal py-3 px-7' type="submit"

                                            onClick={() => handleMakeAdmin(seller)}
                                        >
                                            Make admin
                                        </button>) : ""}
                                    </td>
                                    <td class="py-4 px-6">


                                        <label
                                            htmlFor="my-modal-3"
                                            className="bg-firstCol text-white hover:bg-secondCol rounded-lg text-normal py-3 px-7"
                                            onClick={() => handleShow(seller)}
                                        >Delete</label>

                                        {/* Put this part before </body> tag */}
                                        {
                                            deletedUser && (
                                                <DeleteModal
                                                    handleDelete={handleDelete}
                                                    deletedUser={deletedUser}

                                                    setDeletedUser={setDeletedUser}
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

export default AllSellers
