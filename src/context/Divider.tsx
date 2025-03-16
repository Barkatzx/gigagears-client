import React from "react";

interface DividerProps {
  title: string;
}

const Divider: React.FC<DividerProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="font-[Recoleta] text-2xl sm:text-4xl font-bold text-gray-800 relative pb-2">
        {title}
        <span className="absolute left-1/2 bottom-0 h-[3px] w-[80%] bg-gradient-to-r from-gray-200 via-gray-800 to-gray-200 transform -translate-x-1/2 rounded-full"></span>
      </h2>
    </div>
  );
};

export default Divider;
