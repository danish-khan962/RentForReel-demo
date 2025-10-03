"use client"

import React from 'react'
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Link from 'next/link';

// Featured Listing Cards data
const featuredListingCardsData = [
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
    { image: "", pricePerHour: "1200", rating: 4.8, reviews: "230" },
]

const FeaturedListing = () => {

    // Rupee symbol
    const rupeeSymbol = "₹";

    return (
        <section className='max-w-[1440px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex justify-center items-center mt-[70px] sm:mt-[75px] md:mt-[80px] lg:mt-[85px]'>
            <div className='max-w-[1500px] w-full rounded-xl bg-[#EEEEEE] flex flex-col gap-y-[40px] sm:gap-y-[44px] md:gap-y-[48px] lg:gap-y-[52px] p-4 sm:p-10 md:p-12 lg:p-14'>

                {/* Heading and CTA button */}
                <div className='flex flex-col sm:flex-row gap-x-2.5 gap-y-4.5 justify-start items-start sm:justify-between sm:items-center'>
                    <div className='flex flex-col md:flex-row gap-x-6 gap-y-3'>
                        <p className='font-semibold text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px] capitalize'> Featured Listing </p>
                        {/* Filter Select */}
                        {/* <div className='flex flex-row flex-wrap gap-2'>
                            <p className='bg-[#BA181B] font-semibold text-[#FFFFFF] py-0.5 px-4 rounded-full text-[12px] md:text-[14px] flex justify-center items-center'> Mumbai </p>
                        </div> */}
                    </div>

                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <p className='text-[#2C2C2C] text-base md:text-[18px] lg:text-[20px]'> Feature your space </p>
                        <button className='p-1.5 sm:p-2 rounded-full bg-[#BA181B] cursor-pointer  transition-colors hover:rotate-[-15deg] ease-in-out duration-200 active:bg-[#2C2C2C]'>
                            <span className='text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-white'>
                                <Link href={"/"}>
                                    <HiMiniArrowLongRight />
                                </Link>
                            </span>
                        </button>
                    </div>
                </div>


                {/* Featured Listing Cards */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-2.5 sm:gap-x-4 gap-y-7'>
                    {
                        featuredListingCardsData.map((data, idx) => (
                            <Link href="/" key={idx} passHref>
                                <span className='max-w-[350px] w-full flex flex-col justify-start items-start text-start hover:rounded-t-4xl group hover:rounded-b-lg'>
                                    <div className='w-full h-[140px] sm:h-[160px] md:h-[170px] lg:h-[190px] bg-[#2C2C2C] rounded-4xl'></div>
                                    <h4 className='font-normal text-[15px] mt-[13.5px]'>
                                        {rupeeSymbol}{data.pricePerHour} / hour
                                    </h4>
                                    <p className='text-[#000000]/50 mt-[8px] sm:mt-[9.5px] text-[12.5px]'>
                                        {data.rating} <span className='ml-2'>({data.reviews} reviews)</span>
                                    </p>
                                </span>
                            </Link>
                        ))
                    }
                </div>


            </div>
        </section>
    )
}

export default FeaturedListing
