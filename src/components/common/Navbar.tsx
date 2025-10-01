"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import QuickForm from '../sections/FindYourSpace/space/QuickForm'
import { usePathname } from 'next/navigation'

/*Image & icon imports*/
import LOGO from "../../../public/rent_for_reel_icon.svg"
import FAVICON from "../../../public/favicon.svg"
import { LiaBarsSolid } from "react-icons/lia";
import { TfiClose } from "react-icons/tfi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);

  const pathname = usePathname();

  const handleMenuToggle = () => setIsOpen(!isOpen);
  const handleAdviceToggle = () => setShowAdvice(!showAdvice);

  const routes = [
    { label: "Home", href: "/" },
    { label: "Find your space", href: "/find-your-space" },
    { label: "List your space", href: "/list-your-space" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav className='max-w-[1440px] w-full mx-auto relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-[10px] sm:pt-[14px] md:pt-[18px] lg:pt-[20px] gap-y-12'>

      {/* Top Nav */}
      <nav className='relative w-full flex flex-row justify-between items-center'>
        <Link href={"/"}>
          <Image
            src={FAVICON}
            alt='favicon'
            width={1000}
            height={1000}
            className='w-[28px] h-[30px] sm:w-[30px] sm:h-[32px] lg:w-[34px] lg:h-[36px]'
          />
        </Link>

        <Link href={"/"}>
          <Image
            src={LOGO}
            alt="rent for reel"
            height={1000}
            width={1000}
            className='h-auto w-[130px] sm:w-[140px] md:w-[150px] lg:w-[160px]'
          />
        </Link>

        <div className='flex flex-row gap-3'>
          <button
            onClick={handleAdviceToggle}
            className='hidden md:inline-block py-2 px-4 rounded-full bg-[#D9D9D9] text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] cursor-pointer font-medium hover:bg-[#2C2C2C] hover:text-[#D9D9D9] transition-all ease-in-out duration-200'
          >
            Get Advice
          </button>

          {/* Mobile Menu Toggle Button */}
          <button className='inline-block md:hidden bg-[#D9D9D9CC] p-3 rounded-full cursor-pointer hover:outline hover:outline-[#2C2C2C]' onClick={handleMenuToggle}>
            {isOpen ? (
              <TfiClose className='text-[18px] sm:text-[20px] md:text-[22px]' />
            ) : (
              <LiaBarsSolid className='text-[18px] sm:text-[20px] md:text-[22px]' />
            )}
          </button>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex flex-row justify-between items-center max-w-[1250px] w-full inset-shadow-sm shadow-md shadow-gray-400 rounded-full px-2 sm:px-2.5 py-[0.25rem]'>
        {routes.map(({ label, href }, index) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={index}>
              <button
                className={`py-3.5 px-6 sm:px-8 lg:px-12 rounded-full cursor-pointer text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-medium text-[#2C2C2C] ${
                  isActive ? 'shadow-[1px_1px_16px_gray]' : 'hover:shadow-[1px_1px_16px_gray]'
                }`}
              >
                {label}
              </button>
            </Link>
          );
        })}
      </nav>

      {/*  Mobile Slider Menu */}
      <div className={`fixed inset-0 z-50 bg-white text-[#2C2C2C] px-6 py-12 transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} transform`}>
        {/* Close Icon */}
        <div className="absolute top-6 right-6">
          <TfiClose className="w-6 h-6 cursor-pointer" onClick={handleMenuToggle} />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-6 h-full">
          {routes.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link href={href} key={label} onClick={handleMenuToggle}>
                <span
                  className={`py-3 px-8 sm:px-8 lg:px-12 rounded-full cursor-pointer text-[17px] font-medium text-[#2C2C2C] ${
                    isActive ? 'shadow-[1px_1px_16px_gray]' : 'hover:shadow-[1px_1px_16px_gray]'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          <hr className="w-full border-gray-300 my-4" />

          <button
            onClick={() => {
              handleMenuToggle();
              handleAdviceToggle();
            }}
            className='w-full max-w-[220px] py-3 px-8 rounded-full bg-[#D9D9D9] text-[#2C2C2C] text-sm font-medium hover:bg-[#2C2C2C] hover:text-white transition-all duration-200 cursor-pointer'
          >
            Get Advice
          </button>
        </div>
      </div>

      {/* Fullscreen Advice Overlay */}
      {showAdvice && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={handleAdviceToggle}
            className="fixed top-6 right-6 z-[101] text-[#2C2C2C] hover:text-gray-600"
            aria-label="Close Advice Overlay"
          >
            <TfiClose className="w-6 h-6 cursor-pointer" />
          </button>

          {/* Form Container */}
          <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 pt-20 pb-10 lg:h-screen lg:justify-center">
            <div className="w-full">
              <QuickForm />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
