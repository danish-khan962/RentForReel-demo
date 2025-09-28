import React from 'react'

const SpaceCardSkeleton: React.FC = () => {
  return (
    <div className='max-w-[620px] w-full h-full bg-[#D9D9D94D] rounded-4xl animate-pulse'>
      {/* Placeholder for the Swiper image carousel */}
      <div className='w-full h-[243px] rounded-t-4xl bg-gray-300'></div>

      <div className='flex flex-row justify-between px-3 pt-3 pb-4'>
        <div className='flex flex-col items-baseline'>
          {/* Placeholder for nameOfSpace */}
          <div className='h-6 w-3/4 rounded bg-gray-300'></div>
          {/* Placeholder for city, state */}
          <div className='h-4 w-1/2 rounded bg-gray-300 mt-[15px]'></div>
        </div>

        <div className='flex flex-col justify-end items-end'>
          {/* Placeholder for priceHour */}
          <div className='h-5 w-20 rounded bg-gray-300'></div>
          {/* Placeholder for Contact button */}
          <div className='h-8 w-24 rounded-full bg-gray-300 mt-[10px]'></div>
        </div>
      </div>
    </div>
  )
}

export default SpaceCardSkeleton