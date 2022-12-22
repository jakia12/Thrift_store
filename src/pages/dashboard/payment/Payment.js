import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { DataState } from '../../../context/DataProvider'
import { getSingleBooking } from '../../../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import CheckForm from './CheckForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_API_KEY);
console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();

    //destructure the data from the booking
    const { productName, resalePrice, userName } = booking;


    return (
        <section className='py-14 lg:py-20'>
            <div className="container px-8">
                <h2 className='text-2xl capitalize font-medium py-4 text-darkBlack text-center'>Payment for {productName}</h2>
                <div className="py-10 w-96">
                    <Elements stripe={stripePromise}>
                        <CheckForm />
                    </Elements>
                </div>
            </div>
        </section>
    )
}

//call the single booking data function
export const loader = ({ params }) => {
    const uId = params.id;
    return getSingleBooking(uId);
};

export default Payment
