'use client';

import React from 'react';

interface WarmUnderlineProps {
  children: React.ReactNode;
  className?: string;
}

export const WarmUnderline: React.FC<WarmUnderlineProps> = ({ children, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute bottom-0 left-0 w-full h-[10px] -mb-1 text-[#f2c98a] pointer-events-none z-0 overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 15 C 20 4, 50 18, 98 12"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </span>
  );
};
