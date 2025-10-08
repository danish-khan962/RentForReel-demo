'use client'

import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { HiMiniArrowLongRight } from "react-icons/hi2"
import Link from 'next/link'
import { fetchStates } from '@/api/filter/states'
import FeaturedCards from './FeaturedCards'

const FeaturedListing = () => {
  const [states, setStates] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedState, setSelectedState] = useState<string>('Delhi')

  // Fetch all states for the dropdown
  useEffect(() => {
    const loadStates = async () => {
      const data = await fetchStates()
      if (data.length > 0) setStates(data)
    }
    loadStates()
  }, [])

  return (
    <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[70px] flex justify-center'>
      <div className='max-w-[1500px] w-full bg-[#D9D9D9]/25 rounded-xl flex flex-col gap-y-[40px] p-4 sm:p-10'>

        {/* Header & Dropdown */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4'>
          <div className='flex gap-x-6 items-center'>
            <p className='font-semibold text-[20px] md:text-[23px] capitalize'>Featured Listing</p>

            {/* State Dropdown */}
            <div className='relative'>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='bg-[#BA181B] text-white font-semibold px-4 sm:px-6 py-2 rounded-full flex items-center gap-x-2 cursor-pointer select-none text-[14px] hover:bg-[#BA181B]/90 transition-all ease-in-out duration-200'
              >
                {selectedState}
                {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {dropdownOpen && (
                <div className='absolute top-full left-0 mt-2 w-[280px] max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-4xl shadow-lg z-50 px-4 pt-3'>
                  {states.map((state, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setSelectedState(state); setDropdownOpen(false) }}
                      className='px-4 py-1 text-sm text-[#00000085] hover:font-medium cursor-pointer'
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <p className='text-[#2C2C2C] text-[18px] lg:text-[20px]'>Feature your space</p>
            <Link href={"https://rentforreel-lister-frontend.vercel.app"}>
              <button className='p-2 rounded-full bg-[#BA181B] hover:bg-[#2C2C2C] transition-all ease-in-out duration-200 cursor-pointer'>
                <HiMiniArrowLongRight className='text-white text-[22px]' />
              </button>
            </Link>
          </div>
        </div>

        {/* Featured Cards */}
        <FeaturedCards selectedState={selectedState} />
      </div>
    </section>
  )
}

export default FeaturedListing
