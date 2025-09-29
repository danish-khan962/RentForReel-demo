import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8'>

        <div className='w-full h-[30vh] flex justify-center items-center'>
            <Link href={"https://rentforreel-lister-frontend.vercel.app/"}>
                <button className='bg-black py-3 px-10 font-medium rounded-lg cursor-pointer text-white transition-all duration-200 ease-in-out hover:bg-[#2C2C2C]'>
                    List Your Space
                </button>
            </Link>
        </div>

    </section>
  )
}

export default Page