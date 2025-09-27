'use client'

import CapsuleSearchFilter from '@/components/sections/Home/CapsuleSearchFilter'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SpaceCard from '@/components/sections/FindYourSpace/SpaceCard'
import Link from 'next/link'
import PaginationBar from '@/components/sections/FindYourSpace/PaginationBar'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import myQueries from '@/api/queries'
import QuickForm from '@/components/sections/FindYourSpace/space/QuickForm'

interface Space {
  id: string
  nameOfSpace: string
  city: string
  state: string
  area: string
  capacity: string
  availability: string
  highlights: string[]
  aboutSpace: string
  selectedAmenities: string[]
  priceHour: number
  priceDay: number
  images: string[]
  authId: string
  contactNumber?: string
  whatsappNumber?: string
  user?: {
    profileImg?: string
    fullName?: string
    bio?: string
  }
}

const parsePrice = (priceStr: string | null) => {
  if (!priceStr) return {}
  if (priceStr === '₹0 - ₹500') return { priceMinHour: 0, priceMaxHour: 500 }
  if (priceStr === '₹500 - ₹1000') return { priceMinHour: 500, priceMaxHour: 1000 }
  if (priceStr === '₹1000+') return { priceMinHour: 1000 }
  return {}
}

const Page = () => {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, string | number | undefined> | null>(null)

  // Use useEffect to extract query params on client only
  useEffect(() => {
    const rawPrice = searchParams.get('price')
    const priceFilter = parsePrice(rawPrice)

    const newFilters = {
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      popularity: searchParams.get('popularity') || undefined,
      ...priceFilter,
    }

    setFilters(newFilters)
  }, [searchParams])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['spaces', filters],
    queryFn: () => {
      if (!filters) return Promise.resolve({ data: { listings: [] } }) // return empty while filters load
      return myQueries.getSpaces(filters)
    },
    enabled: !!filters, // only run query once filters are ready
  })

  const listings: Space[] = data?.data?.listings || []

  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px] mb-[120px]'>

        {/* Filter section and sort */}
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-semibold text-[25px]'>
              {filters?.city || 'All Cities'}, {filters?.state || 'All States'}
            </p>
            <div className='flex flex-row justify-center items-center gap-x-[15px] bg-[#D9D9D9] py-1.5 px-5 rounded-full cursor-pointer hover:bg-[#D9D9D9]'>
              <p className='text-[18px] font-normal'>Sort</p>
              <Image
                src={'/FindYourSpace/filter.png'}
                alt='filter'
                height={25}
                width={25}
                className='h-[25px] w-[25px]'
              />
            </div>
          </div>

          {/* Cards grid */}
          <div className='mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {isLoading || !filters ? (
              <p>Loading spaces...</p>
            ) : isError ? (
              <p>Failed to load spaces.</p>
            ) : listings.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                No spaces found for selected filters.
              </p>
            ) : (
              listings.map((space: Space) => (
                <SpaceCard key={space.id} space={space} />
              ))
            )}
          </div>
        </div>

        <PaginationBar />

        {/* Yellow box */}
        <div className='w-full mt-[120px]'>
          <QuickForm />
        </div>

        {/* Most popular in Nagpur */}
        <div className='w-full flex flex-col mt-[112px]'>
          <p className='font-semibold text-[25px]'>Most popular spaces in Nagpur</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {listings.slice(0, 4).map((space: Space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </div>

        {/* Exclusive in Mumbai */}
        <div className='w-full flex flex-col mt-[76px]'>
          <p className='font-semibold text-[25px]'>Exclusive spaces in Mumbai</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {listings.slice(4, 8).map((space: Space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </div>

        {/* Explore more */}
        <div className='w-full flex justify-center items-center mt-[130px]'>
          <Link href={'#'}>
            <button className='text-[20px] text-[#BA181B] font-bold w-[420px] h-[70px] rounded-full border border-[#BA181B] cursor-pointer hover:bg-[#BA181B] hover:text-white transition-all'>
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page
