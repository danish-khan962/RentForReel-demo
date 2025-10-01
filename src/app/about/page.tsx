import React from 'react'
import minimalist_pattern_bg from "../../../public/About/minimal_pattern_background.png"
import underline from "../../../public/About/underline.png"
import Image from 'next/image'
import LOGO from "../../../public/rent_for_reel_icon.svg"


const aboutUsData = [
  "In 2024, the idea for RentforReel was born out of a simple struggle every creator knows too well — finding the right space to create.",
  "What should have been an easy 30 sec reel turned into hours of frustration: bad acoustics, poor lighting, constant interruptions, and the unease of creating under judgemental eyes.",
  "When we looked for professional studios, the reality was clear: even in Mumbai, India’s creative hub, there were only a few decent options, most charging sky-high rates. The gap was undeniable.",
  "That’s when the vision behind RentforReel took shape. Why limit content creation to expensive studios when cafés, rooftops, yoga studios, kitchens, or even unused rooms could be transformed into creator-friendly spaces?",
  "Today, RentforReel is more than a platform — it’s a movement. We connect creators with unique, affordable locations while empowering locals to monetize unused spaces. Every corner can become a stage, every idea can find its setting, and creating doesn’t have to come with barriers.",
  "RentforReel exists so creators can focus on what matters most: making content that inspires, engages, and connects."
]

const Page = () => {
  return (
    <section className='relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 py-[40px]'>

      <div
        className='relative w-full flex justify-center items-center py-[30px]'
        style={{
          backgroundImage: `url(${minimalist_pattern_bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >

        <div className='bg-[#FFFFFF]/85 max-w-[1000px] w-full flex flex-col justify-center items-center text-center p-[15px] sm:p-[18px] md:p-[22px] lg:p-[25px] rounded-3xl border-l-8 border-l-[#BA181B] border-2 border-[#00000085]/60 shadow-2xl inset-shadow-2xs'>
          <div className='flex flex-row gapx-5 gap-y-6 justify-center items-center flex-wrap '>
            <div className='relative'>
              <h1 className='font-medium text-[#000000] text-[22px] sm:text-2xl md:text-3xl'> About Us - </h1>
              <Image
                src={underline}
                alt='underline'
                width={1000}
                height={1000}
                className='h-fit w-fit absolute top-[32px] right-2'
              />
            </div>
            <Image
              src={LOGO}
              alt='rent for reel logo'
              width={1000}
              height={1000}
              className='h-fit w-fit ml-[5px]'
            />
          </div>

          <div className='flex flex-col justify-center items-center text-center sm:text-start gap-5 leading-snug mt-[35px]'>
            {
              aboutUsData.map((data: string, idx: number) => (
                <p className='text-[#2C2C2C]/90 font-medium text-[14px] sm:text-[15px] md:text-base' key={idx}> {data} </p>
              ))
            }
          </div>
        </div>
      </div>

      <div className='h-[180px] w-[180px] bg-[#BA181B] rounded-full blur-[140px] opacity-30 sm:opacity-50 md:opacity-60 absolute top-10 right-5 z-0'></div>
      <div className='h-[180px] w-[180px] bg-[#BA181B] rounded-full blur-[140px] opacity-30 sm:opacity-50 md:opacity-60 absolute top-[50%] left-10 z-0'></div>

    </section>
  )
}

export default Page