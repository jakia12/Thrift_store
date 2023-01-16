import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import MyOrder from '../pages/dashboard/orders/MyOrder';
import SellerRoute from '../routes/SellerRoute';
import BuyerRoute from '../routes/BuyerRoute';
import PrivateRoute from '../routes/PrivateRoute';
import AddProduct from '../pages/dashboard/addProduct/AddProduct';
import AllUsers from '../pages/dashboard/allSellers/AllSellers';
import AllSellers from '../pages/dashboard/allSellers/AllSellers';
import AllBuyers from '../pages/dashboard/allBuyers/AllBuyers';
import AdminRoute from '../routes/AdminRoute'
import MyProduct from '../pages/dashboard/myProducts/MyProduct';
import CategoryDetails, { loader as categoryLoader } from '../pages/categoryDetails/CategoryDetails';
import ReportedProducts from '../pages/dashboard/reportedProducts/ReportedProducts';
import NotFound from '../pages/notFound/NotFound';
import Faq from "../pages/faq/Faq";
import Payment, { loader as paymentLoader } from '../pages/dashboard/payment/Payment';
import DislayError from '../components/displayError/DislayError';
import Overview from '../pages/dashboard/overview/Overview';



export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<Main />} errorElement={<DislayError />}>

            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<PrivateRoute><CategoryDetails /></PrivateRoute>} loader={categoryLoader} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />


        </Route>

        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} errorElement={<DislayError />}>
            <Route path="/dashboard" element={<PrivateRoute><Overview /></PrivateRoute>} />

            <Route path="/dashboard/myOrders" element={<BuyerRoute><MyOrder /></BuyerRoute>} />
            <Route path='/dashboard/payment/:id' element={<PrivateRoute>
                <Payment />
            </PrivateRoute>} loader={paymentLoader}>

            </Route>

            <Route path="/dashboard/addProducts" element={<SellerRoute><AddProduct /></SellerRoute>} />

            <Route path="/dashboard/myProducts" element={<SellerRoute><MyProduct /></SellerRoute>} />

            <Route path="/dashboard/allSellers" element={<AdminRoute><AllSellers /></AdminRoute>} />



            <Route path="/dashboard/allBuyers" element={<AdminRoute><AllBuyers /></AdminRoute>} />

            <Route path="/dashboard/reportedProducts" element={<AdminRoute><ReportedProducts /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />

        </Route>

    </>
));
