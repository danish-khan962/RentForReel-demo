import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// Define the types for the component's props
interface PaginationBarProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

// Destructure the props with the new type definition
const PaginationBar: React.FC<PaginationBarProps> = ({ totalPages, currentPage, onPageChange }) => {
    // We'll create an array of page numbers based on totalPages
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className='w-full flex flex-row justify-center items-center mt-[40px] sm:mt-[50px] md:mt-[65px] lg:mt-[90px]'>
            <div className='max-w-[700px] w-full bg-[#D9D9D9] flex flex-row justify-between items-center p-1.5 rounded-full gap-x-[20px]'>
                <div
                    className={`bg-[#FFFFFF] text-base md:text-[18px] xl:text-[20px] w-[196px] h-[46px] flex justify-center items-center rounded-full font-normal transition-all ease-in-out duration-200 cursor-pointer ${
                        currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-[#FFFFFF]/90'
                    }`}
                    onClick={handlePrevious}
                >
                    <span className='sm:hidden'>
                        <FaChevronLeft className="w-4 h-4" />
                    </span>
                    <span className='hidden sm:block'>
                        Previous
                    </span>
                </div>

                <div className='flex flex-row justify-center items-center gap-x-2'>
                    <div className="flex gap-x-2">
                        {/* Dynamically render all page numbers */}
                        {pageNumbers.map((num) => (
                            <span
                                key={num}
                                // The key change is here:
                                className={`
                                    text-base md:text-[18px] w-[46px] h-[46px] rounded-full flex items-center justify-center 
                                    transition-all ease-in-out duration-200 cursor-pointer
                                    ${num === currentPage 
                                        ? 'bg-[#BA181B] text-[#FFFFFF]' 
                                        : 'bg-[#FFFFFF] text-[#2C2C2C] hover:bg-[#BA181B] hover:text-[#FFFFFF]'
                                    }
                                `}
                                onClick={() => onPageChange(num)}
                            >
                                {num}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    className={`bg-[#FFFFFF] text-base md:text-[18px] xl:text-[20px] w-[196px] h-[46px] flex justify-center items-center rounded-full font-normal transition-all ease-in-out duration-200 cursor-pointer ${
                        currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-[#FFFFFF]/90'
                    }`}
                    onClick={handleNext}
                >
                    <span className='sm:hidden'>
                        <FaChevronRight className="w-4 h-4" />
                    </span>
                    <span className='hidden sm:block'>
                        Next
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PaginationBar;