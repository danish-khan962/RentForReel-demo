import React from 'react'
import Image from 'next/image'
import illustration404 from "../../public/404_illustration.png"
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { IoReturnDownBack } from "react-icons/io5";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"]
})

const NotFound = () => {
  return (
    <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-6 my-[30px] sm:my-[50x] md:my-[60px] lg:my-[75px]'>
        <div className='w-full h-full flex flex-col md:flex-row justify-center items-center gap-[30px] md:gap-[60px] lg:gap-[100px]'>

            <Image
            src={illustration404}
            alt='404 Error'
            width={1000}
            height={1000}
            className='max-w-[550px] w-full h-auto rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-2xl'
            />

            <div className='flex flex-col gap-6 justify-center items-center text-center md:justify-start md:items-start md:text-start text-[#2C2C2C]'>
                <h1 className={`${poppins.className} text-4xl`}> Whoops! Lost in the Reel? </h1>

                <p className='max-w-[500px] w-full text-center font-normal mt-[15px] md:text-start text-[14px] sm:text-[15px] md:text-base leading-snug text-gray-600'>
                    Looks like this space didn&apos;t make the listing. No worries — maybe the perfect place is just around the corner. Try searching again or head back to our homepage to find your next dream rental!
                </p>


                <Link href={"/"}>
                    <button className='bg-[#BA181B] text-[#FFFFFF] font-medium py-2.5 px-10 rounded-full mt-[20px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#2C2C2C] active:bg-[#2C2C2C] focus:bg-[#2C2C2C] flex flex-row gap-x-4 justify-center items-center'> 
                            <IoReturnDownBack className='text-[20px]'/>
                            <p>Take Me Home</p>
                     </button>
                </Link>
            </div>

        </div>
    </section>
  )
}

export default NotFound