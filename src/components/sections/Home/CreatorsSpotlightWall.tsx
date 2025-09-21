import React from 'react'


const CreatorsSpotlightWall = () => {
  return (
    <section className='max-w-[1500px] w-full mx-auto relative px-4 sm:px-6 md:px-8 flex flex-col justify-start items-start mt-[110px] sm:mt-[150px] md:mt-[170px] lg:mt-[190px]'>
      
        <h2 className="text-[28px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-semibold capitalize"> Creator&apos;s Spotlight Wall </h2>

        <p className='text-start max-w-[1180px] w-full font-normal text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-base lg:text-[17.5px] leading-tight mt-[18px] sm:mt-[20px] md:mt-[23px] lg:mt-[25px]'>
          Celebrating the talent, passion, and creativity of our community. From filmmakers to photographers, dancers to digital creators — here&apos;s where we showcase the incredible work made inside Rent for Reel spaces.
        </p>


        {/* Video Playing Cards grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-[50px] sm:mt-[60px] md:mt-[75px] lg:mt-[85px]'>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
          <div className='max-w-[450px] w-full h-[325px] rounded-3xl bg-red-500/40'></div>
        </div>

    </section>
  )
}

export default CreatorsSpotlightWall
