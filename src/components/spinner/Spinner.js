import React, { useState } from 'react'
import './Spinner.css';

import { AuthState } from '../../context/AuthProvider';

const Spinner = () => {
    const { loading } = AuthState();


    return (

        <div className={`text-center  sweet-loading ${(loading ? "block py-12" : "none")}`}>

            <div class="loader--spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    )
}

export default Spinner
