"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
// import { usePathname } from 'next/navigation';

/* Image and icons import*/
import FAVICON from "../../../public/favicon.svg";
import LOGO from "../../../public/rent_for_reel_icon.svg";
import { LiaCopyrightSolid } from "react-icons/lia";
import { BsGlobe2 } from 'react-icons/bs';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { PiInstagramLogoFill, PiFacebookLogoFill, PiXLogo } from "react-icons/pi";

// Data for Footer
const footerData = [
  {
    heading: "For creators",
    navigations: [
      { label: "Browse Spaces", href: "/browse-spaces" },
      { label: "Popular Locations", href: "/popular-locations" },
      { label: "Pricing Plans", href: "/pricing-plans" },
      { label: "Book a Space", href: "/book-a-space" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "For studio owners",
    navigations: [
      { label: "List Your Studio", href: "/list-your-studio" },
      { label: "Studio Owner Dashboard", href: "/studio-owner-dashboard" },
      { label: "Pricing & Policies", href: "/pricing-policies" },
      { label: "Help for Owners", href: "/help-for-owners" },
    ],
  },
  {
    heading: "Rent for reel",
    navigations: [
      { label: "About Us", href: "/about-us" },
      { label: "Career", href: "/career" },
      { label: "Blog", href: "/blog" },
      { label: "Press & Media", href: "/press-media" },
    ],
  },
  {
    heading: "Support",
    navigations: [
      { label: "Help Center", href: "/help-center" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Report an issue", href: "/report-issue" },
    ],
  },
  {
    heading: "Legal",
    navigations: [
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cancellation & Refund Policy", href: "/cancellation-refund-policy" },
      { label: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
];


const Footer = () => {

  // const pathname = usePathname();

  // Get latest year
  var year =  new Date().getFullYear(); // Updates the current latest year in footer copyright section

  return (
    <footer className='relative w-screen flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pt-[30px] sm:pt-[40px] md:pt-[50px] lg:pt-[60px] pb-[25px] sm:pb-[32px] md:pb-[36px] lg:pb-[40px] bg-[#D9D9D9] mt-6'>

      {/* Favicon and Rent for reel - logo */}
      <div className='flex flex-row justify-start items-center gap-4'>
        <Image
          src={FAVICON}
          alt={"favicon"}
          width={1000}
          height={1000}
          className='h-[30px] w-[28px] sm:h-[32px] sm:w-[30px] md:h-[34px] md:w-[32px] lg:h-[36px] lg:w-[34px]'
        />

        <Image
          src={LOGO}
          alt={"rent for reel"}
          width={1000}
          height={1000}
          className='h-auto w-[130px] sm:w-[140px] md:w-[150px] lg:w-[160px]'
        />
      </div>



      {/* Footer Navigation Grid */}
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-0 md:gap-x-16 gap-y-10 mt-[40px] sm:mt-[50px] md:mt-[65px] lg:mt-[75px] xl:mt-[85px]'>
        {/* GRID  */}

        {
          footerData.map((navigationData, index) => (
            <div className='flex flex-col' key={index}>
              <h4 className='text-[14px] md:text-[15px] font-semibold text-[#000000] capitalize'> {navigationData.heading} </h4>

              <ul className='mt-[14px]'>
                {navigationData.navigations.map((link, idx) => (
                  <li className='text-[14px] md:text-[15px] font-light text-[#000000] hover:underline' key={idx}><Link href={link.href}> {link.label} </Link></li>
                ))}
              </ul>
            </div>
          ))
        }

      </div>



      {/* Breaking Line */}
      <hr className='h-[0.5px] bg-black w-full mt-[60px] sm:mt-[70px] md:mt-[80px] lg:mt-[90px] "bg-[linear-gradient(to_bottom,_rgba(95,95,95,0.2),_#2C2C2C,_rgba(95,95,95,0.2))]"' />


      {/* Copyright Banner */}
        <div className='w-full flex flex-col sm:flex-row justify-start items-start sm:justify-between mt-[25px] sm:mt-[28px] md:mt-[32px] lg:mt-[35px] gap-3'>
          {/* Copyright year and brand name */}
          <div className='flex justify-center items-center gap-1'>
            <span className='text-[20px]'> <LiaCopyrightSolid /> </span>
            <p className='text-[14px] sm:text-[15px] font-semibold'> {year} RentForReel, Inc.</p>
          </div>

          {/* Social Icons and selected language */}
          <div className='flex flex-row justify-between  sm:justify-center items-center gap-x-10'>
            <div className='flex justify-center items-center gap-3'>
              <span className='text-[20px]'> <BsGlobe2 /> </span>  
              <p className='text-[14px] sm:text-[15px] font-semibold'> English ( IN ) </p>          
            </div>

            <div className='flex flex-row gap-7'>
              <div className='flex justify-center items-center gap-0.5'>
                <span> <MdOutlineCurrencyRupee /> </span>
                <p className='text-[14px] sm:text-[15px] font-semibold'> INR </p>
              </div>

              <div className='flex flex-row gap-x-3.5'>
                <li className='text-[22px] cursor-pointer hover:scale-125 transition-all ease-in-out duration-200 hover:rotate-[-10deg]'><Link href={"/"}> <PiInstagramLogoFill /> </Link></li>
                <li className='text-[22px] cursor-pointer hover:scale-125 transition-all ease-in-out duration-200'><Link href={"/"}> <PiFacebookLogoFill /> </Link></li>
                <li className='text-[22px] cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 hover:rotate-[10deg]'><Link href={"/"}> <PiXLogo /> </Link></li>
              </div>
            </div>
          </div>
        </div>


    </footer >
  )
}

export default Footer
