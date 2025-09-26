"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { GiPhone } from "react-icons/gi";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SpaceCard from '@/components/sections/FindYourSpace/SpaceCard';
import QuickForm from '@/components/sections/FindYourSpace/space/QuickForm';

const LocationMap = dynamic(() => import('../../../components/sections/FindYourSpace/space/LocationMap'), {
    ssr: false,
});

// desc data
const desc = [
    { icon: "/FindYourSpace/space/area.png", title: "Area", desc: "1000 sq ft." },
    { icon: "/FindYourSpace/space/capacity.png", title: "Capacity", desc: "25+ people" },
    { icon: "/FindYourSpace/space/availability.png", title: "Availability", desc: "Flexible slots" },
]

// Amenities data
const amenities = [
    { icon: "/FindYourSpace/space/wifi.png", title: "WiFi" },
    { icon: "/FindYourSpace/space/air_conditioning.png", title: "Air conditioning" },
    { icon: "/FindYourSpace/space/lightning.png", title: "Lightning setup" },
    { icon: "/FindYourSpace/space/restroom.png", title: "Restroom" },
    { icon: "/FindYourSpace/space/seating_tables.png", title: "Seating & Tables" },
    { icon: "/FindYourSpace/space/parking.png", title: "Parking Nearby" },
]

//Rupee symbol
const rupee = "₹";

const Page = () => {

    // Form fields state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Form submission handler
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }


    // Toggling Hours and Days
    const [activeTab, setActiveTab] = useState<"Hours" | "Days">("Hours");

    return (
        <section className='max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[80px] sm:mt-[90px] md:mt-[100px] lg:mt-[110px]'>

            {/* Main space title */}
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col leading-snug'>
                    <h1 className='text-[#000000] font-semibold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px]'> Crazy Boho Studio </h1>
                    <p className='font-light text-[14px] sm:text-base md:text-[18px] lg:text-[20px]'> Goregaon Park, Pune </p>
                </div>
                <div className='flex flex-row gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5'>
                    <div className='h-[15px] w-[15px] sm:h-[18px] sm:w-[18px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px] rounded-full bg-[#D9D9D9]'></div>
                    <div className='h-[15px] w-[15px] sm:h-[18px] sm:w-[18px] md:w-[24px] md:h-[24px] lg:w-[28px]  lg:h-[28px] rounded-full bg-[#D9D9D9]'></div>
                </div>
            </div>

            {/* Bento Grid images */}
            <div className='w-full h-[250px] bg-fuchsia-200 rounded-4xl mt-[35px] sm:mt-[37px] md:mt-[40px]'>

            </div>

            {/* Details Box */}
            <div className='w-full flex flex-col lg:flex-row justify-between mt-[70px] sm:mt-[75px] md:mt-[80px] lg:mt-[90px] gap-y-[56px] gap-x-[40px]'>

                {/* Left side details */}
                <div className='w-full lg:w-[60%] max-w-[770px]'>

                    {/* Desc */}
                    <div className='flex flex-row gap-4 justify-between items-center'>
                        {desc.map((desc, idx) => (
                            <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]' key={idx}>
                                <div className='p-3 bg-[#D9D9D9]/30 rounded-lg flex justify-center items-center'>
                                    <Image
                                        src={desc.icon}
                                        alt='area'
                                        height={1000}
                                        width={1000}
                                        className='h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] rounded-lg' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-[15px] sm:text-base md:text-[17px] lg:text-[18px] text-[#2C2C2C]'> {desc.title} </p>
                                    <p className='text-[#2C2C2CB2] font-light text-base sm:text-[17px] md:text-[18px] lg:text-[20px]'> {desc.desc} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className='flex flex-col mt-[45px] sm:mt-[50px] md:mt-[55px] lg:mt-[60px] text-start'>
                        <h2 className='font-semibold text-[#BA181B] text-base sm:text-[18px] md:text-[20px] lg:text-[22px]'> Highlights </h2>
                        <ul className='flex flex-col list-disc disc-inside mt-[15px] sm:mt-[20px] ml-4'>
                            <li className='text-[14px] sm:text-base md:text-[17px] lg:text-[18px] font-light text-[#000000]'> Fully furnished boho-style studio </li>
                            <li className='text-[14px] sm:text-base md:text-[17px] lg:text-[18px] font-light text-[#000000]'> Perfect for photoshoot, reels, workshops & small events </li>
                            <li className='text-[14px] sm:text-base md:text-[17px] lg:text-[18px] font-light text-[#000000]'> Easy access to Goregaon Park, Pune </li>
                        </ul>
                    </div>

                    {/* About this space */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px] text-start py-[35px] md:py-[50px] border-t border-b border-[#2C2C2CAB]'>
                        <h2 className='text-[#2C2C2C] font-semibold text-[25px] sm:text-[28px] md:text-[30px] lg:text-[33px]'> About this Space </h2>
                        <p className='max-w-[717px] w-full text-[#2C2C2C] font-light text-[15px] sm:text-base md:text-[17.5px] lg:text-[19px] mt-[22px] leading-tight'>
                            Cozy Boho Studio is a creative hub designed for artists, creators, and brands who want a unique backdrop for their content. Whether you&apos;re planning a photoshoot, a music reel, or a small event, this space offers the perfect blend of comfort and aesthetics. Its earthy interiors, wall art, and flexible seating make it a favorite for creators in Pune.
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px]'>
                        <h2 className='text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#2C2C2C] font-semibold'> Amenities </h2>
                        <div className='w-full flex flex-row flex-wrap gap-[15px] md:gap-[20px] mt-[34px]'>
                            {
                                amenities.map((amenity, idx) => (
                                    <span className='flex flex-row items-center gap-[10px] bg-[#D9D9D969] py-1.25 px-4 sm:py-1.5 sm:px-6 md:py-2 md:px-8 lg:py-2.5 lg:px-10 rounded-full' key={idx}>
                                        <Image
                                            src={amenity.icon}
                                            alt='wifi'
                                            height={1000}
                                            width={1000}
                                            className='w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] md:w-[27px] md:h-[27px] lg:w-[28px] lg:h-[28px]'
                                        />
                                        <p className='font-normal text-[#000000] text-[15px] sm:text-base md:text-[18px] lg:text-[20px]'> {amenity.title} </p>
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                </div>

                {/* Right side details */}
                <div className='w-full lg:w-[40%] max-w-[820px] flex flex-col justify-center lg:justify-between items-center gap-y-[40px] md:gap-y-[60px]'>
                    {/* Form */}
                    <form className='max-w-[820px] w-full bg-[#FFFFFF] shadow-xl rounded-xl p-8 inset-shadow-2xs' onSubmit={handleFormSubmit}>
                        <div className='w-full flex flex-row flex-wrap justify-between items-center gap-x-[60px gap-y-[15px]'>
                            <h2 className='text-[#2C2C2C] font-semibold text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px]'> {rupee}1000/ </h2>

                            <div className="p-1.5 rounded-full bg-[#D9D9D9] flex flex-row justify-center items-center gap-[10px] max-w-[283px] w-full">
                                {["Hours", "Days"].map((tab) => (
                                    <p
                                        key={tab}
                                        onClick={() => setActiveTab(tab as "Hours" | "Days")}
                                        className={`${activeTab === tab ? "bg-white" : "bg-transparent"
                                            } font-semibold text-[14px] sm:text-[15px] md:text-base lg:text-[17px] py-1.5 px-10 rounded-full cursor-pointer hover:bg-white/90 transition-all ease-in-out duration-200`}
                                    >
                                        {tab}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <hr className='bg-[#2C2C2C] w-full mt-[35px]' />

                        <div className='flex flex-col gap-[30px] mt-[49px]'>
                            <input type="text" placeholder='Name*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='Email*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder='Phone' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <button className='w-full bg-[#BA181B] rounded-full mt-[50px] font-medium text-base sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#FFFFFF] py-2.5 sm:py-3 md:py-3.5 lg:py-4 cursor-pointer hover:bg-[#2C2C2C] transition-all ease-in-out duration-200'> Enquire Now </button>
                    </form>

                    {/* Lister profile card */}
                    <div className='max-w-[520px] w-full bg-[#FFFFFF] shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 inset-shadow-2xs'>
                        <div className='flex flex-row gap-[20px] items-center'>
                            <Image
                                src={"/FindYourSpace/space/lister_profile.png"}
                                alt='lister profile'
                                height={1000}
                                width={1000}
                                className='h-[60px] w-[60px] sm:h-[75px] sm:w-[75px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] rounded-full'
                            />

                            <div className='flex flex-col'>
                                <p className='text-[#BA181B] font-semibold text-base sm:text-[17px] md:text-[18px] lg:text-[20px]'> Meet Anjali </p>
                                <p className='text-[#2C2C2C] font-normal text-[14px] md:text-base mt-[-3px]'> Owner of the Property </p>
                                <p className='text-[#2C2C2C80] font-semibold text-base sm:text-[17px] md:text-[18px] lg:text-[20px] mt-[15px] leading-tight'> Hosting creators & workshops for 3+ years </p>
                            </div>
                        </div>
                        <div className='w-full flex flex-row gap-2 items-center mt-[30px] sm:mt-[34px] md:mt-[38px]'>
                            <Link href={"phone:7894657831"}>
                                <button className='w-full py-2 px-10 sm:px-14 lg:px-20 flex flex-row justify-center items-center gap-2 bg-[#BA181B] rounded-full cursor-pointer hover:bg-[#2C2C2C] transition-all ease-in-out duration-200'>
                                    <GiPhone className='text-[25px] sm:text-[28px] md:text-[30px] lg:text-[33px] text-[#F8F9FA]' />
                                    <span className='font-medium text-[14px] sm:text-base lg:text-[18px] text-[#F8F9FA]'> +91 7894657831 </span>
                                </button>
                            </Link>
                            <Link href={"#"}>
                                <Image
                                    src={"/FindYourSpace/space/whatsapp.png"}
                                    alt='whatsapp'
                                    height={1000}
                                    width={1000}
                                    className='h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] md:w-[40px] md:h-[40px] lg:w-[46px] lg:h-[46px] cursor-pointer hover:scale-110 hover:rotate-[-10deg] transition-all ease-in-out duration-200'
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Map section */}
            <div className='w-full flex flex-col gap-[25px] sm:gap-[30px] md:gap-[38px] lg:gap-[49px] mt-[80px] sm:mt-[85px] md:mt-[100px] lg:mt-[115px]'>
                <p className='text-[#2C2C2C] font-semibold text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px]'> Where you'll be </p>
                <div className='w-full h-[350px] sm:h-[420px] md:h-[540px] lg:h-[620px]'>
                    <LocationMap />
                </div>
                <hr className='w-full bg-[#2C2C2CAB] mt-[50px] sm:mt-[60px] md:mt-[70px]' />
            </div>

            {/* Cozy spaces in Nagpur */}
            <div className='w-full flex flex-col mt-[80px] sm:mt-[95px] md:mt-[105px] lg:mt-[112px]'>
                <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Cozy spaces in Nagpur </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    <SpaceCard />
                    <SpaceCard />
                    <SpaceCard />
                    <SpaceCard />
                </div>
            </div>

            {/* Most popular places in Mumbai */}
            <div className='w-full flex flex-col mt-[76px]'>
                <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Most popular places in Mumbai </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    <SpaceCard />
                    <SpaceCard />
                    <SpaceCard />
                    <SpaceCard />
                </div>
            </div>


            {/* Quick Form */}
            <div className='mt-[90px] sm:mt-[100px] md:mt-[110px] lg:mt-[120px] mb-[70px] sm:mb-[80px] md:mb-[90px] lg:mb-[100px]'>
                <QuickForm />
            </div>

        </section>
    );
};

export default Page;
