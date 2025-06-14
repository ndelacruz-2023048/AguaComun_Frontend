import React from 'react';

const Separator = ({ orientation = "horizontal", className = "" }) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`shrink-0 ${isHorizontal ? 'h-[1px] w-full' : 'h-full w-[1px]'} bg-gray-300 ${className}`}
    />
  );
};

export { Separator };