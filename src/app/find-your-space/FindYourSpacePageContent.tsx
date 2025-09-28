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
import SpaceCardSkeleton from '@/components/sections/FindYourSpace/SpaceCardSkeleton'

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

const FindYourSpacePageContent = () => {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, string | number | undefined> | null>(null)
  // 1. Add state for the current page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const rawPrice = searchParams.get('price')
    const priceFilter = parsePrice(rawPrice)

    const newFilters = {
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      popularity: searchParams.get('popularity') || undefined,
      ...priceFilter,
      // 2. Add 'page' to the filters
      page: currentPage, 
    }

    setFilters(newFilters)
  }, [searchParams, currentPage]) // 3. Re-run effect when currentPage changes

  const { data, isLoading, isError } = useQuery({
    queryKey: ['spaces', filters],
    queryFn: () => {
      if (!filters) return Promise.resolve({ data: { listings: [] } })
      return myQueries.getSpaces(filters)
    },
    enabled: !!filters,
  })

  // 4. Extract listings and meta data from the response
  const listings: Space[] = data?.data?.listings || [];
  const meta = data?.data?.meta || {};
  const totalPages = meta.totalPages || 1;
  const page = meta.page || 1;

  const keyword = searchParams.get('keyword')?.toLowerCase() || '';

  const filteredListings = listings.filter((space: Space) => {
    if (!keyword) return true;

    const searchableFields = [
      space.nameOfSpace,
      space.city,
      space.state,
      space.area,
      space.aboutSpace,
      ...(space.highlights || []),
      ...(space.selectedAmenities || []),
    ];

    return searchableFields.some(field => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(keyword);
      }
      return false;
    });
  });

  const loading = isLoading || !filters;

  // 5. Create a function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px] mb-[120px]'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-semibold text-[25px]'>
              {filters?.city || 'Explore All Spaces'}, {filters?.state || null}
            </p>
            <div className='flex flex-row justify-center items-center gap-x-[15px] bg-[#D9D9D9] py-1.5 px-5 rounded-full cursor-pointer hover:bg-[#D9D9D9]'>
              <p className='text-[14px] sm:text-base lg:text-[18px] font-normal'>Sort</p>
              <Image
                src={'/FindYourSpace/filter.png'}
                alt='filter'
                height={25}
                width={25}
                className='h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:w-[22px] md:h-[20px] lg:w-[25px] lg:h-[25px]'
              />
            </div>
          </div>

          <div className='mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {loading ? (
              <>
                {[...Array(12)].map((_, idx) => (
                  <SpaceCardSkeleton key={idx} />
                ))}
              </>
            ) : isError ? (
              <p>Failed to load spaces.</p>
            ) : filteredListings.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                No spaces found for selected filters.
              </p>
            ) : (
              filteredListings.map((space: Space) => (
                <SpaceCard key={space.id} space={space} />
              ))
            )}
          </div>
        </div>

        {/* 6. Conditionally render the PaginationBar and pass props */}
        {totalPages > 1 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <div className='w-full mt-[120px]'>
          <QuickForm />
        </div>

        <div className='w-full flex flex-col mt-[112px]'>
          <p className='font-semibold text-[25px]'>Most popular spaces in Nagpur</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading ? (
              [...Array(4)].map((_, idx) => <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />)
            ) : (
              listings.slice(0, 4).map((space: Space) => (
                <SpaceCard key={space.id} space={space} />
              ))
            )}
          </div>
        </div>

        <div className='w-full flex flex-col mt-[76px]'>
          <p className='font-semibold text-[25px]'>Exclusive spaces in Mumbai</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading ? (
              [...Array(4)].map((_, idx) => <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />)
            ) : (
              listings.slice(4, 8).map((space: Space) => (
                <SpaceCard key={space.id} space={space} />
              ))
            )}
          </div>
        </div>

        <div className='w-full flex justify-center items-center mt-[130px]'>
          <Link href={'#'}>
            <button className='text-base sm:text-[17.5px] md:text-[18px] text-[#BA181B] font-bold w-[350px] h-[62px] md:w-[380px] md:h-[65px] rounded-full border border-[#BA181B] cursor-pointer hover:bg-[#BA181B] hover:text-white transition-all'>
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default FindYourSpacePageContent