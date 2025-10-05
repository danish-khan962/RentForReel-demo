import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiArrowLongRight } from 'react-icons/hi2'
import LOGO from "../../../public/rent_for_reel_icon.svg"
import Marquee from "react-fast-marquee"
import FAQ from '@/components/sections/Home/FAQ';
import phoneGIF from "../../../public/ListYourSpace/phone_ring.gif"


const summaryBlock = [
  { icon: "/ListYourSpace/icon_1.png", numbers: "10,000+", subtitle: "Creator's Spaces" },
  { icon: "/ListYourSpace/icon_2.svg", numbers: "20,000,00+", subtitle: "Customers Interest" },
  { icon: "/ListYourSpace/icon_3.svg", numbers: "54,000,0000+", subtitle: "Rent Revenue" },
]

const gridSummaryData = [
  { title: "Built for Creators", content: "RentforReel is India’s first platform made just for creators. While Airbnb focuses on travel stays, we solve the shortage of content-friendly spaces. From reels to shoots, creators often struggle with finding professional yet affordable places. Our solution? A simple platform that unlocks unique, private spaces designed for production. It’s time to stop hunting for spots and start creating with ease." },
  { title: "Studios from Everyday Spaces", content: "Why should studios only be big, expensive setups? At RentforReel, we turn everyday spaces like cafes, rooftops, gyms, and kitchens into creator-ready studios. We empower people to earn by listing what they already have, while giving creators authentic, versatile backdrops. It’s a new way to make money and a smarter way to create content, powered by community and creativity." },
  { title: "Quiet. Aesthetic. Yours.", content: "Public spaces are noisy, crowded, and full of distractions. RentforReel changes that by offering private, aesthetic, and judgment-free spaces where creators can work in peace. Every venue is carefully curated to provide comfort, visual appeal, and a professional vibe. Whether it’s a reel, vlog, or podcast, our spaces make creation effortless. Because true creativity thrives best in environments built for focus." },
  { title: "Create. Earn. Repeat.", content: "RentforReel is designed to empower both sides of creation. For space owners, it’s an easy way to earn — list once and unlock passive income from unused spots. For creators, it’s affordable access to unique, ready-to-use spaces without long-term commitments. The formula is simple: create anywhere, earn everywhere. A win-win ecosystem where every space holds potential, and every creator finds opportunity." },
]


const spaceImages = ["/ListYourSpace/source_1.jpg", "/ListYourSpace/source_2.jpg", "/ListYourSpace/source_3.jpg"]

const Page = () => {
  return (
    <section className='relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[50px] mb-[100px]'>

      <div className='relative w-full flex flex-col-reverse md:flex-row justify-between items-center bg-gradient-to-r from-[#ba181b] to-[#93291e] rounded-2xl sm:rounded-3xl md:rounded-4xl'>
        <div className='flex flex-col max-w-[650px] w-full justify-center items-center text-center sm:justify-start sm:items-start sm:text-start p-4 sm:p-6 md:p-8 lg:p-10'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFFFFF]'> Turn Your Space Into a Creator’s Playground </h1>
          <p className='text-[#D9D9D9]/85 font-medium text-[14px] sm:text-[15px] md:text-base leading-snug mt-[25px]'>
            Join the RentforReel movement and help creators find unique, affordable locations to shoot content — from cozy cafés to rooftops, kitchens, or yoga studios. Got a space? List it and start earning.
          </p>

          <Link href={"https://rentforreel-lister-frontend.vercel.app/"}>
            <button className='bg-[#FFFFFF] cursor-pointer text-[15px] md:text-base lg:text-[17px] font-medium text-[#2C2C2C] py-2 px-8  sm:px-10 md:py-2.5 md:px-12 rounded-full transition-all ease-in-out duration-200 hover:bg-[#2C2C2C]/90 hover:text-[#FFFFFF] mt-[40px] flex flex-row justify-center items-center gap-x-3.5 otuline outline-[#2C2C2C] hover:outline-none'>
              <span> List Your Space </span>  <HiArrowLongRight className='text-[25px] sm:text-[30px]' />
            </button>
          </Link>
        </div>

        <Image
          src={"/ListYourSpace/home_bg.png"}
          alt='home alt'
          width={1000}
          height={1000}
          className='w-fit h-fit object-cover bg-no-repeat bg-center text-[20px] md:text-[22px] '
        />
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-12 sm:justify-between sm:items-center bg-[#FFFFFF] py-10 px-8 sm:px-10 md:px-12 shadow-xl inset-shadow-2xs rounded-2xl md:rounded-3xl mt-[40px] md:mt-[50px] lg:mt-[55px]'>
        {
          summaryBlock.map((data, idx) => (
            <div className='relative flex flex-row gap-6 items-center' key={idx}>
              <Image src={data.icon} alt='space icon' width={1000} height={1000} className='h-[50px] w-auto' />
              <div className='flex flex-col'>
                <p className='text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-bold text-[#2C2C2C]'> {data.numbers} </p>
                <p className='font-medium text-[14px] sm:text-[15px] md:text-base lg:text-[17px] text-[#2C2C2C]/95 leading-snug'> {data.subtitle} </p>
              </div>

              <div className='h-[30px] w-[30px] bg-[#BA181B] blur-[30px] absolute left-5 bottom-0 z-0'></div>
            </div>
          ))
        }
      </div>


      <div className='w-full flex flex-col justify-center items-center text-center mt-[75px] sm:mt-[85px] md:mt-[90px] lg:mt-[120px]'>
        <h1 className='font-bold text-[#2C2C2C] text-[23px] sm:text-[26px] md:text-[30px] lg:text-[35px] leading-snug '> List Your Space Today </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[25px] mt-8 sm:mt-10 md:mt-12'>
          {
            gridSummaryData.map((item, index) => (
              <div className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 shadow-[1px_1px_16px_#D9D9D9] rounded-2xl md:rounded-3xl lg:rounded-4xl justify-start items-start text-start bg-[#FFF5D1]/50' key={index}>
                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] font-semibold text-[#BA181B] '> {item.title} </h1>
                <p className='text-[14px] sm:text-[15px] md:text-base leading-snug text-[#2C2C2C]/75'> {item.content} </p>
              </div>
            ))
          }
        </div>
        <Link href={"https://rentforreel-lister-frontend.vercel.app/"}>
          <button className='bg-[#FFFFFF] cursor-pointer text-[15px] md:text-base lg:text-[17px] font-medium text-[#2C2C2C] py-2 px-8 sm:px-10 md:py-2.5 md:px-12 rounded-full transition-all ease-in-out duration-200 hover:bg-[#2C2C2C]/90 hover:text-[#FFFFFF] mt-[50px] flex flex-row justify-center items-center gap-x-3.5 outline outline-[#2C2C2C] hover:outline-none'>
            <span> List Your Space </span>  <HiArrowLongRight className='text-[25px] sm:text-[30px]' />
          </button>
        </Link>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center md:justify-between gap-x-[100px] gap-y-[50px] mt-[80px] sm:mt-[90px] md:mt-[110px] lg:mt-[120px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl rounded-4xl'>
        <div className='max-w-[600px] w-full'>
          <Image
            src={"/ListYourSpace/home2_bg.png"}
            alt='home 2 alt'
            height={1000}
            width={1000}
            className='w-full h-auto object-cover bg-center bg-no-repeat '
          />
        </div>
        <div className='flex-1 justify-center items-center text-center md:justify-start md:items-start md:text-start'>
          <h1 className='font-bold text-[#2C2C2C] text-[23px] sm:text-[26px] md:text-[30px] lg:text-[35px] leading-snug '> The Reel Story </h1>
          <p className='leading-snug text-[#2c2c2c]/80 font-medium text-[14px] sm:text-[15px] md:text-base mt-[25px] sm:mt-[30px]'>
            We started RentforReel in 2024, not as a company, but as a response to a problem we knew all too well. As creators ourselves, we faced the same struggle countless others do—trying to find the right space to bring a simple idea to life. What should have been a quick reel often turned into hours of frustration: poor lighting, bad acoustics, constant distractions, and the uneasy feeling of being watched or judged. We searched for professional studios, hoping for a solution, but even in a city as vibrant as Mumbai, the options were few—and far too expensive. That’s when we asked ourselves: why should content creation be limited to four walls of a high-end studio? Why not transform everyday spaces—like cafés, rooftops, kitchens, or even someone’s spare room—into inspiring, creator-friendly locations? And that’s how RentforReel came to life. We built a platform that connects creators with unique, affordable spaces, while helping local hosts earn by sharing the spaces they already have. Today, we’re more than just a listing site—we’re a growing community built on creativity, accessibility, and opportunity. Our mission is simple: to make space for creators everywhere, so that nothing stands between an idea and the moment it comes to life.
          </p>
          <div className='w-full flex flex-row items-baseline justify-end gap-4 mt-[25px] md:mt-[30px]'>
            <p className='font-extrabold text-[#BA181B]'> ........ </p>
            <div>
              <Image
                src={LOGO}
                alt='rent for reel icon'
                width={1000}
                height={1000}
                className='h-fit w-fit'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row justify-center items-center md:justify-start mt-[80px] sm:mt-[95px] md:mt-[110px] lg:mt-[125px] gap-x-[50px] gap-y-[50px]'>
        <div className='max-w-[650px] w-full bg-gradient-to-r from-[#ba181b] to-[#93291e] rounded-2xl md:rounded-3xl lg:rounded-4xl p-4 sm:p-6 md:p-8 lg:p-10'>
          <p className='text-[#FFFFFF] font-semibold text-xl sm:text-2xl md:text-3xl'> Ready to List? </p>
          <p className='text-[#D9D9D9]/85 font-medium text-[14px] sm:text-[15px] md:text-base leading-snug mt-[15px]'> Turn your unused space into income—start listing now with Rent For Reel and reach renters instantly. </p>
          <Link href={"https://rentforreel-lister-frontend.vercel.app/"}>
            <button className='bg-[#FFFFFF] cursor-pointer text-[15px] md:text-base lg:text-[17px] font-medium text-[#2C2C2C] py-2 px-8 sm:px-10 md:py-2.5 md:px-12 rounded-full transition-all ease-in-out duration-200 hover:bg-[#2C2C2C]/90 hover:text-[#FFFFFF] mt-[25px] flex flex-row justify-center items-center gap-x-3.5 outline outline-[#2C2C2C] hover:outline-none'>
              <span> List Your Space </span>  <HiArrowLongRight className='text-[25px] sm:text-[30px]' />
            </button>
          </Link>
        </div>

        {/* Spaces Carousel */}
        <div className='w-full h-[350px] rounded-2xl overflow-hidden mt-6'>
          <Marquee speed={40} pauseOnHover={false} gradient={true} gradientWidth={25} >
            {spaceImages.map((imgSrc, index) => (
              <div key={index} className='w-full h-[350px] flex flex-row px-1'>
                <Image
                  src={imgSrc}
                  alt={`space ${index + 1}`}
                  width={1000}
                  height={1000}
                  className='w-full h-full object-cover bg-no-repeat bg-center rounded-2xl shadow-md'
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <div>
        <FAQ title='Frequently Asked Questions' />
      </div>

      <div className='relative w-full flex justify-center items-center mt-[60px]'>
        <div className='bg-[#BA181B] h-[120px] w-[300px] blur-[50px] opacity-50 absolute left-0 top-10 z-0'></div>
        <div className='bg-[#BA181B] h-[120px] w-[300px] blur-[50px] opacity-50 absolute right-0 top-10 z-0'></div>
        <div className='bg-[#FFF5D1] h-[120px] max-w-[800px] w-full blur-[50px] absolute left-1/2 -translate-x-1/2 z-10 top-10'></div>

        <Link href={"https://rentforreel-lister-frontend.vercel.app/"}>
          <button className='relative z-20 bg-[#FFFFFF] cursor-pointer text-[15px] md:text-base lg:text-[17px] font-medium text-[#2C2C2C] py-2 px-8 sm:px-10 md:py-2.5 md:px-12 rounded-full transition-all ease-in-out duration-200 hover:bg-[#2C2C2C]/90 hover:text-[#FFFFFF] mt-[100px] flex flex-row justify-center items-center gap-x-3.5 outline outline-[#2C2C2C] hover:outline-none'>
            <span> List Your Space </span>  <HiArrowLongRight className='text-[25px] sm:text-[30px]' />
          </button>
        </Link>
      </div>


      <div className='w-[55px] h-[55px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[85px] lg:h-[85px] rounded-full fixed top-[600px] right-5 sm:right-8 shadow-[1px_1px_16px_#2C2C2C] z-10'>
            <Link href={"tel:1253465203"}>
              <Image
              src={phoneGIF}
              alt='phone gif'
              width={1000}
              height={1000}
              className='w-full h-full rounded-full'
              />
            </Link>
      </div>


    </section>
  )
}

export default Page