import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [bookings, setBookings] = useState([])

    const [advertisedProducts, setAdvertisedProducts] = useState([]);

    const [users, setUsers] = useState([]);

    //fetch booking data
    useEffect(() => {
        fetch('https://vendor-store-server.vercel.app/bookings')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setBookings(data);

            })
            .catch(err => console.log(err))

    }, []);

    // fetch advertised data
    useEffect(() => {
        fetch('https://vendor-store-server.vercel.app/advertisedProducts',

        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAdvertisedProducts(data);

            })
            .catch(err => console.log(err))

    }, []);


    //fetch user data
    useEffect(() => {
        // fetch('http://localhost:5000/users')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setUsers(data);

        //     })

        axios.get('https://vendor-store-server.vercel.app/users')
            .then((response) => {
                setUsers(response.data);
            })

            .catch(err => console.log(err))

    }, []);


    //fetch seller data

    //set query state
    const [sellerQuery, setSellerQuery] = useState('seller');

    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        axios.get(`https://vendor-store-server.vercel.app/users?userType=${sellerQuery}`)
            .then((response) => {
                setSellers(response.data);
                console.log(sellers);
            })

            .catch(err => console.log(err))

    }, []);



    const getInfo = { bookings, advertisedProducts, users, sellers, setSellers }
    return (
        <DataContext.Provider value={getInfo}>
            {children}
        </DataContext.Provider>
    )
}

export const DataState = () => {
    return useContext(DataContext);
}
export default DataProvider
