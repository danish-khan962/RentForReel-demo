import React from 'react'
import Link from 'next/link'
import { HiArrowLongRight } from "react-icons/hi2";

// Importing background image for banner
import backgroundImage from "../../../../public/banner_velvet_bg.png"

const Banner = () => {
  return (
    <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-6 flex justify-center items-center mt-[100px] sm:mt-[120px] md:mt-[140px] lg:mt-[160px] mb-[150px] sm:mb-[170px] md:mb-[200px] lg:mb-[230px]'>

      <div className='flex flex-col max-w-[1440px] w-full text-[#FFFFFF] rounded-4xl py-[55px] justify-center items-center text-center'
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <h2 className='font-semibold text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] leading-snug'> From empty to extraordinary. </h2>

        <p className='max-w-[1220px] w-full px-3 mt-[21px] font-normal text-[14px] sm:text-base md:text-[17.5px]'> List your space today and open the doors to endless creative possibilities — let filmmakers, photographers, and creators bring it to life while you earn effortlessly with every booking. </p>

        <Link href={"/"} className='mt-[37px]'>
          <button className='font-normal text-[15px] sm:text-base md:text-[17.5px] py-3 px-16 rounded-full bg-[#FFFFFF] border-none outline-none cursor-pointer transition-all ease-in-out duration-200 flex justify-center items-center text-[#BA181B] hover:font-medium hover:scale-105 delay-75'>
            List Your Space  <span className='text-[36px] ml-[15px]'> <HiArrowLongRight /> </span>
          </button>
        </Link>
      </div>

    </section>
  )
}

export default Banner
