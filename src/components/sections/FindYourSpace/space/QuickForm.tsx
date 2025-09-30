"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image' 
import myQueries from '@/api/queries' 
import toast from 'react-hot-toast' 

const imageIcons = [
    "/FindYourSpace/space/tea.png",
    "/FindYourSpace/space/couple.png",
    "/FindYourSpace/space/vacation.png",
    "/FindYourSpace/space/group.png",
    "/FindYourSpace/space/camera.png",
]

const budgetOptions = {
    subtitle: "Select your budget",
    options: [
        "₹0 - ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000 - ₹5000", "₹5000+"
    ]
}
const purposeOptions = {
    subtitle: "Select your purpose",
    options: [
        "Work", "Meeting", "Interview", "Study", "Event"
    ]
}

const QuickForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [budget, setBudget] = useState('')
    const [purpose, setPurpose] = useState('')
    const [budgetActive, setBudgetActive] = useState(false)
    const [purposeActive, setPurposeActive] = useState(false)
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            
            setTimeout(() => {
                if (budgetActive && !target.closest('.budget-dropdown-container') && !target.classList.contains('budget-input')) {
                    setBudgetActive(false);
                }
                if (purposeActive && !target.closest('.purpose-dropdown-container') && !target.classList.contains('purpose-input')) {
                    setPurposeActive(false);
                }
            }, 100);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [budgetActive, purposeActive]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || name.trim().length < 3) {
            toast.error("Name is required and must be at least 3 letters.");
            return;
        }
        
        if (!email.trim() || !email.includes('@')) {
            toast.error("Please enter a valid Email address (must contain @).");
            return;
        }
        
        const numericPhone = phone.trim().replace(/\D/g, ''); 
        if (numericPhone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits.");
            return;
        }

        if (!budget.trim()) {
            toast.error("Please select your Budget.");
            return;
        }
        if (!purpose.trim()) {
            toast.error("Please select your Purpose.");
            return;
        }

        const payload = {
            name,
            email,
            phone: numericPhone, 
            budget: budget.replace(/[^0-9+-]/g, ''), 
            purpose,
        };

        try {
            const response = await myQueries.sendPlatformEnquiry(payload);
            
            console.log("Enquiry submitted successfully. Response Data:", response.data);
            toast.success("Success! We'll get back to you within 12 hours."); // Switched to toast.success

            setName('');
            setEmail('');
            setPhone('');
            setBudget('');
            setPurpose('');

        } catch (error) {
            console.error("Failed to submit form:", error);
            toast.error("Failed to submit enquiry. Please check your connection."); // Switched to toast.error
        }
    };

    return (
        <div className='max-w-[1500px] w-full mx-auto bg-[#FFFFFF] rounded-2xl border border-[#2C2C2C] flex flex-col xl:flex-row justify-between gap-x-[20px] gap-y-[60px] items-center lg:items-start px-4 sm:px-6 py-2.5'>

            {/* Left Content Block */}
            <div className='flex flex-col max-w-[1000px] xl:max-w-[622px] w-full items-center lg:items-start text-center lg:text-left'>
                <p className='font-extrabold text-[#BA181B] text-[38px] sm:text-[45px] md:text-[55px] lg:text-[70px] leading-[45px] sm:leading-[52px] md:leading-[61px] lg:leading-[75px] mt-[15px] sm:mt-[20px] md:mt-[25px]'>
                    Your Space. <br />
                    Your Purpose. <br />
                    We&apos;ll Find It.
                </p>
                <p className='mt-[25px] md:mt-[30px] text-[#BA181B] font-medium text-base sm:text-[17px] md:text-[18px] lg:text-[20px] max-w-[580px] w-full'>
                    Whether it&apos;s for a reel, a photo shoot, a workshop, or just a cozy meetup—we&apos;ll match you with spaces that fit your vibe.
                </p>
                <div className='max-w-[580px] w-full flex flex-row items-center justify-center lg:justify-start gap-x-[10px] sm:gap-x-[15px] md:gap-x-[21px] lg:gap-x-[27px] mt-[70px] sm:mt-[80px] md:mt-[100px] lg:mt-[115px]'>
                    {
                        imageIcons.map((icon, index) => (
                            <Image
                                src={icon}
                                alt='icon'
                                height={80}
                                width={80}
                                className='h-[51px] w-[51px] sm:h-[62px] sm:w-[62px] md:h-[76px] md:w-[76px] lg:h-[80px] lg:w-[80px] object-contain'
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>

            {/* Right Form Block */}
            <form
                className='w-full lg:flex-1 shadow-[1px_1px_16px_gray] rounded-3xl flex flex-col justify-center items-center 
                            px-4 sm:px-5 md:px-6 lg:px-7 pt-5 sm:pt-6 md:pt-7 lg:pt-8 pb-7 sm:pb-8 md:pb-9 lg:pb-10 
                            mt-[20px] mb-[30px]'
                onSubmit={handleSubmit}
            >
                <p className='font-semibold text-[#BA181B] text-[20px] sm:text-[22px] md:text-[23.5px] lg:text-[25px] text-center'> Quick Form </p>
                <p className='font-light text-[#BA181B] text-[15px] sm:text-base md:text-[18px] lg:text-[20px] mt-[-3px] text-center'> One step closer to get your desired space </p>

                <div className='w-full flex flex-col gap-[30px] mt-[29px]'>
                    <input type="text" placeholder='Name*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Email*' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="tel" placeholder='Phone' className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none' value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <div className='flex flex-col sm:flex-row justify-center items-center gap-[15px] sm:gap-x-[25px] md:gap-x-[30px] lg:gap-x-[35px]'>

                        {/* Budget Dropdown */}
                        <div className='w-full relative flex flex-col dropdown-input budget-dropdown-container'>
                            <input
                                type="text"
                                placeholder='Budget'
                                value={budget}
                                onClick={(e: React.MouseEvent) => { 
                                    e.stopPropagation();
                                    setBudgetActive(!budgetActive); 
                                    setPurposeActive(false);
                                }}
                                readOnly
                                className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none cursor-pointer budget-input'
                            />
                            {
                                budgetActive && (
                                    <div className='absolute top-full left-0 mt-[12px] sm:mt-[18px] w-full min-w-[200px] z-50 bg-white border border-gray-300 rounded-xl shadow-md py-2 px-[10px] max-h-[250px] overflow-y-auto flex flex-col justify-start items-start'>
                                        <p className="px-4 py-2 text-black font-semibold text-sm md:text-base">{budgetOptions.subtitle}</p>
                                        {
                                            budgetOptions.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setBudget(option)
                                                        setBudgetActive(false)
                                                    }}
                                                    className="w-full text-left px-4 py-1 text-sm text-[#00000085] cursor-pointer whitespace-nowrap hover:font-semibold hover:bg-[#F0F0F0] rounded-lg transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                        {/* Purpose Dropdown */}
                        <div className='w-full relative flex flex-col dropdown-input purpose-dropdown-container'>
                            <input
                                type="text"
                                placeholder='Purpose'
                                value={purpose}
                                onClick={(e: React.MouseEvent) => { 
                                    setPurposeActive(!purposeActive); 
                                    setBudgetActive(false);
                                }}
                                readOnly
                                className='w-full bg-[#D9D9D957] placeholder:text-[14px] md:placeholder:text-base placeholder:text-[#00000033] rounded-md py-3 px-4 outline-none cursor-pointer purpose-input'
                            />
                            {
                                purposeActive && (
                                    <div className='absolute top-full left-0 mt-[12px] sm:mt-[18px] w-full min-w-[200px] z-50 bg-white border border-gray-300 rounded-xl shadow-md py-2 px-[10px] max-h-[250px] overflow-y-auto flex flex-col justify-start items-start'>
                                        <p className="px-4 py-2 text-black font-semibold text-sm md:text-base">{purposeOptions.subtitle}</p>
                                        {
                                            purposeOptions.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setPurpose(option)
                                                        setPurposeActive(false)
                                                    }}
                                                    className="w-full text-left px-4 py-1 text-sm text-[#00000085] cursor-pointer whitespace-nowrap hover:font-semibold hover:bg-[#F0F0F0] rounded-lg transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>

                <button type="submit" className='w-full py-2 bg-[#BA181B] font-semibold text-[#FFFFFF] text-base sm:text-[17px] md:text-[18.5px] lg:text-[20px] rounded-md mt-[30px] hover:bg-transparent hover:outline hover:outline-[#2c2c2c] hover:text-[#2C2C2C] transition-all ease-in-out duration-200 cursor-pointer hover:shadow-lg active:outline active:outline-[#2C2C2C] active:text-[#2C2C2C]'>
                    Find My Perfect Space
                </button>

                <p className='text-[#2C2C2C] font-medium mt-[22px] sm:mt-[30px] text-[14px] sm:text-base text-center'> We&apos;ll get within 12 hrs </p>
            </form>
            
        </div>
    )
}

export default QuickForm
