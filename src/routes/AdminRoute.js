import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthState } from '../context/AuthProvider'
import useAdmin from '../hooks/useAdmin';
import Spinner from '../components/spinner/Spinner';

const AdminRoute = ({ children }) => {

    const { user, loading } = AuthState();

    const [isAdmin, isAdminLoading] = useAdmin(user?.email);


    //navigate user to the login page when not logged in 


    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div><Spinner /></div>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;


    return (
        <div>

        </div>
    )
}

export default AdminRoute
