import React from 'react'
import { siteDatas, siteFeatures, topCategories } from '../../../data/PlaceholderData'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Overview = () => {
    const data = [
        {
            name: "1",
            uv: 400,
            pv: 240,
            amt: 240
        },
        {
            name: "2",
            uv: 300,
            pv: 398,
            amt: 221
        },
        {
            name: "3",
            uv: 200,
            pv: 980,
            amt: 229
        },
        {
            name: "4",
            uv: 278,
            pv: 390,
            amt: 200
        },
        {
            name: "5",
            uv: 890,
            pv: 480,
            amt: 218
        },
        {
            name: "5",
            uv: 239,
            pv: 380,
            amt: 250
        },
        {
            name: "6",
            uv: 349,
            pv: 430,
            amt: 210
        }
    ];

    return (
        <section className='py-12 bg-blue-50'>
            <div className="px-9">
                {/* site data */}
                <div className="flex items-center md:flex-nowrap flex-wrap">
                    {
                        siteDatas.map((siteData) => (
                            <div className=" w-full sm:w-6/12 md:w-3/12" key={siteData.id}>
                                <div className="shadow-lg shadow-gray-300 m-3 p-7 bg-white rounded-lg">
                                    <h3 className="text-lg text-gray-500 font-medium">{siteData.title}</h3>
                                    <h1 className="text-3xl font-bold text-dark my-2">{siteData.amount}</h1>
                                    <p className="text-gray-500 text-sm sm:text-xs font-normal">21% more than last month</p>
                                </div>
                            </div>
                        ))
                    }

                </div>

                {/* site features */}
                <div className="flex items-center flex-wrap md:flex-nowrap py-8">
                    {
                        siteFeatures.map((feature) => (
                            <div className="w-full sm:w-6/12 md:w-3/12">
                                <div className={`shadow-lg shadow-gray-300 m-3 px-5 py-7 bg-white border-l-8 ${feature.borderColor}`}>
                                    <h2 className="text-base text-gray-700 font-medium">{feature.name}</h2>
                                </div>
                            </div>
                        ))
                    }

                </div>

                {/* top categories for overview */}
                <div className="flex items-center flex-wrap md:flex-nowrap">

                    <div className=" w-full md:w-5/12">

                        <div class="relative overflow-x-auto bg-white rounded shadow-lg shadow-gray-300 m-3 ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 pb-4">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>
                                        <th scope="col" class="px-6 py-5">
                                            Top 5 Categories | This Month
                                        </th>
                                        <th scope="col" class="px-6 py-5">
                                            Total
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        topCategories.map((category) => (

                                            <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700" key={category.id}>

                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {category.categoryName}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {category.total}
                                                </td>

                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className=" w-full md:w-7/12">
                        <div className="bg-white rounded shadow-lg shadow-gray-300 pt-6 pb-8">
                            <div style={{ width: '100%', height: 250 }}>
                                <div className="flex justify-between px-4">
                                    <h3 className="font-semibold text-2xl text-dark pb-3 ">
                                        Order Graph
                                    </h3>
                                    <div className='flex items-center '>
                                        <div className="w-4 h-4 rounded-full bg-teal-400 m-3" title='Last 24 Hour'></div>
                                        <div className="w-4 h-4 rounded-full bg-pink-600 m-3" title='Last 24 Hour'></div>
                                        <div className="w-4 h-4 rounded-full bg-indigo-900 m-3" title='Last 24 Hour'></div>
                                    </div>
                                </div>
                                <ResponsiveContainer>
                                    <AreaChart
                                        width={600}
                                        height={250}
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stackId="1" stroke="#2dd4bf" fill="#2dd4bf" />
                                        <Area type="monotone" dataKey="pv" stackId="1" stroke="#db2777" fill="#db2777" />
                                        <Area type="monotone" dataKey="amt" stackId="1" stroke="#312e81" fill="#312e81" />

                                    </AreaChart>
                                </ResponsiveContainer>

                            </div>

                        </div>



                    </div>

                </div>

            </div>
        </section>
    )
}

export default Overview

