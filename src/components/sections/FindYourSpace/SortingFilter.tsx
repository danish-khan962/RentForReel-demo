import React, { useState, useEffect } from "react";
import { FiClock, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

interface SortingFilterProps {
  onClose: () => void;
  onSortApply: (option: string) => void;
  initialSelectedOption: string;
}

const SortingFilter: React.FC<SortingFilterProps> = ({
  onClose,
  onSortApply,
  initialSelectedOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption);

  // keep selected option synced if prop changes
  useEffect(() => {
    setSelectedOption(initialSelectedOption);
  }, [initialSelectedOption]);

  const options = [
    {
      id: "recent",
      label: "Recently Added",
      icon: <FiClock className="text-[#BA181B] text-xl" />,
    },
    {
      id: "oldest",
      label: "Oldest First",
      icon: <FiTrendingDown className="text-[#BA181B] text-xl" />,
    },
    {
      id: "lowToHigh",
      label: "Price: Low → High",
      icon: <FaSortAmountUp className="text-[#BA181B] text-xl" />,
    },
    {
      id: "highToLow",
      label: "Price: High → Low",
      icon: <FaSortAmountDown className="text-[#BA181B] text-xl" />,
    },
  ];

  const handleApply = () => {
    onSortApply(selectedOption);
    onClose();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 fixed inset-0 z-50 w-screen h-screen flex justify-center items-center bg-white/40 backdrop-blur-md">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="font-medium text-black py-1.5 px-6 rounded-full bg-[#D9D9D9] cursor-pointer underline absolute top-20 right-6 md:top-10 md:right-10 shadow-[1px_1px_16px_#2c2c2c]"
      >
        Close
      </button>

      {/* Sorting Filter Modal */}
      <div className="max-w-[700px] w-full rounded-2xl bg-white border border-gray-300 shadow-2xl flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
        <div>
          <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold mb-6 text-center text-[#BA181B]">
            Sort Your Spaces
          </h2>

          <div className="flex flex-col gap-5">
            {options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between cursor-pointer p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-full border transition-all shadow-[1px_1px_16px_#D9D9D9] ${
                  selectedOption === option.id
                    ? "border-[#BA181B] bg-[#BA181B]/10"
                    : "border-gray-300 hover:border-[#BA181B]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span className="text-[14px] sm:text-[15px] md:text-base font-medium text-gray-800">
                    {option.label}
                  </span>
                </div>

                <input
                  type="radio"
                  name="sortOption"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="w-5 h-5 accent-[#BA181B] cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-[35px]">
          <button
            onClick={handleApply}
            className="text-base sm:text-[17px] md:text-[18px] text-white font-bold w-[200px] h-[50px] md:w-[220px] md:h-[55px] rounded-full bg-[#BA181B] hover:bg-[#a31517] transition-all cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingFilter;
