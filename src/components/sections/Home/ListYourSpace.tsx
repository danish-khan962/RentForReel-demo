"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const ListYourSpace = () => {

    // Rupee symbol
    const rupeeSymbol = "₹";

    // Slider state
    const [estimatedEarnings, setEstimatedEarnings] = useState(9600);

    // Slider change handler
    const handleSliderChange = (e: any) => {
        setEstimatedEarnings(e.target.value);
    };

    return (
        <section className='relative w-screen flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 mt-[140px] sm:mt-[160px] md:mt-[180px] lg:mt-[200px]'>
            <div className='max-w-[1600px] w-full rounded-xl bg-[#EEEEEE] flex flex-col md:flex-row p-8 sm:p-10 md:p-12 lg:p-14 gap-x-0 gap-y-10'>

                {/* Price Slider container */}
                <div className='flex flex-col justify-start items-start'>
                    <h2 className='font-semibold text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] text-[#000000] leading-[42px] sm:leading-[48px] md:leading-[55px] lg:leading-[62px]'>
                        List your space for creators, earn effortlessly.
                    </h2>

                    <p className='max-w-[600px] w-full text-base md:text-[18px] text-[20px] font-normal text-[#000000] leading-snug mt-[18px] sm:mt-[21px]'>
                        You could earn up to ₹XX,XXX/month renting your location for reels, shoots & collaborations.
                    </p>

                    <div className='flex flex-col mt-[30px] sm:mt-[37px]'>
                        <h1 className='font-semibold text-[90px] sm:text-[110px] md:text-[120px] lg:text-[132px]'>
                            {rupeeSymbol}{Number(estimatedEarnings).toLocaleString()}
                        </h1>

                        {/* Slider */}
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="100"
                            value={estimatedEarnings}
                            onChange={handleSliderChange}
                            className="custom-slider w-[350px] sm:w-[460px] mt-6"
                            style={{
                                background: `linear-gradient(to right, black 0%, black ${((
                                    (estimatedEarnings - 1000) /
                                    (50000 - 1000)
                                ) * 100).toFixed(2)}%, #D9D9D9 ${((
                                    (estimatedEarnings - 1000) /
                                    (50000 - 1000)
                                ) * 100).toFixed(2)}%, #D9D9D9 100%)`
                            }}
                        />


                        <p className='font-normal text-[20px] sm:text-22px] md:text-[23px] lg:text-[25px] mt-[25px] sm:mt-[28px] md:mt-[32px] lg:mt-[36px]'> <span className='font-semibold'> 5 days </span> at an estimated <span className='font-semibold'> ₹2,000/hour </span> </p>
                    </div>

                    <Link href={"/"} className='mt-[30px] sm:mt-[35px] md:mt-[42px] lg:mt-[52px]'>
                        <button className='w-[300px] sm:w-[350px] md:w-[450px] lg:w-[520px] h-[60px] sm:h-[70px] md:h-[85px] lg:h-[103px] bg-[#D9D9D9] rounded-full border border-[#929292] cursor-pointer font-medium text-base sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFFFFF] transition-colors ease-in-out duration-200 active:bg-[#2C2C2C] active:text-[#FFFFFF]'> List Your Space Now. </button>
                    </Link>
                </div>

                {/* Map placeholder */}
                <div className='w-[350px] sm:w-[600px] md:w-[725px] lg:w-[800px] h-[280px] sm:h-[510px] md:h-[650px] lg:h-[734px] bg-teal-600 rounded-4xl'>
                    {/* Map integration placeholder */}
                </div>

            </div>



            <style jsx>{`
                    .custom-slider {
                        -webkit-appearance: none;
                        width: 460px;
                        height: 8px;
                        background: #D9D9D9;
                        border-radius: 9999px;
                        outline: none;
                        position: relative;
                    }

                    @media (max-width:500px){
                        .custom-slider{
                            width: 350px;
                        }
                    }

                    .custom-slider::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: black;
                        cursor: pointer;
                        position: relative;
                        z-index: 3;
                        margin-top: -6px; /* aligns the thumb vertically */
                    }

                    .custom-slider::-moz-range-thumb {
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: black;
                        cursor: pointer;
                    }

                    .custom-slider::-webkit-slider-runnable-track {
                        height: 8px;
                        border-radius: 9999px;
                        background: #D9D9D9;
                        position: relative;
                        z-index: 1;
                    }

                    .custom-slider::-moz-range-track {
                        height: 8px;
                        border-radius: 9999px;
                        background: #D9D9D9;
                    }

                    .custom-slider::-moz-range-progress {
                        background: black;
                        height: 8px;
                        border-radius: 9999px;
                    }

                    .custom-slider::-ms-fill-lower {
                        background: black;
                        border-radius: 9999px;
                    }

                    .custom-slider::-ms-fill-upper {
                        background: #D9D9D9;
                        border-radius: 9999px;
                    }
                    `}</style>

        </section>
    );
};

export default ListYourSpace;
