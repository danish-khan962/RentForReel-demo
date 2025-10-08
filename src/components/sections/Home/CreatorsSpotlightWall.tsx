'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import myQueries from '@/api/queries';

type Video = {
  url: string;
};

// Map screen width to number of grid columns
const getGridColumns = (width: number): number => {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
};

const CreatorsSpotlightWall = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchVideos = async () => {
      try {
        const fetchedVideos = await myQueries.getVideos();
        setVideos(fetchedVideos.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    fetchVideos();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const totalColumns = getGridColumns(windowWidth);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className='max-w-[1440px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex flex-col justify-start items-start mt-[110px] sm:mt-[150px] md:mt-[170px] lg:mt-[190px]'>
      <h2 className="text-[22px] sm:text-[30px] md:text-[38px] lg:text-[45px] font-semibold capitalize">
        Creator&apos;s Spotlight Wall
      </h2>

      <p className='text-start max-w-[1180px] w-full font-normal text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-base lg:text-[17.5px] leading-tight mt-[18px] sm:mt-[20px] md:mt-[23px] lg:mt-[25px]'>
        Celebrating the talent, passion, and creativity of our community. From filmmakers to photographers, dancers to digital creators — here&apos;s where we showcase the incredible work made inside Rent for Reel spaces.
      </p>

      <div className="w-full mt-[50px] sm:mt-[60px] md:mt-[75px] lg:mt-[85px] relative">
        {isMobile ? (
          <>
            {/* Custom navigation buttons */}
            <button className="custom-prev absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1 cursor-pointer bg-transparent rounded-full backdrop-blur-md">
              <FaChevronLeft style={{ color: '#BA181B', fontSize: '25px' }} />
            </button>
            <button className="custom-next absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 cursor-pointer bg-transparent rounded-full backdrop-blur-md">
              <FaChevronRight style={{ color: '#BA181B', fontSize: '25px' }} />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: '.custom-prev',
                nextEl: '.custom-next',
              }}
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
                0: { slidesPerView: 1.2 },
                500: { slidesPerView: 2.1 },
              }}
            >
              {videos.map((video, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onClick={() => openModal(idx)}
                    className='max-w-[350px] w-full rounded-4xl overflow-hidden cursor-pointer'
                  >
                    <video
                      src={video.url}
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
          </>
        ) : (
          <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}>
            {videos.map((video, idx) => {
              const columnIndex = (idx % totalColumns) + 1;
              const isEvenColumn = columnIndex % 2 === 0;

              return (
                <div
                  key={idx}
                  onClick={() => openModal(idx)}
                  className={`max-w-[350px] w-full rounded-4xl overflow-hidden transition-transform duration-300 cursor-pointer ${isEvenColumn ? 'translate-y-9' : ''}`}
                >
                  <video
                    src={video.url}
                    className='w-full h-[420px] object-cover rounded-4xl'
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal with Swiper and Navigation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/60">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-6 text-white text-3xl z-50"
          >
            <FaTimes />
          </button>

          {/* Swiper Navigation */}
          <button className="modal-prev absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md">
            <FaChevronLeft style={{ color: '#fff', fontSize: '30px' }} />
          </button>
          <button className="modal-next absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md">
            <FaChevronRight style={{ color: '#fff', fontSize: '30px' }} />
          </button>

          <div className="max-w-[90%] w-full h-[80vh] flex justify-center items-center">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.modal-prev',
                nextEl: '.modal-next',
              }}
              initialSlide={currentIndex}
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              className="w-full h-full"
            >
              {videos.map((video, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-full flex justify-center items-center">
                    <video
                      src={video.url}
                      controls
                      autoPlay
                      className="w-auto max-h-[80vh] rounded-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreatorsSpotlightWall;
