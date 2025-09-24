import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const pageNumber = [1, 2, 3, 4, 5];

const PaginationBar = () => {
    return (
        <div className='w-full flex flex-row justify-center items-center mt-[40px] sm:mt-[50px] md:mt-[65px] lg:mt-[90px]'>
            <div className='max-w-[700px] w-full bg-[#D9D9D9] flex flex-row justify-between items-center p-1.5 rounded-full gap-x-[20px]'>
                <div className='bg-[#FFFFFF] text-base md:text-[18px] xl:text-[20px] w-[196px] h-[46px] flex justify-center items-center rounded-full font-normal hover:bg-[#FFFFFF]/90 transition-all ease-in-out duration-200 cursor-pointer'>
                    {/* Small screen icon */}
                    <span className='sm:hidden'>
                        <FaChevronLeft className="w-4 h-4" />
                    </span>
                    {/* Text for sm and up */}
                    <span className='hidden sm:block'>
                        Previous
                    </span>
                </div>


                <div className='flex flex-row justify-center items-center gap-x-2'>
                    <>
                        {/* Small screen: clipped */}
                        <div className="flex gap-x-2 sm:hidden">
                            {pageNumber.slice(0, 2).map((num, index) => (
                                <span
                                    key={index}
                                    className='bg-[#FFFFFF] text-base w-[40px] h-[40px] rounded-full text-[#2C2C2C] cursor-pointer flex items-center justify-center hover:bg-[#BA181B] hover:text-[#FFFFFF] transition-all ease-in-out duration-200'
                                >
                                    {num}
                                </span>
                            ))}
                            {pageNumber.length > 2 && (
                                <span className='text-[#2C2C2C] text-base'>...</span>
                            )}
                        </div>

                        {/* Larger screens: full pagination */}
                        <div className="hidden sm:flex gap-x-2">
                            {pageNumber.map((num, index) => (
                                <span
                                    key={index}
                                    className='bg-[#FFFFFF] text-base md:text-[18px] w-[46px] h-[46px] rounded-full text-[#2C2C2C] cursor-pointer flex items-center justify-center hover:bg-[#BA181B] hover:text-[#FFFFFF] transition-all ease-in-out duration-200'
                                >
                                    {num}
                                </span>
                            ))}
                        </div>
                    </>
                </div>


                <div className='bg-[#FFFFFF] text-base md:text-[18px] xl:text-[20px] w-[196px] h-[46px] flex justify-center items-center rounded-full font-normal hover:bg-[#FFFFFF]/90 transition-all ease-in-out duration-200 cursor-pointer'>
                    {/* Small screen icon */}
                    <span className='sm:hidden'>
                        <FaChevronRight className="w-4 h-4" />
                    </span>
                    {/* Text for sm and up */}
                    <span className='hidden sm:block'>
                        Next
                    </span>
                </div>

            </div>
        </div>
    )
}

export default PaginationBar
