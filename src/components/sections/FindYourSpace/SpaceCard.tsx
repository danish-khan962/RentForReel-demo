'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface Space {
  id: string | number
  nameOfSpace: string 
  city: string
  state: string
  images: string[]
  priceHour: number
  // You can extend this interface with other properties if needed
}

interface SpaceCardProps {
  space?: Space | null // allow undefined or null to avoid crash
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  if (!space) {
    // Render nothing or a fallback UI if space is not provided
    return null
  }

  return (
    <div className='max-w-[620px] w-full h-full bg-[#D9D9D94D] rounded-4xl'>
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
            {space.images.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={space.nameOfSpace}
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
          <p className='capitalize text-[12px] sm:text-[14px] md:text-[14.5px] lg:text-base font-semibold'>
            {space.nameOfSpace}
          </p>
          <p className='capitalize font-normal text-[12px] sm:text-[13.5px] mt-[7px]'>
            {space.city}, {space.state}
          </p>

          {/* Rating */}
          {/* <p>

          </p> */}
        </div>

        <div className='flex flex-col'>
          <p className='font-semibold text-[15px] sm:text-base'>
            ₹{space.priceHour}/hour
          </p>
          <Link href="/contact" className='mt-[10px]'>
            <button className='bg-[#BA181B] font-semibold text-[13px] sm:text-[14px] py-1.5 px-3 rounded-full text-[#FFFFFF] cursor-pointer hover:scale-105 transition-all ease-in-out duration-200'>
              Contact
            </button>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          font-weight: bold;
          color: white !important;
          --swiper-navigation-size: 22px !important;
        }
      `}</style>
    </div>
  )
}

export default SpaceCard
