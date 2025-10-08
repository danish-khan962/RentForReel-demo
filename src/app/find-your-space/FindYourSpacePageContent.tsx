'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import CapsuleSearchFilter from '@/components/sections/Home/CapsuleSearchFilter'
import SpaceCard from '@/components/sections/FindYourSpace/SpaceCard'
import PaginationBar from '@/components/sections/FindYourSpace/PaginationBar'
import QuickForm from '@/components/sections/FindYourSpace/space/QuickForm'
import SpaceCardSkeleton from '@/components/sections/FindYourSpace/SpaceCardSkeleton'
import SortingFilter from '@/components/sections/FindYourSpace/SortingFilter'

import myQueries from '@/api/queries'
import Banner from '@/components/sections/Home/Banner'

// Make all optional fields optional to avoid TS conflicts
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
  createdAt: string
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
  const keyword = searchParams.get('q')?.toLowerCase() || ''
  const [filters, setFilters] = useState<Record<string, string | number | undefined> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<string>('recent')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const itemsPerPage = 16

  // Build filters — fetch ALL matching items so we can sort globally client-side
  useEffect(() => {
    const rawPrice = searchParams.get('price')
    const priceFilter = parsePrice(rawPrice)

    const newFilters = {
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      popularity: searchParams.get('popularity') || undefined,
      ...priceFilter,
      // FULL FETCH for client-side global sorting & pagination:
      limit: 9999,
      page: undefined,
    }

    setFilters(newFilters)
    setCurrentPage(1) // reset page when filters/search changes
  }, [searchParams, keyword])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['spaces', filters, keyword],
    queryFn: () => {
      if (!filters) return Promise.resolve({ data: { listings: [] } })
      return myQueries.getSpaces(filters)
    },
    enabled: !!filters,
  })

  const listings: Space[] = data?.data?.listings || []

  //  Client-side filtering (search)
  const filteredListings = listings.filter((space: Space) => {
    if (!keyword) return true

    const searchableFields = [
      space.nameOfSpace,
      space.city,
      space.state,
      space.area,
      space.aboutSpace,
      ...(space.highlights || []),
      ...(space.selectedAmenities || []),
    ]

    return searchableFields.some(field =>
      typeof field === 'string' ? field.toLowerCase().includes(keyword) : false
    )
  })

  // 🔃 Client-side global sorting (applies to entire dataset)
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'lowToHigh':
        return a.priceHour - b.priceHour
      case 'highToLow':
        return b.priceHour - a.priceHour
      default:
        return 0
    }
  })

  // Pagination (client-side slicing of the globally-sorted array)
  const totalPages = Math.max(1, Math.ceil(sortedListings.length / itemsPerPage))

  // clamp currentPage if it becomes out of range after filtering/sorting
  if (currentPage > totalPages) {
    setCurrentPage(1)
  }

  const currentListings = sortedListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const loading = isLoading || !filters

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  // When user applies a sort: set the sort and reset to page 1
  const handleSortApply = (option: string) => {
    setSortOption(option)
    setCurrentPage(1)
  }

  const displayTitle = searchParams.get('q')
    ? `Search results for "${searchParams.get('q')}"`
    : `${filters?.city || 'Explore All Spaces'}${filters?.state ? `, ${filters?.state}` : ''}`

  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px]'>
        <div className='flex flex-col'>
          {/* Header */}
          <div className='flex flex-row justify-between items-center gap-3'>
            <p className='font-semibold text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>
              {displayTitle}
            </p>

            <div
              onClick={() => setIsSortOpen(true)}
              className='flex flex-row justify-center items-center gap-x-[15px] bg-[#D9D9D9] py-1.5 px-5 rounded-full cursor-pointer hover:bg-[#D9D9D9]'
            >
              <p className='text-[14px] sm:text-base font-normal'>Sort</p>
              <Image
                src={'/FindYourSpace/filter.png'}
                alt='filter'
                height={25}
                width={25}
                className='h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:w-[22px] md:h-[20px] lg:w-[25px] lg:h-[25px]'
              />
            </div>
          </div>

          {/* Listing Grid */}
          <div className='mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {loading ? (
              [...Array(12)].map((_, idx) => <SpaceCardSkeleton key={idx} />)
            ) : isError ? (
              <p>Failed to load spaces.</p>
            ) : currentListings.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                No spaces found for selected filters.
              </p>
            ) : (
              currentListings.map((space: Space) => (
                <SpaceCard key={space.id} space={space} />
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        {/* Quick Form */}
        <div className='w-full mt-[120px]'>
          <QuickForm />
        </div>

        {/* Popular Spaces - Nagpur */}
        <div className='w-full flex flex-col mt-[112px]'>
          <p className='font-semibold text-[25px]'>Most popular spaces in Nagpur</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading
              ? [...Array(4)].map((_, idx) => (
                  <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />
                ))
              : listings.slice(0, 4).map((space: Space) => (
                  <SpaceCard key={space.id} space={space} />
                ))}
          </div>
        </div>

        {/* Exclusive Spaces - Mumbai */}
        <div className='w-full flex flex-col mt-[76px]'>
          <p className='font-semibold text-[25px]'>Exclusive spaces in Mumbai</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading
              ? [...Array(4)].map((_, idx) => (
                  <SpaceCardSkeleton key={`mumbai-skeleton-${idx}`} />
                ))
              : listings.slice(4, 8).map((space: Space) => (
                  <SpaceCard key={space.id} space={space} />
                ))}
          </div>
        </div>

        {/* Explore More Button */}
        {/* <div className='w-full flex justify-center items-center mt-[130px]'>
          <Link href={'#'}>
            <button className='text-base sm:text-[17.5px] md:text-[18px] text-[#BA181B] font-bold w-[250px] h-[50px] md:w-[280px] md:h-[55px] rounded-full border border-[#BA181B] cursor-pointer hover:bg-[#BA181B] hover:text-white transition-all'>
              Explore More
            </button>
          </Link>
        </div> */}
        <div>
          <Banner />
        </div>
      </div>

      {isSortOpen && (
        <SortingFilter
          onClose={() => setIsSortOpen(false)}
          onSortApply={handleSortApply}
          initialSelectedOption={sortOption}
        />
      )}
    </>
  )
}

export default FindYourSpacePageContent
