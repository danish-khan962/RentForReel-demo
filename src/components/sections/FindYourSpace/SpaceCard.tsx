"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const spaceCardData = [
    {
        id: 1,
        title: "Crazy Boho Studio",
        location: "Bandra, Mumbai",
        rating: 4.8,
        reviews: 22,
        price: 1000,
        imageSet: [
            "/FindYourSpace/space-bg-1.jpg",
            "/FindYourSpace/space-bg-2.jpg",
            "/FindYourSpace/space-bg-3.jpg"
        ]
    },
    // You can add more space objects here
]

const SpaceCard = () => {
    return (
        <>
            {spaceCardData.map((space) => (
                <div className='max-w-[620px] w-full h-full bg-[#D9D9D94D] rounded-4xl' key={space.id}>

                    <Link href={`/find-your-space/${space.id}`}>
                        <div className='w-full h-[243px]'>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation
                                loop={true}
                                className='h-full rounded-4xl'
                            >
                                {space.imageSet.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={img}
                                            alt={space.title}
                                            width={1000}
                                            height={243}
                                            className='w-full h-[243px] object-cover rounded-4xl'
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </Link>

                    <div className='flex flex-row justify-between px-3 pt-3 pb-4'>
                        <div className='flex flex-col'>
                            <p className='capitalize text-[12px] sm:text-[14px] md:text-[14.5px] lg:text-base font-semibold'> {space.title} </p>
                            <p className='capitalize font-normal text-[12px] sm:text-[13.5px] mt-[7px]'> {space.location} </p>
                            <p className=' font-normal text-[12px] sm:text-[13.5px]'> {space.rating} <span> ({space.reviews} reviews) </span> </p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='font-semibold text-[15px] sm:text-base'> ₹{space.price}/hour </p>
                            <Link href={"/contact"} className='mt-[10px]'>
                                <button className='bg-[#BA181B] font-semibold text-[13px] sm:text-[14px] py-1.5 px-3 rounded-full text-[#FFFFFF] cursor-pointer hover:scale-105 transition-all ease-in-out duration-200'> Contact </button>
                            </Link>
                        </div>
                    </div>

                </div>
            ))}


            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    font-weight: bold;
                    color: white !important;
                    --swiper-navigation-size: 22px !important;
                }
            `}</style>
        </>
    )
}

export default SpaceCard
