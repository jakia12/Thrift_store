import React from 'react'
import { AuthState } from '../../context/AuthProvider';

const BookingModal = ({ product }) => {
    //get the product info by destructuring
    const { resalePrice, location, name, mobile } = product;

    //get the logged in user name and email
    const { user } = AuthState();


    const handleSubmit = (e) => {

        e.preventDefault();

        const form = e.target;

        const userName = form.userName.value;
        const email = form.email.value;
        const resalePrice = form.resalePrice.value;
        const location = form.location.value;
        const mobile = form.mobile.value;

        const booking = {
            productName: name,
            userName,
            email,
            resalePrice,
            location,
            mobile
        }

        console.log(booking);

    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative w-11/12 max-w-xl">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className="text-2xl text-center py-2 font-semibold">Get {name} Now!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                        <div className="mb-1">

                            <input
                                type="text"
                                name="userName"

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={user?.displayName}
                                readOnly
                                disabled
                                required

                            />

                        </div>
                        <div className="mb-1">

                            <input
                                type="email"
                                name="email"

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={user?.email}
                                readOnly
                                disabled
                                required

                            />

                        </div>
                        <div className="mb-1">

                            <input
                                type="text"
                                name="resalePrice"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={resalePrice ? resalePrice : "No resale price available"}
                                readOnly
                                required
                                disabled
                            />
                        </div>

                        <div className="mb-1">

                            <input
                                type="text"
                                name="location"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={location ? location : "No location Available"}
                                readOnly
                                disabled
                                required
                            />

                        </div>
                        <div className="mb-1">

                            <input
                                type="text"
                                id="phone"
                                name="mobile"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={mobile ? mobile : "No mobile no available"}
                                readOnly
                                disabled
                                required
                            />

                        </div>

                        <button className='bg-firstCol text-white hover:bg-secondCol py-2 rounded-lg text-lg' type="submit" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingModal
