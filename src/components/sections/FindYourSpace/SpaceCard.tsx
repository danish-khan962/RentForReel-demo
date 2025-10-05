'use client'

import React, { useEffect, useRef, useState } from 'react'
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
}

interface SpaceCardProps {
  space?: Space | null
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const [showArrows, setShowArrows] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMobileInteraction = () => {
    if (window.innerWidth <= 768) {
      setShowArrows(true)

      if (hideTimeout.current) clearTimeout(hideTimeout.current)

      hideTimeout.current = setTimeout(() => {
        setShowArrows(false)
      }, 3000) // hide after 3 seconds of inactivity
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('touchstart', handleMobileInteraction)
    window.addEventListener('scroll', handleMobileInteraction)

    return () => {
      window.removeEventListener('touchstart', handleMobileInteraction)
      window.removeEventListener('scroll', handleMobileInteraction)
    }
  }, [])

  if (!space) return null

  return (
    <div className='max-w-[620px] w-full h-full bg-[#D9D9D94D] rounded-4xl'>
      <Link href={`/find-your-space/${space.id}`}>
        <div className='group w-full h-[243px] relative p-2.5 hover:p-0 transition-all ease-in-out duration-300'>
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
          <p className='capitalize text-[14px] sm:text-[15.5px] md:text-base lg:text-[17.5px] font-semibold'>
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
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }

        /* Show arrows if showArrows state is true */
        ${showArrows ? `
          .swiper-button-next,
          .swiper-button-prev {
            opacity: 1 !important;
          }
        ` : ''}
      `}</style>
    </div>
  )
}

export default SpaceCard
