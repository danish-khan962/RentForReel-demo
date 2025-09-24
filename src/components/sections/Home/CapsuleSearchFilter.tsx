'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BsSearch } from "react-icons/bs";

// Filter data
const filterData = [
  { heading: "State / UT", placeholder: "Select your state" },
  { heading: "City", placeholder: "Select your city" },
  { heading: "Price", placeholder: "Your suitable price" },
  { heading: "Popularity", placeholder: "Popularity status" },
];

const CapsuleSearchFilter = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  return (
    <div className='hidden sm:flex max-w-[1500px] w-full mx-auto relative px-4 sm:px-6 md:px-8 justify-center items-center mt-[50px] sm:mt-[55px] md:mt-[60px] lg:mt-[65px] xl:mt-[70px]'>

      <div className='max-w-[1180px] w-full bg-[#FFFFFF] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-full border-t border-t-gray-400 inset-shadow-sm shadow-md shadow-gray-400 flex justify-between items-center py-4.5 px-6.5 gap-x-5'>

        {/* Capsules */}
        <div className='flex flex-row gap-2 flex-wrap'>
          {
            filterData.map((data, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex flex-col py-3.5 pl-7 pr-12 rounded-full cursor-pointer transition-all duration-200
                    ${isActive
                      ? 'bg-transparent shadow-[1px_1px_10px_gray]'
                      : 'bg-[#D9D9D9]/60 shadow-inner-top hover:bg-transparent hover:shadow-[1px_1px_10px_gray]'
                    }
                  `}
                >
                  <p className='text-[14px] sm:text-[15px] md:text-base font-semibold text-[#000000] text-start'>
                    {data.heading}
                  </p>
                  <p className='text-[14px] sm:text-[15px] md:text-base font-light text-[#00000054] text-start'>
                    {data.placeholder}
                  </p>
                </div>
                
              );
            })
          }
        </div>

        {/* Search button */}
        <Link href={"#"}>
          <div className='bg-[#BA181B] p-6 rounded-full hover:bg-[#2C2C2C] transition-all ease-in-out duration-200 cursor-pointer active:bg-[#2C2C2C] focus:bg-[#2C2C2C]'>
            <span>
              <BsSearch className='text-[18px] md:text-[24px] lg:text-[25px] text-[#FFFFFF]' />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CapsuleSearchFilter;
