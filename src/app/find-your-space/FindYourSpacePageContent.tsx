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
import SortingFilter from '@/components/sections/FindYourSpace/SortingFilter'

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
  const keyword = searchParams.get('q')?.toLowerCase() || ''
  const [filters, setFilters] = useState<Record<string, string | number | undefined> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 16 // number of cards per page

  useEffect(() => {
    const rawPrice = searchParams.get('price')
    const priceFilter = parsePrice(rawPrice)

    const newFilters = {
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      popularity: searchParams.get('popularity') || undefined,
      ...priceFilter,
      // ⚡ don't send page when searching; handle client-side pagination
      page: keyword ? undefined : currentPage,
      limit: keyword ? 9999 : 16, // fetch all if searching
    }

    setFilters(newFilters)
  }, [searchParams, currentPage, keyword])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['spaces', filters, keyword],
    queryFn: () => {
      if (!filters) return Promise.resolve({ data: { listings: [] } })
      return myQueries.getSpaces(filters)
    },
    enabled: !!filters,
  })

  const listings: Space[] = data?.data?.listings || []
  const meta = data?.data?.meta || {}
  const totalPagesAPI = meta.totalPages || 1

  // client-side filtering
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

    return searchableFields.some(field => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(keyword)
      }
      return false
    })
  })

  // client-side pagination when searching
  const totalPages = keyword
    ? Math.ceil(filteredListings.length / itemsPerPage)
    : totalPagesAPI

  const currentListings = keyword
    ? filteredListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredListings

  //SORTING FILTER
  const [isSortOpen, setIsSortOpen] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (isSortOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      html.style.overflow = ''
      body.style.overflow = ''
    }

    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
    }
  }, [isSortOpen])

  const loading = isLoading || !filters

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const displayTitle = searchParams.get('q')
    ? `Search results for "${searchParams.get('q')}"`
    : `${filters?.city || 'Explore All Spaces'}${filters?.state ? `, ${filters?.state}` : ''}`

  return (
    <>
      <CapsuleSearchFilter />

      <div className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[60px] mb-[120px]'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-semibold text-[25px]'>{displayTitle}</p>
            <div
              onClick={() => setIsSortOpen(true)}
              className='flex flex-row justify-center items-center gap-x-[15px] bg-[#D9D9D9] py-1.5 px-5 rounded-full cursor-pointer hover:bg-[#D9D9D9]'
            >
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
            ) : currentListings.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                No spaces found for selected filters.
              </p>
            ) : (
              currentListings.map((space: Space) => <SpaceCard key={space.id} space={space} />)
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        <div className='w-full mt-[120px]'>
          <QuickForm />
        </div>

        <div className='w-full flex flex-col mt-[112px]'>
          <p className='font-semibold text-[25px]'>Most popular spaces in Nagpur</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading
              ? [...Array(4)].map((_, idx) => <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />)
              : listings.slice(0, 4).map((space: Space) => <SpaceCard key={space.id} space={space} />)}
          </div>
        </div>

        <div className='w-full flex flex-col mt-[76px]'>
          <p className='font-semibold text-[25px]'>Exclusive spaces in Mumbai</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[42px] gap-5'>
            {loading
              ? [...Array(4)].map((_, idx) => <SpaceCardSkeleton key={`nagpur-skeleton-${idx}`} />)
              : listings.slice(4, 8).map((space: Space) => <SpaceCard key={space.id} space={space} />)}
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

      {isSortOpen && <SortingFilter onClose={() => setIsSortOpen(false)} />}
    </>
  )
}

export default FindYourSpacePageContent
