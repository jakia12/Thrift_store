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
import AddProduct from '../pages/dashboard/addProduct/AddProduct';
import AllUsers from '../pages/dashboard/allSellers/AllSellers';
import AllSellers from '../pages/dashboard/allSellers/AllSellers';
import AllBuyers from '../pages/dashboard/allBuyers/AllBuyers';



export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<Main />}>

            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<BuyerRoute><MyOrder /></BuyerRoute>} />
            <Route path="/dashboard/addProduct" element={<SellerRoute><AddProduct /></SellerRoute>} />
            <Route path="/dashboard/allSellers" element={<AllSellers />} />
            <Route path="/dashboard/allBuyers" element={<AllBuyers />} />

        </Route>
    </>
));
