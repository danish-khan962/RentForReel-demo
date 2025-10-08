import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      scrollToTop(); 
    }
  };

  return (
    <div className='w-full flex flex-row justify-center items-center mt-[40px] sm:mt-[50px] md:mt-[65px] lg:mt-[90px]'>
      <div className='max-w-[600px] w-full bg-[#D9D9D9] flex flex-row justify-between items-center p-1.5 rounded-full gap-x-[20px]'>
        <div
          className={`bg-[#FFFFFF] text-[14px] md:text-[15px] xl:text-base w-[170px] h-[40px] flex justify-center items-center rounded-full font-normal transition-all ease-in-out duration-200 cursor-pointer ${
            currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-[#FFFFFF]/90'
          }`}
          onClick={handlePrevious}
        >
          <span className='sm:hidden'>
            <FaChevronLeft className="w-3.5 h-3.5" />
          </span>
          <span className='hidden sm:block'>Previous</span>
        </div>

        <div className='flex flex-row justify-center items-center gap-x-2'>
          <div className="flex gap-x-2">
            {pageNumbers.map((num) => (
              <span
                key={num}
                className={`
                  text-[14px] md:text-[15px] w-[40px] h-[40px] rounded-full flex items-center justify-center 
                  transition-all ease-in-out duration-200 cursor-pointer
                  ${num === currentPage 
                    ? 'bg-[#BA181B] text-[#FFFFFF]' 
                    : 'bg-[#FFFFFF] text-[#2C2C2C] hover:bg-[#BA181B] hover:text-[#FFFFFF]'
                  }
                `}
                onClick={() => {
                  onPageChange(num);
                  scrollToTop();
                }}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`bg-[#FFFFFF] text-[14px] md:text-[15px] xl:text-base w-[170px] h-[40px] flex justify-center items-center rounded-full font-normal transition-all ease-in-out duration-200 cursor-pointer ${
            currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-[#FFFFFF]/90'
          }`}
          onClick={handleNext}
        >
          <span className='sm:hidden'>
            <FaChevronRight className="w-3.5 h-3.5" />
          </span>
          <span className='hidden sm:block'>Next</span>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
