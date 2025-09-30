import React from 'react'

interface SortingFilterProps {
  onClose: () => void;
}

const SortingFilter: React.FC<SortingFilterProps> = ({ onClose }) => {
  return (
    <div className='absolute top-0 z-10 w-screen h-screen flex justify-center items-center bg-[#FFFFFF]/40 backdrop-blur-lg'>

        <button 
          onClick={onClose}
          className='font-medium text-[#000000] py-1.5 px-6 rounded-full bg-gray-300/40 cursor-pointer underline absolute top-10 right-10'
        >
          Close
        </button>

        {/* Sorting filter functions */}
        <div className='w-[700px] h-[500px] rounded-2xl bg-lime-100 border border-black'>
            
        </div>

    </div>
  )
}

export default SortingFilter