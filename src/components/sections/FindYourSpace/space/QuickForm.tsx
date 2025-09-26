"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'


const imageIcons = [
    "/FindYourSpace/space/tea.png",
    "/FindYourSpace/space/couple.png",
    "/FindYourSpace/space/vacation.png",
    "/FindYourSpace/space/group.png",
    "/FindYourSpace/space/camera.png",
]

const QuickForm = () => {

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');  

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {  
        e.preventDefault();
    }

    return (
        <div className='max-w-[1500px] w-full mx-auto bg-[#FFFFFF] rounded-2xl border border-[#2C2C2C] flex flex-col xl:flex-row justify-between gap-x-[40px] gap-y-[60px] items-center px-4 sm:px-8 md:px-10 lg:px-14 py-2.5'>

            <div className='flex flex-col max-w-[1000px] xl:max-w-[622px] w-full'>
                <p className='font-extrabold text-[#BA181B] text-[38px] sm:text-[60px] md:text-[70px] lg:text-[85px] leading-[45px] sm:leading-[68px] md:leading-[76px] lg:leading-[94px]'>
                    Your Space. <br />
                    Your Purpose. <br />
                    We&apos;ll Find It.
                </p>

                <p className='mt-[25px] md:mt-[30px] text-[#BA181B] font-medium text-base sm:text-[17px] md:text-[18px] lg:text-[20px] max-w-[580px] w-full'>
                    Whether it&apos;s for a reel, a photo shoot, a workshop, or just a cozy meetup—we&apos;ll match you with spaces that fit your vibe.
                </p>

                <div className='max-w-[580px] w-full flex flex-row items-center gap-x-[10px] sm:gap-x-[15px] md:gap-x-[21px] lg:gap-x-[27px] mt-[70px] sm:mt-[80px] md:mt-[100px] lg:mt-[115px]'>
                    {
                        imageIcons.map((icon, index) => (
                            <Image
                                src={icon}
                                alt='icon'
                                height={1000}
                                width={1000}
                                className='h-[51px] w-[51px] sm:h-[72px] sm:w-[72px] md:h-[86px] md:w-[86px] lg:h-[92px] lg:w-[92px] object-contain'
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>


            {/* Form */}
            <form className='w-full lg:flex-1 shadow-[1px_1px_16px_gray] rounded-3xl flex flex-col justify-center items-center px-4 sm:px-5 md:px-6 lg:px-7 pt-5 sm:pt-6 md:pt-7 lg:pt-8 pb-7 sm:pb-8 md:pb-9 lg:pb-10 mt-[20px] mb-[30px]' onSubmit={handleSubmit}>
                <p className='font-semibold text-[#BA181B] text-[20px] sm:text-[22px] md:text-[23.5px] lg:text-[25px]'> Quick From </p>
                <p className='font-light text-[#BA181B] text-[15px] sm:text-base md:text-[18px] lg:text-[20px] mt-[-3px]'> One step closer to get your desired space </p>

                <div className='w-full flex flex-col gap-[30px] mt-[29px]'>
                    <input type="text" placeholder='Name*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Email*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Phone' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <div className='flex flex-row justify-center items-center gap-x-[15px] sm:gap-x-[25px] md:gap-x-[30px] lg:gap-x-[35px]'>
                        <input type="text" placeholder='Budget' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' />
                        <input type="text" placeholder='Purpose' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' />
                    </div>
                </div>

                <button className='w-full py-2 bg-[#BA181B] font-semibold text-[#FFFFFF] text-base sm:text-[17px] md:text-[18.5px] lg:text-[20px] rounded-md mt-[30px] hover:bg-transparent hover:outline  hover:outline-[#2c2c2c] hover:text-[#2C2C2C] transition-all ease-in-out duration-200 cursor-pointer hover:shadow-lg active:outline active:outline-[#2C2C2C] active:text-[#2C2C2C]'>
                    Find My Perfect Space
                </button>

                <p className='text-[#2C2C2C] font-medium mt-[22px] sm:mt-[30px] text-[14px] sm:text-base'> We&apos;ll get within 12 hrs </p>
            </form>

        </div>
    )
}

export default QuickForm
