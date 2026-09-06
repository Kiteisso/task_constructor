'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 52 }: LogoProps) {
  return (
    <div
      id="app-main-logo"
      className={`relative inline-flex items-center gap-3 select-none ${className}`}
      aria-label="Логотип Конструктора заданий"
    >
      {/* Precision isometric SVG recreation of logo.jpeg in sage-green palette */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Subtle green gradients for isometric block faces */}
          <linearGradient id="topFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8cc1a0" />
            <stop offset="100%" stopColor="#67a680" />
          </linearGradient>
          <linearGradient id="leftFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4d8664" />
            <stop offset="100%" stopColor="#3b6e50" />
          </linearGradient>
          <linearGradient id="rightFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a694d" />
            <stop offset="100%" stopColor="#285038" />
          </linearGradient>

          {/* Light block gradients */}
          <linearGradient id="lightTopFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4faf6" />
            <stop offset="100%" stopColor="#e3efe7" />
          </linearGradient>
          <linearGradient id="lightLeftFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c5e0ce" />
            <stop offset="100%" stopColor="#a8cbb3" />
          </linearGradient>
          <linearGradient id="lightRightFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#97bea3" />
            <stop offset="100%" stopColor="#7ba589" />
          </linearGradient>
        </defs>

        {/* Soft drop shadow */}
        <ellipse cx="100" cy="180" rx="60" ry="12" fill="rgba(46, 125, 50, 0.12)" filter="blur(4px)" />

        {/* --- BLOCK 1: Top-Left Lego Brick (with 4 studs) --- */}
        <g transform="translate(18, 22)">
          {/* Top Face */}
          <polygon
            points="55,8 90,26 55,44 20,26"
            fill="url(#lightTopFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <polygon
            points="20,26 55,44 55,76 20,58"
            fill="url(#lightLeftFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="55,44 90,26 90,58 55,76"
            fill="url(#lightRightFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* 4 Lego Studs on Top Face */}
          {/* Stud 1 */}
          <ellipse cx="38" cy="22" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          {/* Stud 2 */}
          <ellipse cx="55" cy="16" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          {/* Stud 3 */}
          <ellipse cx="55" cy="34" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          {/* Stud 4 */}
          <ellipse cx="72" cy="28" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
        </g>

        {/* --- BLOCK 2: Top-Right Lego Brick (with 4 studs & seam) --- */}
        <g transform="translate(92, 22)">
          {/* Top Face */}
          <polygon
            points="55,8 90,26 55,44 20,26"
            fill="url(#lightTopFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Left Face with horizontal seam */}
          <polygon
            points="20,26 55,44 55,76 20,58"
            fill="url(#lightLeftFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="20" y1="42" x2="55" y2="60" stroke="#3a6b4d" strokeWidth="2" strokeDasharray="1 1" />
          {/* Right Face with seam */}
          <polygon
            points="55,44 90,26 90,58 55,76"
            fill="url(#lightRightFace)"
            stroke="#3a6b4d"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="55" y1="60" x2="90" y2="42" stroke="#3a6b4d" strokeWidth="2" />
          {/* 4 Lego Studs on Top Face */}
          <ellipse cx="38" cy="22" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          <ellipse cx="55" cy="16" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          <ellipse cx="55" cy="34" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
          <ellipse cx="72" cy="28" rx="6" ry="3.2" fill="#e3efe7" stroke="#3a6b4d" strokeWidth="2.5" />
        </g>

        {/* --- BLOCK 3: Bottom-Center Cube with letter "К" --- */}
        <g transform="translate(55, 78)">
          {/* Top Face with Russian "К" */}
          <polygon
            points="45,10 82,30 45,50 8,30"
            fill="url(#topFaceGrad)"
            stroke="#214b33"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <polygon
            points="8,30 45,50 45,90 8,70"
            fill="url(#leftFaceGrad)"
            stroke="#214b33"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="45,50 82,30 82,70 45,90"
            fill="url(#rightFaceGrad)"
            stroke="#214b33"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Isometric Bold Letter "К" (Cyrillic K) on top face */}
          <g transform="translate(45, 30) skewX(-26) skewY(15) scale(0.9, 0.5)">
            <text
              x="0"
              y="5"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              fontSize="34"
              stroke="#214b33"
              strokeWidth="1.2"
              letterSpacing="-0.05em"
            >
              К
            </text>
          </g>
        </g>
      </svg>

      {/* Brand title text: "Rusly" in saturated dark green with subtle shadow */}
      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#064e3b] drop-shadow-[0_1.5px_3px_rgba(6,78,59,0.3)] select-none">
        Rusly
      </span>
    </div>
  );
}
