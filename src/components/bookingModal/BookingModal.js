import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthProvider';

const BookingModal = ({ productInfo, setProductInfo, }) => {
    //get the product info by destructuring

    console.log(productInfo);
    const { resalePrice, image, location, name, mobile } = productInfo;

    //get the logged in user name and email
    const { user } = AuthState();

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        const form = e.target;

        const userName = form.userName.value;
        const email = form.email.value;
        const resalePrice = form.resalePrice.value;
        const location = form.location.value;
        const mobile = form.mobile.value;

        const booking = {
            productName: name ? name : "Not available",
            productImage: image ? image : "Not available",
            userName,
            email,
            resalePrice,
            location,
            mobile
        }

        console.log(booking);

        //create booking data and send it to the server
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Your product booked successfully');
                    setProductInfo(null);


                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative w-11/12 max-w-xl">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className="text-2xl text-center py-3 font-semibold">Get {name} Now!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                        <div className="mb-1">

                            <input
                                type="text"
                                name="userName"

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={user ? user.displayName : "Unauthourized "}
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
                                defaultValue={user ? user.email : "Unauthourized "}
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
