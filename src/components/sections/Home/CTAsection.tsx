import React from 'react'
import Link from 'next/link'

const CTAsection = () => {

  // list bullet data
  const listData = [
    "Flexible hourly & daily rentals",
    "Verified creative spaces",
    "Transparent pricing & instant booking",
    "Tailored for content creators",
  ]

  return (
    <section className='max-w-[1440px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center mt-[70px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px]'>

      <h1 className='uppercase text-[43px] sm:text-[75px] md:text-[92px] lg:text-[125px] xl:text-[168px] text-[#2C2C2C] font-bold text-center leading-tight'> RENT FOR REEL </h1>

      <p className='max-w-[1282px] font-normal text-[14px] md:text-base lg:text-[18px] text-[#2C2C2C] text-start sm:text-center mt-[15px] sm:mt-[20px]'>
        Rent for Reel connects creators, filmmakers, photographers, and brands with unique studios and creative spaces. Spaces can be booked or listed with ease, whether for hours, a single day, or multi-day shoots. Our platform ensures flexible, on-demand access to professional locations. Simple, fast, and built to support every creative vision.
      </p>

      <ul className='list-disc flex flex-col md:flex-row w-full justify-start items-start sm:justify-evenly sm:items-center gap-x-6 mt-[50px] sm:mt-[60px] md:mt-[70px] lg:mt-[75px] flex-wrap px-4 sm:px-8'>
        {
          listData.map((item, index) => (
            <li className='text-[#BA181B] font-medium text-[14px] md:text-base lg:text-[18px]' key={index}> {item} </li>
          ))
        }
      </ul>

      {/* CTA Buttons */}
      <div className='flex flex-row flex-wrap w-full justify-center items-center gap-x-6 gap-y-3 mt-[50px] sm:mt-[60px] md:mt-[70px] lg:mt-[80px]'>
        <Link href={"/"}>
          <button className='w-[250px] sm:w-[280px] md:w-[300px] h-[45px] sm:h-[55px] md:h-[65px] bg-[#D9D9D9] rounded-full border border-[#929292] cursor-pointer font-medium text-[14px] sm:text-base md:text-[18px] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFFFFF] transition-colors ease-in-out duration-200 active:bg-[#2C2C2C] active:text-[#FFFFFF]'> Find your Space </button>
        </Link>

        <Link href={"/"}>
          <button className='w-[250px] sm:w-[280px] md:w-[300px] h-[45px] sm:h-[55px] md:h-[65px] bg-[#D9D9D9] rounded-full border border-[#929292] cursor-pointer font-medium text-[14px] sm:text-base md:text-[18px] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FFFFFF] transition-colors ease-in-out duration-200 active:bg-[#2C2C2C] active:text-[#FFFFFF]'> List your Space </button>
        </Link>
      </div>

    </section>
  )
}

export default CTAsection
