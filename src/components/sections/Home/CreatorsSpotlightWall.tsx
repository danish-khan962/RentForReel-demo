'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const videoSources = new Array(10).fill("/temp/sampleVideo.mp4");

// Map screen width to number of grid columns
const getGridColumns = (width: number): number => {
  if (width >= 1280) return 5; // xl
  if (width >= 1024) return 4; // lg
  if (width >= 768) return 3;  // md
  if (width >= 640) return 2;  // sm
  return 1;
};

const CreatorsSpotlightWall = () => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const totalColumns = getGridColumns(windowWidth);

  return (
    <section className='max-w-[1440px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex flex-col justify-start items-start mt-[110px] sm:mt-[150px] md:mt-[170px] lg:mt-[190px]'>

      <h2 className="text-[22px] sm:text-[30px] md:text-[38px] lg:text-[45px] font-semibold capitalize">
        Creator&apos;s Spotlight Wall
      </h2>

      <p className='text-start max-w-[1180px] w-full font-normal text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-base lg:text-[17.5px] leading-tight mt-[18px] sm:mt-[20px] md:mt-[23px] lg:mt-[25px]'>
        Celebrating the talent, passion, and creativity of our community. From filmmakers to photographers, dancers to digital creators — here&apos;s where we showcase the incredible work made inside Rent for Reel spaces.
      </p>

      {/* Video Playing Cards */}
      <div className="w-full mt-[50px] sm:mt-[60px] md:mt-[75px] lg:mt-[85px]">
        {
          isMobile ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1.2}
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              style={{ paddingBottom: '20px' }}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                500: {
                  slidesPerView: 2.1,
                }
              }}
            >
              {videoSources.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className='max-w-[350px] w-full rounded-4xl overflow-hidden'>
                    <video
                      src={src}
                      className='w-full h-[420px] object-cover rounded-4xl'
                      loop
                      muted
                      playsInline
                      autoPlay
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}>
              {
                videoSources.map((src, idx) => {
                  const columnIndex = (idx % totalColumns) + 1;
                  const isEvenColumn = columnIndex % 2 === 0;

                  return (
                    <div
                      key={idx}
                      className={`max-w-[350px] w-full rounded-4xl overflow-hidden transition-transform duration-300 ${
                        isEvenColumn ? 'translate-y-9' : ''
                      }`}
                    >
                      <video
                        src={src}
                        className='w-full h-[420px] object-cover rounded-4xl'
                        loop
                        muted
                        playsInline
                        autoPlay
                      />
                    </div>
                  );
                })
              }
            </div>
          )
        }
      </div>

    </section>
  );
};

export default CreatorsSpotlightWall;
