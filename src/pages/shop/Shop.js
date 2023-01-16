import React, { useEffect, useState } from 'react'
import SingleProductCard from '../../components/singleProductCard/SingleProductCard';
import { DataState } from '../../context/DataProvider'
import Spinner from '../../components/spinner/Spinner';
import { RiCloseCircleLine } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import "./Shop.css";

const Shop = () => {
    //get all the products data from the data state
    const { isLoading } = DataState();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState();
    const [size, setSize] = useState(7);



    const [currentPage, setCurrentPage] = React.useState(0);
    let maxPages = Math.ceil(count / size);
    let items = [];
    let leftSide = currentPage - 2;
    if (leftSide <= 0) leftSide = 1;
    let rightSide = currentPage + 2;
    if (rightSide > maxPages) rightSide = maxPages;
    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <button key={number}
                className={(number === currentPage ? 'round_effect active' : 'round_effect')}
                style={{ cursor: number === maxPages ? "not-allowed" : "pointer" }}
                disabled={number === maxPages ? true : false}
                onClick={() => { setCurrentPage(number) }}
            >
                {number}
            </button>,
        );
    }
    const nextPage = () => {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1)
        } else if (currentPage === maxPages) {
            return
        }
    }

    const prevPage = () => {
        if (currentPage >= 0) {
            setCurrentPage(currentPage - 1)
        } else if (currentPage === 0) {
            setCurrentPage(currentPage)
        }
    }

    //fetch the api
    useEffect(() => {
        const url = `https://vendor-store-server.vercel.app/products/pagination?page=${currentPage}&size=${size}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [currentPage, size])

    //set search state
    const [search, setSearch] = useState('');

    //display the close btn on handlechange
    const [show, setShow] = useState(false);

    const [filtered, setFiltered] = useState([]);

    //filter the data on input change
    const handleChange = (e) => {
        setSearch(e.target.value);
        setShow(true);


    }

    // const handleBlur = () => {
    //     setShow(false);
    // }
    //clear the form
    const handleClear = () => {
        setSearch('');
        setShow(false);

    }

    useEffect(() => {
        const results = products.filter((product) => {
            return product.name.toLowerCase().includes(search.toLocaleLowerCase());
        });

        setFiltered(results);
    }, [products, search]);


    return (

        <>
            {/* search bar */}
            <section className="pt-16 ">
                <div className="container mx-auto px-7 md:max-w-7xl">
                    <div className="relative text-center w-full md:max-w-xl mx-auto">
                        <input
                            type="text"
                            className='w-full bg-white border-2 border-gray-900 rounded-full pl-12 '
                            value={search}
                            onChange={handleChange}
                            onFocus=""
                            onBlur={''}
                            placeholder="Search here..."
                        />
                        <span className="absolute top-3 left-5 text-xl">

                            < BiSearch />
                        </span>
                        {
                            show ?
                                (<button
                                    className="absolute top-2.5 right-5 text-2xl text-gray-800"
                                    onClick={handleClear}
                                >

                                    < RiCloseCircleLine />
                                </button>)
                                :
                                ""
                        }
                    </div>
                </div>
            </section>
            {/* loading spinner  */}
            <div className='py-10' style={{ display: isLoading ? "block" : "none" }}>
                <Spinner />
            </div>

            {currentPage === maxPages ?

                (<section className='py-14 '>
                    <div className="container mx-auto w-full max-w-6xl px-6">
                        <h1 className="text-5xl text-semibold text-center py-20">No More Products</h1>
                    </div>
                </section>)
                :
                search === "" ?
                    (
                        <section className='py-14'>
                            <div className="container mx-auto w-full max-w-6xl px-6">
                                <div className="flex flex-wrap">
                                    {
                                        products.map((product) => (
                                            <div className="sm:w-6/12 md:w-4/12 xs:mx-auto sm:mx-0">
                                                <SingleProductCard
                                                    key={product._id}
                                                    product={product}
                                                />
                                            </div>
                                        ))


                                    }
                                </div>
                            </div>
                        </section>
                    )
                    :


                    filtered.length > 0 ?
                        (<section className='py-14'>
                            <div className="container mx-auto w-full max-w-6xl px-6">
                                <div className="flex flex-wrap">
                                    {
                                        filtered.map((product) => (
                                            <div className="sm:w-6/12 md:w-4/12 xs:mx-auto sm:mx-0">
                                                <SingleProductCard
                                                    key={product._id}
                                                    product={product}
                                                />
                                            </div>
                                        ))


                                    }
                                </div>
                            </div>
                        </section >)
                        :
                        (
                            <section className='text-center py-20'>
                                <h2 className="text-3xl font-medium text-dark ">
                                    Sorry!! No Matches Found
                                </h2>
                            </section>
                        )








            }

            {/* pagination section  */}
            <section className="pt-10 pb-16">
                <div className="container mx-auto md:max-w-6xl px-6">
                    <div className="flex justify-center items-center flex-col">


                        <div className="flex">
                            <button
                                className="round_effect arrow_btn"
                                style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
                                disabled={currentPage === 0 ? true : false}
                                onClick={prevPage}> &lsaquo; </button>
                            {items}
                            <button
                                className="round_effect arrow_btn"
                                style={{ cursor: currentPage === maxPages ? "not-allowed" : "pointer" }}
                                disabled={currentPage === maxPages ? true : false}
                                onClick={nextPage}> &rsaquo; </button>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Shop
