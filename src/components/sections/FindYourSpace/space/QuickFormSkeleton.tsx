import React from 'react';

const QuickFormSkeleton: React.FC = () => {
    return (
        <div className='w-full h-[300px] md:h-[350px] lg:h-[400px] bg-[#D9D9D9] rounded-3xl animate-pulse flex flex-col justify-center items-center'>
            <div className='h-8 w-1/2 bg-gray-400 rounded-lg mb-4'></div>
            <div className='h-6 w-1/3 bg-gray-400 rounded mb-8'></div>
            <div className='h-12 w-2/3 bg-gray-400 rounded-full mb-4'></div>
            <div className='h-10 w-1/4 bg-gray-400 rounded-full'></div>
        </div>
    );
};

export default QuickFormSkeleton;