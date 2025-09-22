"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
});

const ListYourSpace = () => {
    const rupeeSymbol = "₹";
    const [estimatedEarnings, setEstimatedEarnings] = useState(9600);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstimatedEarnings(Number(e.target.value));
    };

    const sliderPercentage = ((estimatedEarnings - 1000) / (50000 - 1000)) * 100;
    const sliderBackground = `linear-gradient(to right, black 0%, black ${sliderPercentage.toFixed(2)}%, #D9D9D9 ${sliderPercentage.toFixed(2)}%, #D9D9D9 100%)`;

    return (
        <section className='max-w-[1500px] w-full mx-auto relative flex justify-center items-center px-4 sm:px-6 md:px-8 mt-[140px] sm:mt-[160px] md:mt-[180px] lg:mt-[200px]'>
            <div className='max-w-[1600px] w-full rounded-xl bg-[#EEEEEE] flex flex-col xl:flex-row p-5 sm:p-8 md:p-12 lg:p-14 gap-x-0 gap-y-10'>

                {/* Pricing Section */}
                <div className='flex flex-col justify-start items-start'>
                    <h2 className='font-semibold text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] text-[#000000] leading-[42px] sm:leading-[48px] md:leading-[55px] lg:leading-[62px]'>
                        List your space for creators, earn effortlessly.
                    </h2>

                    <p className='max-w-[600px] w-full text-base md:text-[18px] text-[20px] font-normal text-[#000000] leading-snug mt-[18px] sm:mt-[21px]'>
                        You could earn up to ₹XX,XXX/month renting your location for reels, shoots & collaborations.
                    </p>

                    <div className='flex flex-col mt-[30px] sm:mt-[37px]'>
                        <h1 className='font-semibold text-[68px] sm:text-[94px] md:text-[112px] lg:text-[122px]'>
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
                            style={{ background: sliderBackground }}
                            disabled
                        />

                        <p className='font-normal text-base sm:text-[22px] md:text-[23px] lg:text-[25px] mt-[25px] sm:mt-[28px] md:mt-[32px] lg:mt-[36px]'>
                            <span className='font-semibold'>5 days</span> at an estimated <span className='font-semibold'>₹2,000/hour</span>
                        </p>
                    </div>

                    <Link href={"/"} className='mt-[30px] sm:mt-[35px] md:mt-[42px] lg:mt-[52px]'>
                        <button className='w-[288px] h-[55px] sm:w-[450px] sm:h-[70px] lg:w-[500px] lg:h-[75px] bg-[#D9D9D9] rounded-full border border-[#929292] cursor-pointer font-medium text-base sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFFFFF] transition-colors ease-in-out duration-200 active:bg-[#2C2C2C] active:text-[#FFFFFF]'>
                            List Your Space Now.
                        </button>
                    </Link>
                </div>

                {/* Map Section */}
                <div className='max-w-[1100px] w-full xl:w-[960px] h-[280px] sm:h-[510px] md:h-[650px] lg:h-[734px] rounded-4xl mt-8'>
                    <MapView />
                </div>
            </div>

            {/* Slider Styles */}
            <style jsx>{`
                .custom-slider {
                    -webkit-appearance: none;
                    width: 460px;
                    height: 8px;
                    background: #D9D9D9;
                    border-radius: 9999px;
                    outline: none;
                }
                @media (max-width: 500px) {
                    .custom-slider {
                        width: 350px;
                    }
                }
                @media (max-width: 400px) {
                    .custom-slider {
                        width: 285px;
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
                    margin-top: -6px;
                }
                .custom-slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                }
                .custom-slider::-webkit-slider-runnable-track,
                .custom-slider::-moz-range-track,
                .custom-slider::-moz-range-progress,
                .custom-slider::-ms-fill-lower,
                .custom-slider::-ms-fill-upper {
                    height: 8px;
                    border-radius: 9999px;
                    background: #D9D9D9;
                }
                .custom-slider::-moz-range-progress {
                    background: black;
                }
                .custom-slider::-ms-fill-lower {
                    background: black;
                }
            `}</style>
        </section>
    );
};

export default ListYourSpace;
