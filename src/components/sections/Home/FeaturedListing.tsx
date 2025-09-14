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
        <section className='relative w-screen px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center mt-[70px] sm:mt-[75px] md:mt-[80px] lg:mt-[100px]'>
            <div className='max-w-[1600px] w-full rounded-xl bg-[#EEEEEE] flex flex-col gap-y-[40px] sm:gap-y-[44px] md:gap-y-[48px] lg:gap-y-[52px] p-8 sm:p-10 md:p-12 lg:p-14'>

                {/* Heading and CTA button */}
                <div className='flex flex-col sm:flex-row gap-2.5 justify-start items-start sm:justify-between sm:items-center'>
                    <p className='font-semibold text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px] capitalize'> Featured Listing </p>

                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <p className='text-[#2C2C2C] text-base md:text-[18px] lg:text-[20px]'> Feature your space </p>
                        <button className='p-2 sm:p-3 rounded-full bg-[#BA181B] cursor-pointer hover:bg-[#2C2C2C] transition-colors ease-in-out duration-200'>
                            <span className='text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-white'>
                                <Link href={"/"}>
                                    <HiMiniArrowLongRight />
                                </Link>
                            </span>
                        </button>
                    </div>
                </div>


                {/* Featured Listing Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6'>
                    {
                        featuredListingCardsData.map((data, idx) => (
                            <div className='max-w-[350px] w-full flex flex-col justify-start items-start text-start' key={idx}>
                                <div className='w-full h-[220px] bg-[#2C2C2C] rounded-4xl'> </div>
                                <h4 className='font-normal text-[14px] sm:text-[15px] mt-[13.5px]'> {rupeeSymbol}{data.pricePerHour} / hour </h4>
                                <p className='text-[#000000]/50 mt-[8px] sm:mt-[9.5px] text-[11px] sm:text-[12.5px]'> {data.rating} <span> ({data.reviews}) reviews </span> </p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default FeaturedListing
