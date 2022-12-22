import React from 'react'
import './FeatureBox.css';

const FeatureBox = ({ box }) => {

    const { title, Icon, subtitle } = box;

    return (
        <div className='sm:6/12 md:4/12 xs:mx-auto sm:mx-0'>
            <div className=" rounded-lg shadow-xl border border-gray-100 shadow-gray-100 p-10 text-center m-3 sm:mb-3">
                <div className=" feature_icon flex justify-center items-center">

                    <Icon />

                </div>
                <div className="py-6">
                    <h3 className="font-medium text-lg mb-3 text-gray-900">
                        {title}
                    </h3>
                    <p className="text-gray-700 font-base">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FeatureBox
