import CapsuleSearchFilter from "@/components/sections/Home/CapsuleSearchFilter";
import CTAsection from "@/components/sections/Home/CTAsection";
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

    </>
  );
}
