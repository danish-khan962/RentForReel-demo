'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
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
  locality?: string
  user?: {
    profileImg?: string
    fullName?: string
    bio?: string
  }
}

const parsePrice = (searchParams: URLSearchParams) => {
  const priceHourMin = searchParams.get('priceHourMin')
  const priceHourMax = searchParams.get('priceHourMax')
  const priceDayMin = searchParams.get('priceDayMin')
  const priceDayMax = searchParams.get('priceDayMax')

  const result: Record<string, number> = {}
  if (priceHourMin) result.priceHourMin = parseInt(priceHourMin)
  if (priceHourMax) result.priceHourMax = parseInt(priceHourMax)
  if (priceDayMin) result.priceDayMin = parseInt(priceDayMin)
  if (priceDayMax) result.priceDayMax = parseInt(priceDayMax)

  return result
}

const FindYourSpacePageContent = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('q')?.toLowerCase() || ''
  const [filters, setFilters] = useState<Record<string, string | number | undefined> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<string>('recent')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const itemsPerPage = 16

  // Build filters
  useEffect(() => {
    const priceFilter = parsePrice(searchParams)
    const newFilters = {
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      locality: searchParams.get('locality') || undefined, // <-- Added locality
      popularity: searchParams.get('popularity') || undefined,
      ...priceFilter,
      limit: 9999,
      page: undefined,
    }

    setFilters(newFilters)
    setCurrentPage(1)
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

  // Client-side filtering
  const filteredListings = listings.filter((space: Space) => {
    if (!keyword && !searchParams.get('locality')) return true

    const searchableFields = [
      space.nameOfSpace,
      space.city,
      space.state,
      space.area,
      space.aboutSpace,
      ...(space.highlights || []),
      ...(space.selectedAmenities || []),
      space.locality || '',
    ]

    // Keyword search
    const matchesKeyword = keyword
      ? searchableFields.some(field =>
          typeof field === 'string' ? field.toLowerCase().includes(keyword) : false
        )
      : true

    // Locality search
    const selectedLocality = searchParams.get('locality')
    const matchesLocality = selectedLocality
      ? space.locality?.toLowerCase() === selectedLocality.toLowerCase()
      : true

    return matchesKeyword && matchesLocality
  })

  // Sorting
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

  const totalPages = Math.max(1, Math.ceil(sortedListings.length / itemsPerPage))
  if (currentPage > totalPages) setCurrentPage(1)
  const currentListings = sortedListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const loading = isLoading || !filters

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)
  const handleSortApply = (option: string) => { setSortOption(option); setCurrentPage(1) }

  const displayTitle = searchParams.get('q')
    ? `Search results for "${searchParams.get('q')}"`
    : `${filters?.city || 'Explore All Spaces'}${filters?.state ? `, ${filters?.state}` : ''}${filters?.locality ? `, ${filters?.locality}` : ''}`

  // Determine price mode
  const priceMode: 'hour' | 'day' = filters?.priceDayMin || filters?.priceDayMax ? 'day' : 'hour'

  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px]'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center gap-3'>
            <p className='font-semibold text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>{displayTitle}</p>
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

          <div className='mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {loading
              ? [...Array(12)].map((_, idx) => <SpaceCardSkeleton key={idx} />)
              : isError
              ? <p>Failed to load spaces.</p>
              : currentListings.length === 0
              ? <p className='col-span-full text-center text-gray-500'>No spaces found for selected filters.</p>
              : currentListings.map((space: Space) => <SpaceCard key={space.id} space={space} priceMode={priceMode} />)
            }
          </div>
        </div>

        {totalPages > 1 && (
          <PaginationBar totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        )}

        <div className='w-full mt-[120px]'>
          <QuickForm />
        </div>

        <div className='w-full flex flex-col mt-[112px]'>
          <p className='font-semibold text-[25px]'> Recently added spaces </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading
              ? [...Array(8)].map((_, idx) => <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />)
              : listings.slice(0, 8).map((space: Space) => <SpaceCard key={space.id} space={space} priceMode={priceMode} />)
            }
          </div>
        </div>

        <div>
          <Banner />
        </div>
      </div>

      {isSortOpen && (
        <SortingFilter onClose={() => setIsSortOpen(false)} onSortApply={handleSortApply} initialSelectedOption={sortOption} />
      )}
    </>
  )
}

export default FindYourSpacePageContent
