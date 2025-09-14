"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { usePathname } from "next/navigation";

/*Image & icon imports*/
import LOGO from "../../../public/rent_for_reel_icon.svg"
import { BsGlobe2 } from "react-icons/bs";
import { LiaBarsSolid } from "react-icons/lia";
import { TfiClose } from "react-icons/tfi";

const Navbar = () => {

    // State for Navigation Open and close
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    // Navigation Routes and Links
    const routes = [
        { label: "Home", href: "/" },
        { label: "Find your space", href: "/find-your-space" },
        { label: "List your space", href: "/list-your-space" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    ];
    // const pathname = usePathname();

    // Active state of routes
    // const [activeRoute, setActiveRoute] = useState("");

    return (
        <nav className='relative w-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-[10px] sm:pt-[14px] md:pt-[18px] lg:pt-[20px] gap-y-12'>

            {/* Top Nav with logo and Menu */}
            <nav className='relative w-full flex flex-row justify-between items-center'>

                <button className='hidden md:inline-flex bg-[#D9D9D9CC] p-3 rounded-full cursor-pointer hover:outline hover:outline-[#2C2C2C]'>
                    <BsGlobe2 className='text-base sm:text-[18px] md:text-[20px] lg:text-[22px] font-extralight' />
                </button>

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
                    <button className='py-2 px-4 rounded-full bg-[#D9D9D9] text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] cursor-pointer font-medium hover:bg-[#2C2C2C] hover:text-[#D9D9D9] transition-all ease-in-out duration-200'>
                        Get Advice
                    </button>

                    <button className='inline-block md:hidden bg-[#D9D9D9CC] p-3 rounded-full cursor-pointer hover:outline hover:outline-[#2C2C2C]' onClick={handleMenuToggle}>
                        {isOpen ? (<TfiClose className='text-[18px] sm:text-[20px] md:text-[22px]' />) : (<LiaBarsSolid className='text-[18px] sm:text-[20px] md:text-[22px]' />)}
                    </button>
                </div>
            </nav>

            {/* Bottom Navbar with Navigation Links */}
            <nav className='hidden md:flex flex-row justify-between items-center max-w-[1284px] w-full inset-shadow-sm
            shadow-md shadow-gray-400 rounded-full px-2 sm:px-2.5 py-[0.25rem]'>

                {/* Iterating over all the routes */}
                {routes.map(({ label, href }, index) => (
                    <Link href={href} key={index}>
                        <button
                            className={`py-5 px-6 sm:px-8 lg:px-12 rounded-full cursor-pointer text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] hover:shadow-[1px_1px_16px_gray] font-medium text-[#2C2C2C]`}
                        >
                            {label}
                        </button>
                    </Link>
                ))}

            </nav>

        </nav>
    )
}

export default Navbar
