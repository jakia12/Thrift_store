import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthState } from '../context/AuthProvider'
import Spinner from '../components/spinner/Spinner';

const PrivateRoute = ({ children }) => {

    const { user, loading } = AuthState();

    //navigate user to the login page when not logged in 


    const location = useLocation();

    if (loading) {
        return <div><Spinner /></div>
    }

    if (user) {
        return children;

    }
    return <Navigate to="/login" state={{ from: location }} replace />




}

export default PrivateRoute
