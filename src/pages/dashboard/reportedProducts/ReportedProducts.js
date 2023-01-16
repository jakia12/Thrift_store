import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'react-toastify';
import Spinner from '../../../components/spinner/Spinner';

const ReportedProducts = () => {

    const { data: reportedProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://vendor-store-server.vercel.app/reportedProducts');
                const data = await res.json();
                return data;
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    //delete the reported products

    const handleDelete = (product) => {
        console.log(product);

        //delete reported items from the database
        fetch(`https://vendor-store-server.vercel.app/reportedProducts/${product.productId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Reported item is deleted successfully`, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: "deleted_item",
                        autoClose: 1000
                    });


                    refetch()
                }


            })
            .catch(err => console.log(err))

        //update reported item to make change on the ui
        fetch(`https://vendor-store-server.vercel.app/reportedProducts/${product._id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })

    }
    return (
        <div>
            <section className='py-8 ml-2'>
                <div className={`py-10 ${(isLoading ? "block" : "hidden")}`}>
                    <Spinner />
                </div>
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg p-7">
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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {reportedProducts?.map((product) => {
                                if (product.isDeleted === true) {
                                    return "";
                                } else {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img src={product.image} alt="" className="rounded-lg w-20 h-20" />
                                            </th>
                                            <td class="py-4 px-5 text-darkBlack text-normal">
                                                {product.productName}
                                            </td>
                                            <td class="py-4 px-5">
                                                ${product.resalePrice}
                                            </td>


                                            <td class="py-4 px-5">


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
                                    )
                                }
                            }


                            )}



                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    )
}

export default ReportedProducts
