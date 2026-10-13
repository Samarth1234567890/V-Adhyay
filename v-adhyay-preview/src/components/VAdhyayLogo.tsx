import React from 'react';

interface VAdhyayLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export const VAdhyayLogo: React.FC<VAdhyayLogoProps> = ({
  size = 52,
  className = '',
  showText = false,
  textColor = 'text-[#461820]',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* 
        Full Unclipped V Adhyay Emblem 
        Precisely proportioned from reference:
        Cream Circular Disk + Radical (√) + Devanagari (अ) + Horizontal Bar + Fountain Pen Nib 
      */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 flex items-center justify-center select-none"
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Rich Silk Crimson / Metallic Red Gradient */}
            <linearGradient id="vadhyayCrimsonGrad" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#C92434" />
              <stop offset="25%" stopColor="#A61B29" />
              <stop offset="60%" stopColor="#851421" />
              <stop offset="100%" stopColor="#570B14" />
            </linearGradient>

            {/* Shimmer Highlight */}
            <linearGradient id="shimmerGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFECA8" />
              <stop offset="50%" stopColor="#D6B45B" />
              <stop offset="100%" stopColor="#9C7923" />
            </linearGradient>
          </defs>

          {/* 1. Circular Disc (Pale Butter Cream as in reference) */}
          <circle
            cx="120"
            cy="120"
            r="115"
            fill="#FAF5CD"
            stroke="#2B2620"
            strokeWidth="1.2"
          />

          {/* 2. Complete Central Emblem (Radical + 'अ' + Pen Nib) */}
          <g transform="translate(8, 6)">
            {/* --- Radical Hook on the left (√) --- */}
            {/* Left horizontal entry serif */}
            <path
              d="M 18 116 L 31 116"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="9"
              strokeLinecap="square"
            />
            {/* Diagonal down stroke */}
            <path
              d="M 31 116 L 47 156"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Long diagonal upward beam */}
            <path
              d="M 44 156 L 79 74"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="10"
              strokeLinecap="square"
            />

            {/* Top serif notch on the radical beam */}
            <path
              d="M 68 74 L 88 74"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="9"
              strokeLinecap="square"
            />

            {/* --- Continuous Top Horizontal Bar extending to the Nib --- */}
            <path
              d="M 78 74 L 166 74"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="9"
              strokeLinecap="butt"
            />

            {/* --- Devanagari Character 'अ' / '3' --- */}
            {/* Upper loop of '3' */}
            <path
              d="M 92 84 
                 C 98 80, 115 78, 122 93 
                 C 124 100, 117 108, 107 111 
                 L 100 112"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="8.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Lower loop of '3' */}
            <path
              d="M 100 112 
                 C 116 112, 126 120, 125 133 
                 C 124 146, 110 152, 94 150 
                 L 83 147"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="8.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Bottom-left serif curl on 'अ' */}
            <path
              d="M 83 135 L 83 148"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="6"
              strokeLinecap="square"
            />

            {/* Connecting horizontal bar from middle loop to vertical stem */}
            <path
              d="M 112 112 L 144 112"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="8.5"
              strokeLinecap="square"
            />

            {/* Top serif overhang bar for stem */}
            <path
              d="M 132 82 L 157 82"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="7"
              strokeLinecap="square"
            />

            {/* Vertical stem of 'अ' */}
            <path
              d="M 144 82 L 144 145"
              stroke="url(#vadhyayCrimsonGrad)"
              strokeWidth="9"
              strokeLinecap="butt"
            />

            {/* Fishtail / swallowtail ribbon notch at bottom of vertical stem */}
            <path
              d="M 139.5 144 
                 L 144 153 
                 L 148.5 144 
                 L 144 139 Z"
              fill="url(#vadhyayCrimsonGrad)"
            />

            {/* --- Fountain Pen Nib on the right --- */}
            {/* Small gap collar */}
            <line
              x1="168"
              y1="70"
              x2="168"
              y2="78"
              stroke="#570B14"
              strokeWidth="2.5"
            />

            {/* Fountain Pen Nib Body (sharp point pointing right) */}
            <path
              d="M 170 69 
                 L 190 70.8 
                 L 208 74 
                 L 190 77.2 
                 L 170 79 Z"
              fill="url(#vadhyayCrimsonGrad)"
            />

            {/* Golden Inlay Line on Nib */}
            <path
              d="M 173 71.5 L 189 73 L 173 76.5"
              stroke="url(#shimmerGold)"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Breather / Heart Hole on Fountain Pen */}
            <circle cx="187" cy="74" r="1.8" fill="#FAF5CD" />

            {/* Slit line extending from breather hole to the writing tip */}
            <line
              x1="188.8"
              y1="74"
              x2="208"
              y2="74"
              stroke="#40070D"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-black tracking-tight text-lg leading-none ${textColor}`}>
            V ADHYAY
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[#7D202B] font-bold leading-tight mt-0.5">
            Academic Ecosystem
          </span>
        </div>
      )}
    </div>
  );
};
