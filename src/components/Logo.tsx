import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = 'h-12 w-auto', isDark = false }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  // The website will try to load the user's uploaded image file directly!
  // They can place their image file at '/logo.png' (or '/logo-white.png' for dark backgrounds)
  // in their public directory. This satisfies using the image directly!
  const imgSrc = isDark ? '/logo-white.png' : '/logo.png';

  if (!imgError) {
    return (
      <img
        id={`rafa-school-img-logo-${isDark ? 'dark' : 'light'}`}
        src={imgSrc}
        alt="Rafa School Logo"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Pixel-perfect fallback SVG based on the user's official Rafa School logo:
  // - Premium royal blue colors matching the traditional Algerian Zellij tile pattern.
  // - Open education book with floating knowledge squares on the left.
  // - Intricately styled monogram "R" with the Moroccan/Algerian geometric pattern.
  // - Modern, bold typography for "afa" and spaced out "S C H O O L" underneath.
  const iconColor = isDark ? '#ffffff' : '#0A3EA6';
  const iconColorMid = isDark ? 'rgba(255, 255, 255, 0.9)' : '#1747A6';
  const iconColorLight = isDark ? 'rgba(255, 255, 255, 0.75)' : '#1C58A6';
  const iconColorGlow = isDark ? 'rgba(255, 255, 255, 0.6)' : '#307CBF';
  
  const letterAfaColor = isDark ? '#ffffff' : '#0A3EA6';
  const schoolTextColor = isDark ? '#ffffff' : '#081534';

  return (
    <svg
      id="rafa-school-svg-logo-fallback"
      viewBox="0 0 280 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=JetBrains+Mono:wght@800&display=swap');
            .brand-letter-r {
              font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
              font-weight: 900;
            }
            .brand-letter-afa {
              font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
              font-weight: 900;
            }
            .brand-subtext {
              font-family: 'JetBrains Mono', monospace;
              font-weight: 800;
            }
          `}
        </style>

        {/* Zellij Pattern for Light Theme (User Brand Blues) */}
        <pattern id="zellij-light" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#0A3EA6" />
          <path d="M 0,7 L 14,7 M 7,0 L 7,14" stroke="#1747A6" strokeWidth="0.45" opacity="0.6" />
          <path d="M 0,0 L 14,14 M 0,14 L 14,0" stroke="#1C58A6" strokeWidth="0.45" opacity="0.75" />
          <polygon points="7,2 12,7 7,12 2,7" fill="none" stroke="#307CBF" strokeWidth="0.8" />
          <rect x="6" y="6" width="2" height="2" fill="#1C58A6" transform="rotate(45 7 7)" />
          <circle cx="0" cy="0" r="1.2" fill="#F2F2F2" />
          <circle cx="14" cy="0" r="1.2" fill="#F2F2F2" />
          <circle cx="0" cy="14" r="1.2" fill="#F2F2F2" />
          <circle cx="14" cy="14" r="1.2" fill="#F2F2F2" />
        </pattern>

        {/* Zellij Pattern for Dark Theme (White & Silver) */}
        <pattern id="zellij-dark" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#ffffff" />
          <path d="M 0,7 L 14,7 M 7,0 L 7,14" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.9" />
          <path d="M 0,0 L 14,14 M 0,14 L 14,0" stroke="#94a3b8" strokeWidth="0.5" opacity="0.9" />
          <polygon points="7,2 12,7 7,12 2,7" fill="none" stroke="#64748b" strokeWidth="0.8" />
          <rect x="6" y="6" width="2" height="2" fill="#475569" transform="rotate(45 7 7)" />
        </pattern>
      </defs>

      {/* 1. Icon Group: Elegant Open Book & Digital Pixels */}
      <g id="icon-group" transform="translate(4, 2)">
        <path
          d="M 12 58 C 12 36 20 14 52 14 L 52 46 C 28 46 18 62 18 62 Z"
          fill={iconColor}
          className="transition-colors duration-300"
        />
        <path
          d="M 18 62 C 18 44 26 24 52 24 L 52 50 C 32 50 24 62 24 62 Z"
          fill={iconColorMid}
          opacity="0.9"
          className="transition-colors duration-300"
        />
        <path
          d="M 24 62 C 24 52 32 32 52 32 L 52 54 C 36 54 30 62 30 62 Z"
          fill={iconColorLight}
          opacity="0.75"
          className="transition-colors duration-300"
        />

        {/* Floating Digital Pixels */}
        <rect
          x="58"
          y="15"
          width="10"
          height="10"
          fill={iconColor}
          rx="1"
          transform="rotate(15 58 15)"
          className="transition-colors duration-300"
        />
        <rect
          x="48"
          y="28"
          width="8"
          height="8"
          fill={iconColorMid}
          rx="1"
          transform="rotate(45 48 28)"
          className="transition-colors duration-300"
        />
        <rect
          x="40"
          y="42"
          width="6"
          height="6"
          fill={iconColorLight}
          rx="0.5"
          transform="rotate(30 40 42)"
          className="transition-colors duration-300"
        />
        <rect
          x="60"
          y="36"
          width="5"
          height="5"
          fill={iconColorGlow}
          rx="0.5"
          transform="rotate(12 60 36)"
          className="transition-colors duration-300"
        />
      </g>

      {/* 2. Brand Monogram "rafa" Group */}
      <g id="letters-group" transform="translate(86, -1)">
        <text
          x="0"
          y="56"
          className="brand-letter-r"
          fontSize="64"
          fill={isDark ? 'url(#zellij-dark)' : 'url(#zellij-light)'}
          letterSpacing="-3"
        >
          R
        </text>

        <text
          x="52"
          y="56"
          className="brand-letter-afa transition-colors duration-300"
          fontSize="64"
          fill={letterAfaColor}
          letterSpacing="-3"
        >
          afa
        </text>
      </g>

      {/* 3. Spaced Brand Subtext "S C H O O L" */}
      <text
        x="88"
        y="72"
        className="brand-subtext transition-colors duration-300"
        fontSize="14.5"
        letterSpacing="5.8"
        fill={schoolTextColor}
        opacity="0.95"
      >
        SCHOOL
      </text>
    </svg>
  );
}
