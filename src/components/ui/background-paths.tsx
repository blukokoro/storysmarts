
import React from "react";

interface BackgroundPathsProps {
  title?: string;
  className?: string;
}

export function BackgroundPaths({ title, className }: BackgroundPathsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`} aria-hidden="true">
      <svg
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        viewBox="0 0 1155 678"
        width="1155"
        height="678"
        fill="none"
      >
        <path
          fill="url(#path-1)"
          fillOpacity=".25"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <path
          fill="url(#path-2)"
          fillOpacity=".25"
          d="M1117.429 159.636L1396.063 0 1209.586 340.839l-312.121-159.62-292.153 301.245c35.89-130.968 155.819-320.306 53.308-196.875C462.067 488.53 407.873 687.11 228.566 580.908 88.183 496.449-22.361 321.701 4.431 245.606L260.35 341.534 13.535 21.4l838.815 178.02z"
        />
        <defs>
          <linearGradient
            id="path-1"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient
            id="path-2"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFB800" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
      {title && (
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      )}
    </div>
  );
}
