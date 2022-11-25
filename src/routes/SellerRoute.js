import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthState } from '../context/AuthProvider'

import Spinner from '../components/spinner/Spinner';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {

    const { user, loading } = AuthState();

    const [isSeller, isSellerLoading] = useSeller(user?.email);


    //navigate user to the login page when not logged in 


    const location = useLocation();

    if (loading || isSellerLoading) {
        return <div><Spinner /></div>
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;


    return (
        <div>

        </div>
    )
}

export default SellerRoute
