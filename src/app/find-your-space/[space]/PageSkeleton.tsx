import React from 'react';
import SpaceCardSkeleton from '@/components/sections/FindYourSpace/SpaceCardSkeleton';
import QuickFormSkeleton from '@/components/sections/FindYourSpace/space/QuickFormSkeleton';

const PageSkeleton: React.FC = () => {
    return (
        <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[80px] sm:mt-[90px] md:mt-[100px] lg:mt-[110px] animate-pulse'>

            {/* Placeholder for Main space title */}
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col leading-snug'>
                    <div className='h-10 w-80 bg-gray-300 rounded-lg'></div>
                    <div className='h-6 w-64 bg-gray-300 rounded-lg mt-2'></div>
                </div>
            </div>

            {/* Placeholder for Bento Grid images */}
            <div className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mt-[35px] sm:mt-[37px] md:mt-[40px] grid grid-cols-4 grid-rows-2 gap-2'>
                {/* Large left image */}
                <div className="col-span-2 row-span-2 bg-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                {/* Top-right image */}
                <div className="bg-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                {/* Bottom-right images */}
                <div className="bg-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                <div className="bg-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                <div className="bg-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                {/* You can add a 5th placeholder here if needed */}
            </div>

            {/* Placeholder for Details Box */}
            <div className='w-full flex flex-col lg:flex-row justify-between mt-[70px] sm:mt-[75px] md:mt-[80px] lg:mt-[90px] gap-y-[56px] gap-x-[40px]'>
                <div className='w-full lg:w-[60%] max-w-[770px]'>
                    {/* Placeholder for Desc */}
                    <div className='flex flex-row gap-4 justify-between items-center'>
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-gray-300 rounded-lg h-[40px] w-[40px]'></div>
                            <div className='flex flex-col'>
                                <div className='h-5 w-20 bg-gray-300 rounded'></div>
                                <div className='h-4 w-16 bg-gray-300 rounded mt-1'></div>
                            </div>
                        </div>
                        {/* More placeholders for Capacity and Availability */}
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-gray-300 rounded-lg h-[40px] w-[40px]'></div>
                            <div className='flex flex-col'>
                                <div className='h-5 w-20 bg-gray-300 rounded'></div>
                                <div className='h-4 w-16 bg-gray-300 rounded mt-1'></div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-gray-300 rounded-lg h-[40px] w-[40px]'></div>
                            <div className='flex flex-col'>
                                <div className='h-5 w-20 bg-gray-300 rounded'></div>
                                <div className='h-4 w-16 bg-gray-300 rounded mt-1'></div>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Highlights */}
                    <div className='flex flex-col mt-[45px] sm:mt-[50px] md:mt-[55px] lg:mt-[60px] text-start'>
                        <div className='h-6 w-32 bg-gray-300 rounded'></div>
                        <ul className='flex flex-col mt-[15px] sm:mt-[20px] ml-4'>
                            <li className='h-4 w-full bg-gray-300 rounded my-1'></li>
                            <li className='h-4 w-3/4 bg-gray-300 rounded my-1'></li>
                            <li className='h-4 w-2/3 bg-gray-300 rounded my-1'></li>
                        </ul>
                    </div>

                    {/* Placeholder for About this space */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px] text-start py-[35px] md:py-[50px] border-t border-b border-gray-400'>
                        <div className='h-8 w-48 bg-gray-300 rounded-lg'></div>
                        <div className='mt-[22px] flex flex-col gap-2'>
                            <div className='h-4 w-full bg-gray-300 rounded'></div>
                            <div className='h-4 w-5/6 bg-gray-300 rounded'></div>
                        </div>
                    </div>

                    {/* Placeholder for Amenities */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px]'>
                        <div className='h-7 w-40 bg-gray-300 rounded'></div>
                        <div className='w-full flex flex-row flex-wrap gap-[15px] md:gap-[20px] mt-[34px]'>
                            <div className='h-10 w-24 bg-gray-300 rounded-full'></div>
                            <div className='h-10 w-24 bg-gray-300 rounded-full'></div>
                            <div className='h-10 w-24 bg-gray-300 rounded-full'></div>
                            <div className='h-10 w-24 bg-gray-300 rounded-full'></div>
                        </div>
                    </div>
                </div>

                {/* Right side skeletons */}
                <div className='w-full lg:w-[40%] max-w-[820px] flex flex-col justify-center lg:justify-between items-center gap-y-[40px] md:gap-y-[60px]'>
                    {/* Placeholder for Form */}
                    <div className='max-w-[820px] w-full bg-white shadow-xl rounded-xl p-8 inset-shadow-2xs'>
                        <div className='w-full flex flex-row flex-wrap justify-between items-center gap-x-[60px] gap-y-[15px]'>
                            <div className='h-8 w-24 bg-gray-300 rounded'></div>
                            <div className='p-1.5 rounded-full bg-gray-300 flex flex-row justify-center items-center gap-2 max-w-[283px] w-full'>
                                <div className='h-6 w-20 rounded-full bg-white'></div>
                                <div className='h-6 w-20 rounded-full bg-transparent'></div>
                            </div>
                        </div>
                        <hr className='bg-gray-400 w-full mt-[35px]' />
                        <div className='flex flex-col gap-[30px] mt-[49px]'>
                            <div className='w-full h-12 bg-gray-300 rounded-md'></div>
                            <div className='w-full h-12 bg-gray-300 rounded-md'></div>
                            <div className='w-full h-12 bg-gray-300 rounded-md'></div>
                        </div>
                        <div className='w-full h-12 bg-gray-300 rounded-full mt-[50px]'></div>
                    </div>

                    {/* Placeholder for Lister profile card */}
                    <div className='max-w-[520px] w-full bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 inset-shadow-2xs'>
                        <div className='flex flex-row justify-start gap-[20px] items-center'>
                            <div className='h-[110px] w-[110px] rounded-full bg-gray-300'></div>
                            <div className='flex flex-col'>
                                <div className='h-6 w-32 bg-gray-300 rounded'></div>
                                <div className='h-4 w-24 bg-gray-300 rounded mt-1'></div>
                                <div className='h-4 w-40 bg-gray-300 rounded mt-[15px]'></div>
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-start gap-2 items-center mt-[30px] sm:mt-[34px] md:mt-[38px]'>
                            <div className='w-full h-12 bg-gray-300 rounded-full'></div>
                            <div className='h-12 w-12 bg-gray-300 rounded-full'></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholder for Map section */}
            <div className='w-full flex flex-col gap-[25px] sm:gap-[30px] md:gap-[38px] lg:gap-[49px] mt-[80px] sm:mt-[85px] md:mt-[100px] lg:mt-[115px]'>
                <div className='h-8 w-48 bg-gray-300 rounded'></div>
                <div className='w-full h-[350px] sm:h-[420px] md:h-[540px] lg:h-[620px] bg-gray-300 rounded-lg'></div>
                <hr className='w-full bg-gray-400 mt-[50px] sm:mt-[60px] md:mt-[70px]' />
            </div>

            {/* Placeholder for related spaces section */}
            <div className='w-full flex flex-col mt-[80px] sm:mt-[95px] md:mt-[105px] lg:mt-[112px]'>
                <div className='h-8 w-60 bg-gray-300 rounded'></div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    {[...Array(4)].map((_, index) => (
                        <SpaceCardSkeleton key={index} />
                    ))}
                </div>
            </div>

            {/* Placeholder for another related spaces section */}
            <div className='w-full flex flex-col mt-[76px]'>
                <div className='h-8 w-60 bg-gray-300 rounded'></div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    {[...Array(4)].map((_, index) => (
                        <SpaceCardSkeleton key={index} />
                    ))}
                </div>
            </div>

            {/* Placeholder for Quick Form */}
            <div className='mt-[90px] sm:mt-[100px] md:mt-[110px] lg:mt-[120px] mb-[70px] sm:mb-[80px] md:mb-[90px] lg:mb-[100px]'>
                <QuickFormSkeleton />
            </div>

        </section>
    );
};

export default PageSkeleton;