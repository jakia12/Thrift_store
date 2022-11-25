import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthState } from '../context/AuthProvider'
import useAdmin from '../hooks/useAdmin';
import Spinner from '../components/spinner/Spinner';
import useBuyer from '../hooks/useBuyer';

const BuyerRoute = ({ children }) => {

    const { user, loading } = AuthState();

    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);


    //navigate user to the login page when not logged in 


    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <div><Spinner /></div>
    }

    if (user && isBuyer) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;



}

export default BuyerRoute
