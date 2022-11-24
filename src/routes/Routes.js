import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';


export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Main />}>

        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />

    </Route>
));
