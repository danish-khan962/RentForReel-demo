'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { GiPhone } from "react-icons/gi";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SpaceCard from '@/components/sections/FindYourSpace/SpaceCard';
import QuickForm from '@/components/sections/FindYourSpace/space/QuickForm';
import { useParams } from 'next/navigation';
import myQueries from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PageSkeleton from './PageSkeleton';
import ImageGalleryModal from '@/components/sections/FindYourSpace/space/ImageGalleryModal';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const LocationMap = dynamic(() => import('../../../components/sections/FindYourSpace/space/LocationMap'), {
    ssr: false,
});

interface Space {
    id: string;
    nameOfSpace: string;
    city: string;
    state: string;
    area: string;
    capacity: string;
    availability: string;
    highlights: string[];
    aboutSpace: string;
    selectedAmenities: string[];
    priceHour: number;
    priceDay: number;
    images: string[];
    authId: string;
    contactNumber?: string;
    whatsappNumber?: string;
    user?: {
        profileImg?: string;
        fullName?: string;
        bio?: string;
    };
}


// Amenities icons
const amenityToIconMap: { [key: string]: string } = {
    "wifi": "/FindYourSpace/space/wifi.png",
    "air-conditioning": "/FindYourSpace/space/air_conditioning.png",
    "lightning setup": "/FindYourSpace/space/lightning.png",
    "restroom": "/FindYourSpace/space/restroom.png",
    "seating & tables": "/FindYourSpace/space/seating_tables.png",
    "parking nearby": "/FindYourSpace/space/parking.png",
    // For now, fallback to wifi.png for unknown ones
    "house hold": "/FindYourSpace/space/wifi.png",
    "power backup": "/FindYourSpace/space/wifi.png",
    "cctv": "/FindYourSpace/space/wifi.png",
    "geyser": "/FindYourSpace/space/wifi.png",
    "24x7 security": "/FindYourSpace/space/wifi.png",
    "tv": "/FindYourSpace/space/wifi.png",
    "kitchen": "/FindYourSpace/space/wifi.png",
};


//Rupee symbol
const rupee = "₹";

const Page = () => {
    const params = useParams<{ space: string }>();
    const spaceId = params.space;

    const router = useRouter();

    // 1. Query for the current space details
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['space', spaceId],
        queryFn: () => myQueries.getSpaceById(spaceId),
        enabled: !!spaceId,
    });

    const spaceData = data?.data;

    // 2. Query for related spaces based on city/state
    const { data: relatedSpacesData, isLoading: isLoadingRelated } = useQuery({
        queryKey: ['relatedSpaces', spaceData?.city, spaceData?.state],
        queryFn: () => myQueries.getSpaces({
            city: spaceData?.city,
            state: spaceData?.state,
        }),
        // Only fetch related spaces once the main space data is available
        enabled: !!spaceData && !!spaceData.city && !!spaceData.state,
    });

    // Filter out the current space from the related list
    const allRelatedSpaces = relatedSpacesData?.data?.listings || [];
    const relatedSpaces = allRelatedSpaces.filter((space: Space) => space.id !== spaceId);

    // --- State and Form Logic ---
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Strict form validation
        // Checking for a minimum of 3 characters/letters ---
        if (name.trim().length < 3) {
            toast.error("Name must contain at least 3 letters.");
            return;
        }

        if (!email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Use a regular expression to validate a 10-digit phone number
        const phoneRegex = /^\d{10}$/;
        if (phone && !phoneRegex.test(phone)) {
            toast.error("Phone number must be exactly 10 digits.");
            return;
        }

        if (!spaceData || !spaceData.authId) {
            toast.error("Space data is not available yet. Please try again.");
            return;
        }

        const submissionPayload = {
            name,
            email,
            phone,
            spaceId: spaceId,
            authId: spaceData.authId,
        };

        // Log the data being submitted
        console.log("Submitting Enquiry with Payload:", submissionPayload);

        try {
            setIsSubmitting(true);

            const response = await myQueries.sendEnquiry(submissionPayload);

            if (response.success) {
                toast.success("Enquiry submitted successfully!");
                setName("");
                setEmail("");
                setPhone("");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Enquiry submission error:", err);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const [activeTab, setActiveTab] = useState<"Hours" | "Days">("Hours");

    const getBentoGridClasses = (imageCount: number) => {
        if (imageCount === 4 || imageCount === 5) {
            // Use 4 columns grid by default (md and up)
            return 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 grid-rows-4 sm:grid-rows-4 gap-2 sm:gap-2';
        }

        switch (imageCount) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-3 grid-rows-2';
            default:
                return 'grid-cols-2 md:grid-cols-3';
        }
    };


    const getBentoItemClasses = (index: number, totalImages: number) => {
        if (totalImages === 5) {
            switch (index) {
                case 0:
                    // Mobile: original smaller first image style
                    // sm and up: extended width first image
                    return 'col-start-1 row-start-1 row-span-4 sm:col-span-2 sm:col-start-1';
                case 1:
                    return 'col-start-2 row-start-1 row-span-2 sm:col-start-3';
                case 2:
                    return 'col-start-2 row-start-3 row-span-2 sm:col-start-3';
                case 3:
                    return 'col-start-3 row-start-1 row-span-2 sm:col-start-4';
                case 4:
                    return 'col-start-3 row-start-3 row-span-2 sm:col-start-4';
                default:
                    return '';
            }
        }

        if (totalImages === 4) {
            switch (index) {
                case 0:
                    // Mobile: smaller first image
                    // sm and up: extended width first image
                    return 'col-start-1 row-start-1 row-span-4 sm:col-span-2 sm:col-start-1';
                case 1:
                    return 'col-start-2 row-start-1 row-span-2 sm:col-start-3';
                case 2:
                    return 'col-start-2 row-start-3 row-span-2 sm:col-start-3';
                case 3:
                    return 'col-start-3 row-start-1 row-span-4 sm:col-start-4';
                default:
                    return '';
            }
        }

        // Other counts remain unchanged
        if (totalImages === 3 && index === 0) return 'col-span-2 row-span-2';
        if (totalImages === 4 && index === 0) return 'col-span-2 row-span-2';
        if (totalImages >= 5 && index === 0) return 'col-span-2 row-span-2';

        return '';
    };


    // IMAGE GALLERY
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsGalleryOpen(true);
    };

    const handleCloseGallery = () => {
        setIsGalleryOpen(false);
    };

    const handleViewAllClick = () => {
        setSelectedImageIndex(0);
        setIsGalleryOpen(true);
    };


    if (isLoading) {
        return (
            <PageSkeleton />
        );
    }

    if (isError || !spaceData) {
        return (
            <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[80px] h-screen flex flex-col justify-center items-center'>
                <p className='text-xl text-[#BA181B] font-semibold'>Error loading space data or space not found.</p>
                <p className='text-gray-500 mt-2'>Please check the ID and try again.</p>
            </section>
        );
    }
    // --- End Loading State Handling ---


    return (
        <section className='max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[50px] sm:mt-[65px] md:mt-[70px]'>

            {/* Main space title */}
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col leading-snug'>
                    <h1 className='text-[#000000] font-semibold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px]'> {spaceData.nameOfSpace} </h1>
                    <p className='font-light text-[14px] sm:text-base md:text-[18px] lg:text-[20px]'> {spaceData.city}, {spaceData.state} </p>
                </div>
                {/* Get back to porevious page */}
                <div 
                className='flex flex-row items-center bg-[#2C2C2C] p-2 text-[#FFFFFF] rounded-full cursor-pointer'
                onClick={router.back}
                >
                    <FaArrowLeftLong className='text-[18px] sm:text-[20px] lg:text-[22px]'/>
                </div>
            </div>

            {/* Bento Grid images */}
            <div className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mt-[35px] sm:mt-[37px] md:mt-[40px]'>
                {spaceData.images && spaceData.images.length > 0 && (
                    <div className={`w-full h-full grid gap-2 ${getBentoGridClasses(spaceData.images.length)}`}>
                        {spaceData.images.slice(0, 5).map((image: string, index: number) => (
                            <div
                                key={index}
                                onClick={() => handleImageClick(index)}
                                className={`relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl cursor-pointer ${getBentoItemClasses(index, spaceData.images.length)}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${spaceData.nameOfSpace} - Image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />

                                {/* View All Button */}
                                {index === (spaceData.images.length === 5 ? 4 : spaceData.images.length - 1) && (
                                    <div className="absolute bottom-3 right-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewAllClick();
                                            }}
                                            className="bg-white/75 text-black px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium hover:bg-white transition duration-200 shadow-md cursor-pointer backdrop-blur-sm"
                                        >
                                            View All ({spaceData.images.length})
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Details Box */}
            <div className='w-full flex flex-col lg:flex-row justify-between mt-[70px] sm:mt-[75px] md:mt-[80px] lg:mt-[90px] gap-y-[56px] gap-x-[40px]'>

                {/* Left side details */}
                <div className='w-full lg:w-[60%] max-w-[770px]'>

                    {/* Desc */}
                    <div className='flex flex-row gap-4 justify-between items-center'>
                        {/* Area */}
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-[#D9D9D9]/30 rounded-lg flex justify-center items-center'>
                                <Image
                                    src={"/FindYourSpace/space/area.png"}
                                    alt='area'
                                    height={1000}
                                    width={1000}
                                    className='h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] rounded-lg' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[15px] sm:text-base md:text-[17px] lg:text-[18px] text-[#2C2C2C]'> Area </p>
                                <p className='text-[#2C2C2CB2] font-light text-[14px] sm:text-base'> {spaceData.area} </p>
                            </div>
                        </div>
                        {/* Capacity */}
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-[#D9D9D9]/30 rounded-lg flex justify-center items-center'>
                                <Image
                                    src={"/FindYourSpace/space/capacity.png"}
                                    alt='capacity'
                                    height={1000}
                                    width={1000}
                                    className='h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] rounded-lg' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[15px] sm:text-base md:text-[17px] lg:text-[18px] text-[#2C2C2C]'> Capacity </p>
                                <p className='text-[#2C2C2CB2] font-light text-[14px] sm:text-base '> {spaceData.capacity} </p>
                            </div>
                        </div>
                        {/* Availability */}
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center text-center sm:text-start md:text-center lg:text-start gap-[10px]'>
                            <div className='p-3 bg-[#D9D9D9]/30 rounded-lg flex justify-center items-center'>
                                <Image
                                    src={"/FindYourSpace/space/availability.png"}
                                    alt='availability'
                                    height={1000}
                                    width={1000}
                                    className='h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] rounded-lg' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[15px] sm:text-base md:text-[17px] lg:text-[18px] text-[#2C2C2C]'> Availability </p>
                                <p className='text-[#2C2C2CB2] font-light text-[14px] sm:text-base '> {spaceData.availability} </p>
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className='flex flex-col mt-[45px] sm:mt-[50px] md:mt-[55px] lg:mt-[60px] text-start'>
                        <h2 className='font-semibold text-[#BA181B] text-base sm:text-[18px] md:text-[20px] lg:text-[22px]'> Highlights </h2>
                        <ul className='flex flex-col list-disc disc-inside mt-[15px] sm:mt-[20px] ml-4'>
                            {
                                spaceData.highlights.map((item: string, idx: number) => (
                                    <li className='text-[14px] sm:text-base md:text-[17px] lg:text-[18px] font-light text-[#000000]' key={idx}> {item} </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* About this space */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px] text-start py-[35px] md:py-[50px] border-t border-b border-[#2C2C2CAB]'>
                        <h2 className='text-[#2C2C2C] font-semibold text-[25px] sm:text-[28px] md:text-[30px] lg:text-[33px]'> About this Space </h2>
                        <p className='max-w-[717px] w-full text-[#2C2C2C] font-light text-[15px] sm:text-base md:text-[17.5px] lg:text-[19px] mt-[22px] leading-tight'>
                            {spaceData.aboutSpace}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className='w-full flex flex-col mt-[70px] sm:mt-[75px] md:mt-[85px] lg:mt-[100px]'>
                        <h2 className='text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#2C2C2C] font-semibold'> Amenities </h2>
                        <div className='w-full flex flex-row flex-wrap gap-[15px] md:gap-[16px] mt-[34px]'>
                            {spaceData.selectedAmenities.map((amenity: string, idx: number) => {
                                const icon = amenityToIconMap[amenity.toLowerCase()] || "/FindYourSpace/space/wifi.png";

                                return (
                                    <span
                                        className='flex flex-row items-center gap-[10px] bg-[#D9D9D969]/90 py-1.25 px-4 sm:py-1.5 sm:px-6 md:py-2 md:px-8 lg:px-10 rounded-full'
                                        key={idx}
                                    >
                                        <Image
                                            src={icon}
                                            alt={amenity}
                                            height={1000}
                                            width={1000}
                                            className='w-[22px] h-[22px]'
                                        />
                                        <p className='font-normal text-[#000000] text-[15px] sm:text-base md:text-[18px]'>
                                            {amenity}
                                        </p>
                                    </span>
                                );
                            })}
                        </div>
                    </div>


                </div>

                {/* Right side details */}
                <div className='w-full lg:w-[40%] max-w-[820px] flex flex-col justify-center lg:justify-between items-center gap-y-[40px] md:gap-y-[60px]'>
                    {/* Form */}
                    <form className='max-w-[820px] w-full bg-[#FFFFFF] shadow-xl rounded-xl p-8 inset-shadow-2xs' onSubmit={handleFormSubmit}>
                        <div className='w-full flex flex-row flex-wrap justify-between items-center gap-x-[60px] gap-y-[15px]'>
                            <h2 className='text-[#2C2C2C] font-semibold text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px]'> {rupee}{activeTab === "Hours" ? spaceData.priceHour : spaceData.priceDay} </h2>

                            <div className="p-1.5 rounded-full bg-[#D9D9D9] flex flex-row justify-between items-center gap-[10px] max-w-[283px] w-full">
                                {["Hours", "Days"].map((tab) => (
                                    <p
                                        key={tab}
                                        onClick={() => setActiveTab(tab as "Hours" | "Days")}
                                        className={`${activeTab === tab ? "bg-white" : "bg-transparent"} font-semibold text-[14px] sm:text-[15px] md:text-base lg:text-[17px] py-1.5 px-10 rounded-full cursor-pointer hover:bg-white/90 transition-all ease-in-out duration-200`}
                                    >
                                        {tab}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <hr className='bg-[#2C2C2C] w-full mt-[35px]' />

                        <div className='flex flex-col gap-[30px] mt-[49px]'>
                            <input type="text" placeholder='Name*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder='Email*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder='Phone' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <button
                            type="submit"
                            className='w-full bg-[#BA181B] rounded-full mt-[50px] font-medium text-[14px] sm:text-[15px] md:text-[17.5px] lg:text-[18px] text-[#FFFFFF] py-2 md:py-2.5 lg:py-3 cursor-pointer hover:bg-[#2C2C2C] transition-all ease-in-out duration-200'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Enquire Now"}
                        </button>
                    </form>

                    {/* Lister profile card */}
                    <div className='max-w-[520px] w-full bg-[#FFFFFF] shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 inset-shadow-2xs'>
                        <div className='flex flex-row justify-start gap-[20px] items-center '>
                            <Image
                                src={spaceData.user?.profileImg || "/FindYourSpace/space/user_fallback_image.jpg"}
                                alt='lister profile'
                                height={1000}
                                width={1000}
                                className='h-[60px] w-[60px] sm:h-[75px] sm:w-[75px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] rounded-full'
                            />

                            <div className='flex flex-col'>
                                <p className='text-[#BA181B] font-semibold text-base sm:text-[17px] md:text-[18px] lg:text-[20px]'> Meet {spaceData.user?.fullName || 'Owner'} </p>
                                <p className='text-[#2C2C2C] font-normal text-[14px] md:text-base mt-[-3px]'> Onwer of the property </p>
                                <p className='text-[#2C2C2C80] font-semibold text-base sm:text-[17px] md:text-[18px] lg:text-[20px] mt-[15px] leading-tight'> {spaceData.user?.bio || 'Lister of space'} </p>
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-start gap-2 items-center mt-[30px] sm:mt-[34px] md:mt-[38px]'>
                            <Link href={`tel:${spaceData.contactNumber || '7894657831'}`}>
                                <button className='w-full py-2 px-10 sm:px-14 lg:px-20 flex flex-row justify-center items-center gap-2 bg-[#BA181B] rounded-full cursor-pointer hover:bg-[#2C2C2C] transition-all ease-in-out duration-200'>
                                    <GiPhone className='text-[25px] sm:text-[28px] md:text-[30px] lg:text-[33px] text-[#F8F9FA]' />
                                    <span className='font-medium text-[14px] sm:text-base lg:text-[18px] text-[#F8F9FA]'> +91 {spaceData.contactNumber || '7894657831'} </span>
                                </button>
                            </Link>
                            <Link href={`https://wa.me/${spaceData.whatsappNumber || '9560729291'}`}>
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

            {/* Map section */}
            <div className='w-full flex flex-col gap-[25px] sm:gap-[30px] md:gap-[38px] lg:gap-[49px] mt-[80px] sm:mt-[85px] md:mt-[100px] lg:mt-[115px]'>
                <p className='text-[#2C2C2C] font-semibold text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px]'> Where you&apos;ll be </p>
                <div className='w-full h-[350px] sm:h-[420px] md:h-[540px] lg:h-[620px]'>
                    <LocationMap pincode={spaceData?.pincode} />
                </div>
                <hr className='w-full bg-[#2C2C2CAB] mt-[50px] sm:mt-[60px] md:mt-[70px]' />
            </div>

            {/* Cozy spaces in [City] */}
            <div className='w-full flex flex-col mt-[80px] sm:mt-[95px] md:mt-[105px] lg:mt-[112px]'>
                <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Discover more spaces in {spaceData.city || 'Your City'} </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    {isLoadingRelated ? (
                        <p className="col-span-full text-gray-500">Loading cozy spaces...</p>
                    ) : (
                        relatedSpaces.slice(0, 4).map((space: Space) => (
                            <SpaceCard key={space.id} space={space} />
                        ))
                    )}
                </div>
            </div>

            {/* Most popular places in [State] */}
            {/* <div className='w-full flex flex-col mt-[76px]'>
                <p className='font-semibold text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]'> Most popular places in {spaceData.state || 'Your State'} </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[36px] lg:mt-[42px] gap-5'>
                    {isLoadingRelated ? (
                        <p className="col-span-full text-gray-500">Loading popular places...</p>
                    ) : (
                        relatedSpaces.slice(4, 8).map((space: Space) => ( // Use slice(4, 8) directly
                            <SpaceCard key={space.id} space={space} />
                        ))
                    )}
                </div>
            </div> */}

            {/* Quick Form */}
            <div className='mt-[90px] sm:mt-[100px] md:mt-[110px] lg:mt-[120px] mb-[70px] sm:mb-[80px] md:mb-[90px] lg:mb-[100px]'>
                <QuickForm />
            </div>

            {isGalleryOpen && (
                <ImageGalleryModal
                    images={spaceData.images}
                    initialSlide={selectedImageIndex}
                    onClose={handleCloseGallery}
                />
            )}

        </section>
    );
};

export default Page;
