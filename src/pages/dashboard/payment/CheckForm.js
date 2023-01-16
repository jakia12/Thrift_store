import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../../components/spinner/Spinner';
import DataProvider from '../../../context/DataProvider';

const CheckForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    //get error

    const [cardError, setCardError] = useState('');
    console.log(booking);
    const { productName, resalePrice, userName, email, _id } = booking;
    //wait untill payment get processed
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    //display a success message
    const [success, setSuccess] = useState('');

    //display transaction id on the screen
    const [transactionId, setTransactionId] = useState(null);
    const [isClientSecreLoading, setIsClientSecretLoading] = useState(true);

    // const { isSaving, setIsSaving } = DataProvider();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://vendor-store-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.clientSecret);
                setClientSecret(data.clientSecret);
                // setIsClientSecretLoading(false)
            }
            )
            .catch(err => console.log(err)
            )
    }, [resalePrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
        }

        //confirm the payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: userName,
                    email: email
                },
            },
        });

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            const payment = {
                price: resalePrice,
                email: email,
                transactionId: paymentIntent.id,
                bookingId: _id,
            };

            //save the payment info
            fetch('https://vendor-store-server.vercel.app/payments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payment)
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {

                        setSuccess("Your payment is completed");
                        setTransactionId(paymentIntent.id);



                    }

                })
                .catch(err => console.log(err))

        };
    }

    //update booking payment info 
    const handlepay = () => {
        fetch(`https://vendor-store-server.vercel.app/booking/${_id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {

                    toast.success(`Wow!!! Payment is completed `, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: 'custom_payment',
                        autoClose: 1000
                    });


                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div >
            {/* <div className='text-center py-6'>
                {
                    isClientSecreLoading ? <Spinner /> : ''
                }
            </div> */}

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    type="submit"
                    className='btn btn-primary text-left px-6 mt-4'
                    disabled={!stripe || !clientSecret}
                    onClick={handlepay}
                >
                    Pay
                </button>
                <p className="text-red-500">{cardError}</p>
                <div className="tex-center py-5">
                    <p className="text-green-500">
                        {success}
                    </p>
                    <p className="py-5">
                        {transactionId}
                    </p>
                </div>
            </form>
        </div>
    )
}

export default CheckForm
