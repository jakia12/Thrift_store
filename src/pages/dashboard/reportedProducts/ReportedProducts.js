import { useQuery } from '@tanstack/react-query';
import React from 'react'

const ReportedProducts = () => {

    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/reportedProducts');
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
        fetch(`http://localhost:5000/reportedProducts/${product._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    // toast.success(`Wow!!! ${deletedUser.name} deleted successfully `, {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     toastId: customId1,
                    //     autoClose: 1000
                    // });

                    alert('Reported item is deleted successfully');
                    refetch()
                }


            })
            .catch(err => console.log(err))

    }
    return (
        <div>
            <section className='py-8 ml-2'>

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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {reportedProducts?.map((product) => (
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="py-4 px-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={product.image} alt="" className="rounded-lg w-20 h-20" />
                                    </th>
                                    <td class="py-4 px-5 text-darkBlack text-normal">
                                        {product.productName}
                                    </td>
                                    <td class="py-4 px-5">
                                        {product.resalePrice}
                                    </td>


                                    <td class="py-4 px-5">


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
        </div>
    )
}

export default ReportedProducts
