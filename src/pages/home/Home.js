import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import './Home.css';

const Home = () => {
    let uniqueIds = [];
    const [categoryArr, setCategoryArr] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setCategoryArr(data);
                setLoading(false);

            })
            .catch(err => console.log(err))
    }, [categoryArr]);

    console.log(categoryArr)



    const unique = categoryArr.filter((element) => {

        const isDuplicate = uniqueIds.includes(element.categoryId);

        if (!isDuplicate) {
            uniqueIds.push(element.categoryId);

            return true

        }


    });


    return (
        <section className='py-14 lg:py-20'>
            <div className="container mx-auto w-full lg:max-w-6xl ">
                <div className="text-center pb-8">
                    <h2 className="text-3xl font-medium text-darkBlack">
                        Product Categories
                    </h2>
                    <div className="bg-firstCol w-20 h-1 mx-auto mt-4"></div>
                </div>

                {/* product category column */}
                {loading ? <Spinner /> : ""}
                <div className="flex flex-wrap">
                    {
                        unique ? (unique.map((category) => (
                            <div className="sm:w-6/12 md:w-3/12" key={category.id}>
                                <div className="m-3 relative overlay rounded">
                                    <img src={category.image} alt="" className="w-full rounded" />
                                    <div className="absolute top-24 left-10 cat_content">
                                        <h3 className="text-lg font-medium text-white py-2">
                                            {category.categoryName}
                                        </h3>
                                        <Link to={`/category/${category.categoryId}`}>
                                            <button className='bg-firstCol text-white hover:bg-secondCol rounded-lg text-sm py-2.5 px-6' type="submit" >
                                                Buy Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))) : ""


                    }

                </div>
            </div>
        </section>
    )
}

export default Home
