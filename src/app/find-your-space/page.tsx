import CapsuleSearchFilter from '@/components/sections/Home/CapsuleSearchFilter'
import React from 'react'
import Image from 'next/image'
import SpaceCard from '@/components/sections/FindYourSpace/SpaceCard'
import Link from 'next/link'
import PaginationBar from '@/components/sections/FindYourSpace/PaginationBar'


const page = () => {
  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px] sm:mt-[75px] md:mt-[90px] lg:mt-[110px] mb-[120px] sm:mb-[135px] md:mb-[150px] lg:mb-[175px]'>

        {/*  Filter data and cards */}
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Pune, Maharashtra </p>
            <div className='flex flex-row justify-center items-center gap-x-[15px] bg-[#D9D9D9] py-1.5 px-5 rounded-full cursor-pointer hover:bg-[#D9D9D9]'>
              <p className='text-[14px] sm:text-base md:text-[18px] font-normal'>
                Sort
              </p>
              <Image
                src={"/FindYourSpace/filter.png"}
                alt='filter image'
                height={1000}
                width={1000}
                className='h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] md:h-[25px] md:w-[26px]'
              />
            </div>
          </div>

          {/* Cards */}
          <div className='mt-[36px] lg:mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
          </div>


        </div>

        {/* Page block */}
        <PaginationBar />


        {/* Temporary Yellow div */}
        <div className='w-full rounded-4xl h-[300px] bg-[#FFF5D1] mt-[80px] sm:mt-[90px] md:mt-[100px] lg:mt-[120px]'>

        </div>

        {/* Most Popular spaces */}
        <div className='w-full flex flex-col mt-[80px] sm:mt-[95px] md:mt-[105px] lg:mt-[112px]'>
          <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Most popular spaces in Nagpur </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
          </div>
        </div>


        {/* Exclusive spaces in Mumbai */}
        <div className='w-full flex flex-col mt-[76px]'>
          <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Exclusive spaces in Mumbai </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
            <SpaceCard />
          </div>
        </div>

        {/* Explore more CTA button */}
        <div className='w-full flex justify-center items-center mt-[90px] sm:mt-[110px] md:mt-[120px] lg:mt-[130px]'>
          <Link href={"#"}>
            <button className='text-base sm:text-[17.5px] md:text-[18px] lg:text-[20px] text-[#BA181B] font-bold w-[320px] sm:w-[350px] md:w-[380px] lg:w-[420px] h-[70px] rounded-full border border-[#BA181B] cursor-pointer hover:border-none hover:bg-[#BA181B] hover:text-[#FFFFFF] transition-all ease-in-out duration-300'> Explore More </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default page
