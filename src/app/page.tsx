"use client";
import Banner from "@/components/sections/Home/Banner";
import CapsuleSearchFilter from "@/components/sections/Home/CapsuleSearchFilter";
import CreatorsSpotlightWall from "@/components/sections/Home/CreatorsSpotlightWall";
import CTAsection from "@/components/sections/Home/CTAsection";
import FAQ from "@/components/sections/Home/FAQ";
import FeaturedListing from "@/components/sections/Home/FeaturedListing";
import ListYourSpace from "@/components/sections/Home/ListYourSpace";


export default function Home() {

  return (
    <>

      {/* Filter section with search bar */}
      <CapsuleSearchFilter />


      {/* Container showing Featured Listing Cards */}
      <FeaturedListing />


      {/* CTA section with Rent for Reel branding name and two CTA buttons */}
      <CTAsection />


      {/* List your page section - with price slider and Live map */}
      <ListYourSpace />


      {/* Creator's Spotlight section - Video Playing Cards */}
      <CreatorsSpotlightWall />


      {/* FAQ or Accordions */}
      <FAQ />

      {/* Banner section with CTA button */}
      <Banner />

    </>
  );
}
