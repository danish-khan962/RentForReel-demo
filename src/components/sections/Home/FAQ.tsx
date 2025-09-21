"use client"

import React, { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";

// Accordion Questions and Answers data
const accordionData = [
  {
    question: "What is Rent For Reel ?",
    answer: "Rent For Reel is a platform that connects content creators, filmmakers, photographers, and brands with short-term rental spaces that are curated specifically for shoots. Whether it's a music video, brand commercial, social media reel, or a product shoot, Rent For Reel makes it easy to discover and book the perfect location."
  },
  {
    question: "Who can use Rent for Reel ?",
    answer: "Anyone looking for a creative space to shoot content can use Rent For Reel. This includes influencers, production houses, independent creators, photographers, brands, agencies, and even individuals planning personal shoots like pre-wedding or portfolio sessions."
  },
  {
    question: "What kind of spaces can I book ?",
    answer: "You can book a wide variety of spaces including apartments, studios, villas, cafes, rooftops, art galleries, warehouses, and more. Each space is listed with detailed photos, amenities, pricing, and availability, so you can find exactly what suits your shoot."
  },
  {
    question: "How do I book a space ?",
    answer: "Booking is simple. Browse spaces on the platform, check availability, and send a booking request. Once the host confirms, you receive all the necessary details. You can also filter by location, type of space, budget, and shoot category to narrow down your search."
  },
  {
    question: "How can I list my space?",
    answer: "If you own or manage a space suitable for shooting, you can list it on Rent For Reel by signing up as a host. Just provide details, upload high-quality photos, set pricing and availability, and once approved, your space will be live and bookable by creators."
  },
  {
    question: "Is Rent for Reel available only in Mumbai?",
    answer: "Currently, Rent For Reel is primarily active in Mumbai, but we are rapidly expanding to other major cities across India. If you're outside Mumbai and interested in listing or booking, you can join our waitlist or contact our team to express interest."
  },
  {
    question: "How do payments work?",
    answer: "Payments are handled securely through the platform. Guests pay upfront when the booking is confirmed, and hosts receive their payment after the shoot is completed. Transparent pricing and cancellation policies are provided for each listing."
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer: "Yes, you can cancel or reschedule a booking based on the cancellation policy set by the host. Most listings have flexible or moderate policies, and any changes must be communicated through the platform in advance to avoid penalties."
  }
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionState = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <section className='max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-8 mt-[140px] sm:mt-[160px] md:mt-[180px] lg:mt-[200px] flex flex-col md:flex-row justify-center items-start md:justify-between gap-x-[60px]'>

      <p className='text-[26px] sm:text-[35px] md:text-[42px] lg:text-[50px] text-center md:text-start font-semibold leading-[62px] mb-10 md:mb-0'>
        Your Question, Answered
      </p>

      {/* Accordions */}
      <div className='w-full flex flex-col gap-3.5'>
        {accordionData.map((item, idx) => {
          const isOpen = activeIndex === idx;

          return (
            <div
              className='max-w-[920px] w-full flex flex-col bg-[#EEEEEE]/80 py-2.5 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-[32px]'
              key={idx}
            >
              {/* Question and toggle icon */}
              <div
                className='w-full flex flex-row justify-between gap-x-2 items-center cursor-pointer'
                onClick={() => handleAccordionState(idx)}
              >
                <p className='text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] text-[#2C2C2C] font-semibold'>
                  {item.question}
                </p>
                {isOpen ? (
                  <FaMinus className='text-[20px] sm:text-[23px] md:text-[26px] lg:text-[30px]' />
                ) : (
                  <FaPlus className='text-[20px] sm:text-[23px] md:text-[26px] lg:text-[30px]' />
                )}
              </div>

              {/* Smooth toggle answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[700px] mt-8' : 'max-h-0'}`}
              >
                <p className='text-base md:text-[18px] text-[#2C2C2C]'>
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
