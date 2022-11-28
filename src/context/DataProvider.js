import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react'


const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [bookings, setBookings] = useState([])

    const [advertisedProducts, setAdvertisedProducts] = useState([]);

    const [users, setUsers] = useState([]);

    //fetch booking data
    useEffect(() => {
        fetch('http://localhost:5000/bookings')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBookings(data);

            })
            .catch(err => console.log(err))

    }, []);

    // fetch advertised data
    useEffect(() => {
        fetch('http://localhost:5000/advertisedProducts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAdvertisedProducts(data);

            })
            .catch(err => console.log(err))

    }, []);


    //fetch user data
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);

            })
            .catch(err => console.log(err))

    }, []);

    const getInfo = { bookings, advertisedProducts, users }
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