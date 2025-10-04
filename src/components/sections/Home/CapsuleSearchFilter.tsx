'use client';

import React, { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa6';
import { fetchStates } from '@/api/filter/states';
import { fetchCities } from '@/api/filter/city';
import axios from 'axios'; // ✅ import axios for localities

const filterOptions = {
  state: { subtitle: "Choose your state or UT", options: [] as string[] },
  city: { subtitle: "Select your city", options: [] as string[] },
  price: {
    subtitle: "Select price range",
    options: ["₹0 - ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000 - ₹5000", "₹5000+"]
  },
  locality: {
    subtitle: "Select locality",
    options: [] as string[] // will be dynamically populated
  }
};

const filterData = [
  { heading: "State / UT", key: "state", placeholder: "Select your state" },
  { heading: "City", key: "city", placeholder: "Select your city" },
  { heading: "Price", key: "price", placeholder: "Your suitable price" },
  { heading: "Locality", key: "locality", placeholder: "Select locality" },
];

const CapsuleSearchFilter = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]); // ✅ dynamic localities
  const [localitySearch, setLocalitySearch] = useState<string>(""); // input bar for pincode
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Fetch states on mount
  useEffect(() => {
    const loadStates = async () => {
      const data = await fetchStates();
      if (data.length > 0) {
        setStates(data);
        filterOptions.state.options = data;
      }
    };
    loadStates();
  }, []);

  // Populate selected from query params
  useEffect(() => {
    const newSelected: { [key: string]: string } = {};
    filterData.forEach(item => {
      const value = searchParams.get(item.key);
      if (value) newSelected[item.key] = value;
    });

    const priceMin = searchParams.get("priceMinHour");
    const priceMax = searchParams.get("priceMaxHour");
    if (priceMin === "0" && priceMax === "500") newSelected["price"] = "₹0 - ₹500";
    else if (priceMin === "500" && priceMax === "1000") newSelected["price"] = "₹500 - ₹1000";
    else if (priceMin === "1000" && priceMax === "2000") newSelected["price"] = "₹1000 - ₹2000";
    else if (priceMin === "2000" && priceMax === "5000") newSelected["price"] = "₹2000 - ₹5000";
    else if (priceMin === "5000") newSelected["price"] = "₹5000+";

    const keyword = searchParams.get('q');
    if (keyword) newSelected["keyword"] = keyword;

    setSelected(newSelected);

    // Fetch cities if state exists
    if (newSelected.state) {
      (async () => {
        const cityList = await fetchCities(newSelected.state);
        setCities(cityList);
        filterOptions.city.options = cityList;
      })();
    }
  }, [searchParams]);

  // Handle selection
  const handleSelect = async (key: string, value: string) => {
    setSelected(prev => ({ ...prev, [key]: value }));
    setActiveIndex(null);

    if (key === "state") {
      setSelected(prev => ({ ...prev, city: "", locality: "" }));
      setLocalities([]);
      const cityList = await fetchCities(value);
      setCities(cityList);
      filterOptions.city.options = cityList;
    }

    if (key === "city") {
      setSelected(prev => ({ ...prev, locality: "" }));
      setLocalities([]);
    }
  };

  // Fetch localities when user types pincode
  useEffect(() => {
    if (localitySearch.length === 6) { // only fetch if 6-digit pincode
      (async () => {
        try {
          const res = await axios.get(`/api/pincode/${localitySearch}`);
          if (res.data && Array.isArray(res.data)) {
            setLocalities(res.data);
            filterOptions.locality.options = res.data;
          }
        } catch (error) {
          console.error("Error fetching localities:", error);
        }
      })();
    }
  }, [localitySearch]);

  // Handle search
  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selected.state) query.set("state", selected.state);
    if (selected.city) query.set("city", selected.city);
    if (selected.locality) query.set("locality", selected.locality);
    if (selected.keyword) query.set("q", selected.keyword);

    if (selected.price) {
      switch (selected.price) {
        case "₹0 - ₹500": query.set("priceMinHour", "0"); query.set("priceMaxHour", "500"); break;
        case "₹500 - ₹1000": query.set("priceMinHour", "500"); query.set("priceMaxHour", "1000"); break;
        case "₹1000 - ₹2000": query.set("priceMinHour", "1000"); query.set("priceMaxHour", "2000"); break;
        case "₹2000 - ₹5000": query.set("priceMinHour", "2000"); query.set("priceMaxHour", "5000"); break;
        case "₹5000+": query.set("priceMinHour", "5000"); break;
      }
    }

    router.push(`/find-your-space?${query.toString()}`);
  };

  // Render dropdown options dynamically
  const getOptions = (key: string) => {
    if (key === "state") return states;
    if (key === "city") return cities;
    if (key === "locality") return localities;
    return filterOptions[key as keyof typeof filterOptions].options;
  };

  return (
    <div className="flex max-w-[1400px] w-full mx-auto relative px-2 sm:px-4 md:px-6 lg:px-8 justify-center items-center mt-4 sm:mt-6 lg:mt-[30px]">
      <div className="max-w-[1180px] w-full bg-white rounded-2xl sm:rounded-3xl xl:rounded-full border-t border-gray-300 shadow-md">

        {/* Mobile Layout */}
        <div className="flex xl:hidden flex-col p-3 sm:p-4 gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {filterData.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isSelected = !!selected[item.key];
              const selectedValue = selected[item.key];
              const options = getOptions(item.key);

              return (
                <div key={idx} className="relative">
                  <div
                    onClick={() => setActiveIndex(prev => (prev === idx ? null : idx))}
                    className={`flex flex-col py-2.5 sm:py-3 px-8 sm:px-10 rounded-full cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'bg-[#BA181B] text-white'
                        : isActive
                          ? 'bg-transparent shadow-[1px_1px_10px_gray] text-black'
                          : 'bg-[#D9D9D9]/60 text-black shadow-inner-top hover:bg-transparent hover:shadow-[1px_1px_10px_gray]'}`}
                  >
                    <p className="text-xs font-semibold text-start">{item.heading}</p>
                    <p className={`text-xs font-light text-start mt-0.5 truncate
                      ${isSelected ? 'text-white' : 'text-[#00000054]'}`}
                    >
                      {selectedValue || item.placeholder}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-[280px] z-50 bg-white border border-gray-300 rounded-xl shadow-lg py-2 px-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto">
                      <p className="px-2 py-2 text-black font-semibold text-sm">
                        {filterOptions[item.key as keyof typeof filterOptions].subtitle}
                      </p>

                      {/* Input for Locality */}
                      {item.key === "locality" && (
                        <input
                          type="text"
                          placeholder="Enter pincode"
                          value={localitySearch}
                          onChange={(e) => setLocalitySearch(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-[#BA181B] text-xs placeholder:text-xs xl:text-[13px] xl:placeholder:text-[13px]"
                        />
                      )}

                      {options.map((option, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelect(item.key, option)}
                          className="px-2 py-1.5 text-sm text-[#00000085] cursor-pointer hover:font-medium hover:bg-gray-50 rounded"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Keyword Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Space...."
              value={selected.keyword || ""}
              onChange={(e) => setSelected(prev => ({ ...prev, keyword: e.target.value }))}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA181B]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-[#BA181B] hover:text-black"
              onClick={handleSearch}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#BA181B] py-3 px-6 rounded-xl hover:bg-[#2C2C2C] transition-all duration-200 active:bg-[#2C2C2C] cursor-pointer flex items-center justify-center gap-2"
          >
            <BsSearch className="text-white text-sm" />
            <span className="text-white font-medium text-sm">Search Spaces</span>
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden xl:flex justify-between items-center py-2.5 px-4 gap-x-5">
          <div className="flex flex-row gap-2 flex-wrap">
            {filterData.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isSelected = !!selected[item.key];
              const selectedValue = selected[item.key];
              const options = getOptions(item.key);

              return (
                <div key={idx} className="relative">
                  <div
                    onClick={() => setActiveIndex(prev => (prev === idx ? null : idx))}
                    className={`flex flex-col py-3.5 pl-7 pr-12 rounded-full cursor-pointer transition-all duration-200 min-w-[150px]
                      ${isSelected
                        ? 'bg-[#BA181B] text-white'
                        : isActive
                          ? 'bg-transparent shadow-[1px_1px_10px_gray] text-black'
                          : 'bg-[#D9D9D9]/60 text-black shadow-inner-top hover:bg-transparent hover:shadow-[1px_1px_10px_gray]'}`}
                  >
                    <p className="text-[11px] md:text-[13px] font-semibold text-start">{item.heading}</p>
                    <p className={`text-[11px] md:text-[13px] font-light text-start
                      ${isSelected ? 'text-white' : 'text-[#00000054]'}`}
                    >
                      {selectedValue || item.placeholder}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute top-full left-0 mt-[18px] w-[300px] z-50 bg-white border border-gray-300 rounded-4xl shadow-md py-2 px-[15px] max-h-[350px] overflow-y-auto">
                      <p className="px-4 py-2 text-black font-semibold text-sm md:text-base">
                        {filterOptions[item.key as keyof typeof filterOptions].subtitle}
                      </p>

                      {/* Input for Locality */}
                      {item.key === "locality" && (
                        <input
                          type="text"
                          placeholder="Enter pincode"
                          value={localitySearch}
                          onChange={(e) => setLocalitySearch(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-[#BA181B] text-xs placeholder:text-xs xl:text-[13px] xl:placeholder:text-[13px]"
                        />
                      )}

                      {options.map((option, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelect(item.key, option)}
                          className="px-4 py-1 text-sm text-[#00000085] cursor-pointer whitespace-nowrap hover:font-medium"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className='flex flex-row gap-3'>
            <div className="relative flex flex-row items-center">
              <input
                type="text"
                placeholder="Search Space...."
                value={selected.keyword || ""}
                onChange={(e) => setSelected(prev => ({ ...prev, keyword: e.target.value }))}
                className="px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#BA181B]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-[#BA181B] hover:text-black"
                onClick={handleSearch}
              >
                <div className='bg-gray-100 p-2 rounded-md cursor-pointer'>
                  <FaChevronRight />
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#BA181B] p-4 rounded-full hover:bg-[#2C2C2C] transition-all duration-200 active:bg-[#2C2C2C] cursor-pointer"
            >
              <BsSearch className="text-white text-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleSearchFilter;
