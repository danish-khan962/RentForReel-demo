import React from 'react';
import Image from 'next/image';

// const videoSources = [
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
//   '/sample_video_1.mp4',
// ];


const imageSources = [
  '/temp/temp_bg_1.jpg',
  '/temp/temp_bg_2.jpg',
  '/temp/temp_bg_1.jpg',
  '/temp/temp_bg_2.jpg',
  '/temp/temp_bg_1.jpg',
  '/temp/temp_bg_2.jpg',
  '/temp/temp_bg_1.jpg',
  '/temp/temp_bg_2.jpg',
  '/temp/temp_bg_1.jpg',
  '/temp/temp_bg_2.jpg',
]


const CreatorsSpotlightWall = () => {
  return (
    <section className='max-w-[1440px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex flex-col justify-start items-start mt-[110px] sm:mt-[150px] md:mt-[170px] lg:mt-[190px]'>

      <h2 className="text-[22px] sm:text-[30px] md:text-[38px] lg:text-[45px] font-semibold capitalize">
        Creator&apos;s Spotlight Wall
      </h2>

      <p className='text-start max-w-[1180px] w-full font-normal text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-base lg:text-[17.5px] leading-tight mt-[18px] sm:mt-[20px] md:mt-[23px] lg:mt-[25px]'>
        Celebrating the talent, passion, and creativity of our community. From filmmakers to photographers, dancers to digital creators — here&apos;s where we showcase the incredible work made inside Rent for Reel spaces.
      </p>

      {/* Video Playing Cards grid */}
      <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-[50px] sm:mt-[60px] md:mt-[75px] lg:mt-[85px]`}>
        {
          imageSources.map((src, idx) => (
            <div className='max-w-[350px] w-full rounded-4xl overflow-hidden' key={idx}>
              {/* <video
                src={src}
                className='w-full h-[420px] object-cover rounded-4xl'
                loop
                muted
                playsInline
                autoPlay
              /> */}

              <Image
              src={src}
              alt="bg image"
              width={1000}
              height={1000}
              className='w-full h-[420px] rounded-4xl object-cover'
              />
            </div>
          ))
        }
      </div>

    </section>
  );
};

export default CreatorsSpotlightWall;
