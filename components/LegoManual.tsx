'use client';

import React from 'react';

export function LegoManual() {
  const steps = [
    {
      num: '1',
      title: 'Идея',
      desc: 'Определите цель урока: закрепление правила, подготовка к ВПР или проверочная работа.',
      // SVG 1: Single green 2x2 Lego brick
      renderSvg: () => (
        <svg viewBox="0 0 120 100" className="w-20 h-16 sm:w-24 sm:h-20" fill="none">
          <g transform="translate(10, 10)">
            {/* Top face */}
            <polygon
              points="50,15 85,32 50,50 15,32"
              fill="#8ec2a2"
              stroke="#2e593f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Left face */}
            <polygon
              points="15,32 50,50 50,75 15,57"
              fill="#528b68"
              stroke="#2e593f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Right face */}
            <polygon
              points="50,50 85,32 85,57 50,75"
              fill="#3a6f4e"
              stroke="#2e593f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* 4 studs */}
            <ellipse cx="33" cy="28" rx="6" ry="3.5" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2.5" />
            <ellipse cx="50" cy="23" rx="6" ry="3.5" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2.5" />
            <ellipse cx="50" cy="40" rx="6" ry="3.5" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2.5" />
            <ellipse cx="67" cy="35" rx="6" ry="3.5" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2.5" />
          </g>
        </svg>
      )
    },
    {
      num: '2',
      title: 'Сборка',
      desc: 'Подбирайте нужные разделы и упражнения из каталога, соединяя их в единый тест.',
      // SVG 2: Two Lego bricks connecting with a pin/connector
      renderSvg: () => (
        <svg viewBox="0 0 130 100" className="w-20 h-16 sm:w-24 sm:h-20" fill="none">
          {/* Left piece */}
          <g transform="translate(5, 25)">
            <polygon points="30,10 50,20 30,30 10,20" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2.5" />
            <polygon points="10,20 30,30 30,48 10,38" fill="#67a17d" stroke="#2e593f" strokeWidth="2.5" />
            <polygon points="30,30 50,20 50,38 30,48" fill="#4d8664" stroke="#2e593f" strokeWidth="2.5" />
            <ellipse cx="30" cy="18" rx="5" ry="3" fill="#bfe3cf" stroke="#2e593f" strokeWidth="2" />
          </g>
          {/* Connecting pin / connector rod */}
          <line x1="56" y1="52" x2="74" y2="44" stroke="#224b33" strokeWidth="4" strokeLinecap="round" />
          <circle cx="65" cy="48" r="4" fill="#3a6f4e" />
          {/* Right piece */}
          <g transform="translate(68, 12)">
            <polygon points="30,10 50,20 30,30 10,20" fill="#7eb593" stroke="#2e593f" strokeWidth="2.5" />
            <polygon points="10,20 30,30 30,48 10,38" fill="#528b68" stroke="#2e593f" strokeWidth="2.5" />
            <polygon points="30,30 50,20 50,38 30,48" fill="#3a6f4e" stroke="#2e593f" strokeWidth="2.5" />
            <ellipse cx="30" cy="18" rx="5" ry="3" fill="#9eccb0" stroke="#2e593f" strokeWidth="2" />
          </g>
        </svg>
      )
    },
    {
      num: '3',
      title: 'Текст',
      desc: 'Конструктор автоматически генерирует формулировки заданий, пропуски и ключи.',
      // SVG 3: Lego block textured with document/text lines
      renderSvg: () => (
        <svg viewBox="0 0 120 100" className="w-20 h-16 sm:w-24 sm:h-20" fill="none">
          <g transform="translate(10, 10)">
            {/* Top face with studs */}
            <polygon points="50,15 85,32 50,50 15,32" fill="#8ec2a2" stroke="#2e593f" strokeWidth="3" />
            <ellipse cx="33" cy="28" rx="5.5" ry="3" fill="#b3dfc6" stroke="#2e593f" strokeWidth="2" />
            <ellipse cx="50" cy="23" rx="5.5" ry="3" fill="#b3dfc6" stroke="#2e593f" strokeWidth="2" />
            <ellipse cx="50" cy="40" rx="5.5" ry="3" fill="#b3dfc6" stroke="#2e593f" strokeWidth="2" />
            <ellipse cx="67" cy="35" rx="5.5" ry="3" fill="#b3dfc6" stroke="#2e593f" strokeWidth="2" />
            {/* Left face with ruled document lines */}
            <polygon points="15,32 50,50 50,75 15,57" fill="#ffffff" stroke="#2e593f" strokeWidth="3" />
            <line x1="22" y1="42" x2="44" y2="53" stroke="#2e593f" strokeWidth="2" />
            <line x1="22" y1="48" x2="44" y2="59" stroke="#2e593f" strokeWidth="2" />
            <line x1="22" y1="54" x2="38" y2="62" stroke="#2e593f" strokeWidth="2" />
            {/* Right face */}
            <polygon points="50,50 85,32 85,57 50,75" fill="#4d8664" stroke="#2e593f" strokeWidth="3" />
            <line x1="56" y1="55" x2="78" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="56" y1="62" x2="78" y2="51" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />
          </g>
        </svg>
      )
    },
    {
      num: '4',
      title: 'Готово',
      desc: 'Готовый методический материал готов к печати, выгрузке в PDF/DOCX или репосту.',
      // SVG 4: Assembled Lego model with baseplate
      renderSvg: () => (
        <svg viewBox="0 0 130 100" className="w-20 h-16 sm:w-24 sm:h-20" fill="none">
          <g transform="translate(10, 8)">
            {/* Green baseplate */}
            <polygon points="55,50 105,75 55,95 5,75" fill="#3a6f4e" stroke="#1d432e" strokeWidth="3" />
            <polygon points="5,75 55,95 55,99 5,79" fill="#244b34" stroke="#1d432e" strokeWidth="2" />
            <polygon points="55,95 105,75 105,79 55,99" fill="#1b3927" stroke="#1d432e" strokeWidth="2" />
            {/* Lower block (orange/ochre accent) */}
            <polygon points="40,42 65,55 40,67 15,55" fill="#e6b87d" stroke="#2e593f" strokeWidth="2" />
            <polygon points="15,55 40,67 40,79 15,67" fill="#c4975e" stroke="#2e593f" strokeWidth="2" />
            <polygon points="40,67 65,55 65,67 40,79" fill="#a47a46" stroke="#2e593f" strokeWidth="2" />
            {/* Middle block (teal-green) */}
            <polygon points="65,30 90,42 65,55 40,42" fill="#7eb593" stroke="#2e593f" strokeWidth="2" />
            <polygon points="40,42 65,55 65,67 40,55" fill="#528b68" stroke="#2e593f" strokeWidth="2" />
            <polygon points="65,55 90,42 90,55 65,67" fill="#3a6f4e" stroke="#2e593f" strokeWidth="2" />
            {/* Top crown block */}
            <polygon points="52,18 72,28 52,38 32,28" fill="#a4d4b7" stroke="#2e593f" strokeWidth="2" />
            <polygon points="32,28 52,38 52,48 32,38" fill="#67a17d" stroke="#2e593f" strokeWidth="2" />
            <polygon points="52,38 72,28 72,38 52,48" fill="#4d8664" stroke="#2e593f" strokeWidth="2" />
            {/* Top stud with star spark */}
            <ellipse cx="52" cy="26" rx="4" ry="2.5" fill="#ffffff" stroke="#2e593f" strokeWidth="1.5" />
          </g>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full">
      {/* 4 Lego Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#ebf4ef]/90 backdrop-blur-md border border-[#c1dec9] shadow-[0_4px_16px_rgba(16,185,129,0.06)] transition-all duration-300 hover:shadow-md hover:bg-[#e1efe6] hover:scale-[1.02] group"
          >
            {/* Step header in delicate glass badge */}
            <div className="mb-2 px-3 py-1 rounded-xl bg-white/60 backdrop-blur-xs border border-emerald-300/50 shadow-2xs">
              <span className="text-sm sm:text-base font-extrabold text-[#047857] tracking-tight">
                {step.num}. {step.title}
              </span>
            </div>

            {/* Lego illustration */}
            <div className="my-2 flex items-center justify-center p-2 rounded-xl bg-white/50 group-hover:scale-105 transition-transform duration-300">
              {step.renderSvg()}
            </div>

            {/* Explanation text on light glass rectangle */}
            <div className="mt-2 w-full p-2.5 rounded-xl bg-white/60 backdrop-blur-xs border border-emerald-200/50">
              <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
