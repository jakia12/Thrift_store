import React from 'react'
import { Link } from 'react-router-dom';
import './PromoBannerCard.css';

const PromoBannerCard = ({ banner }) => {
    const { image, title, subtitle, btnBorder } = banner;
    return (
        <div className='sm:6/12 md:4/12 xs:mx-auto sm:mx-0 '>
            <div className="shadow border m-2 rounded sm:mb-3">
                <div className="promo_card m-3 rounded overflow" style={{
                    background: `linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)),url(${image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>

                    <div className="">
                        <h3 className="text-white font-medium text-xl pb-4">
                            {title}
                        </h3>
                        <p className='pb-5 text-gray-200 font-normal '>{subtitle}</p>
                        <Link to="/shop">
                            <button
                                className="py-2.5 hover:bg-secondCol text-small  hover:text-white px-6  bg-firstCol text-white rounded-lg">{btnBorder}</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoBannerCard
