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
  contactNumber?: string
}

interface SpaceCardProps {
  space?: Space | null
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  if (!space) return null

  return (
    <div className='max-w-[620px] w-full h-full bg-[#D9D9D94D] rounded-4xl'>
      <Link href={`/find-your-space/${space.id}`}>
        <div className='group w-full h-[243px] relative p-0 md:p-2 hover:p-0 transition-all ease-in-out duration-300'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            loop={true}
            className='h-full rounded-4xl'
          >
            {space.images.map((img, index) => (
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
        <div className='flex flex-col items-baseline'>
          <p className='capitalize text-[14px] sm:text-[15px] md:text-base font-semibold leading-snug overflow-x-hidden line-clamp-1 max-w-[200px] w-full'>
            {space.nameOfSpace}
          </p>
          <p className='capitalize font-normal text-[12px] sm:text-[13.5px] mt-[15px]'>
            {space.city}, {space.state}
          </p>
        </div>

        <div className='flex flex-col justify-end items-end'>
          <p className='font-semibold text-[15px] sm:text-base'>
            ₹{space.priceHour}/hour
          </p>
          <Link href={`tel:${space.contactNumber}`} className='mt-[10px]'>
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
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none; /* prevent clicks when hidden */
        }

        @media (min-width: 768px) {
          /* On md and larger: show arrows on hover */
          .group:hover .swiper-button-next,
          .group:hover .swiper-button-prev {
            opacity: 1;
            pointer-events: auto;
          }
        }

        @media (max-width: 767px) {
          /* On less than md: always show arrows */
          .swiper-button-next,
          .swiper-button-prev {
            opacity: 1 !important;
            pointer-events: auto;
          }
        }
      `}</style>
    </div>
  )
}

export default SpaceCard
