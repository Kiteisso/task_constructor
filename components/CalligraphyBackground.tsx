'use client';

import React from 'react';

/**
 * Calligraphic Russian letters and calligraphy rules scattered across the background.
 * Sparsely positioned ("реже"), across the full viewport ("по всему сайту"),
 * and noticeably brighter ("чуть-чуть ярче") with authentic cursive styling.
 */
export function CalligraphyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0 opacity-85 mix-blend-multiply"
    >
      {/* 1. Top Left - Calligraphic 'А' and 'палочка' */}
      <div className="absolute top-[5%] left-[5%] font-cursive text-6xl sm:text-7xl md:text-8xl text-emerald-800/45 -rotate-12">
        А
      </div>
      <div className="absolute top-[14%] left-[10%] font-cursive text-3xl sm:text-4xl text-emerald-700/50 rotate-6">
        палочка
      </div>

      {/* 2. Top Center - Classic rule 'жи-ши' */}
      <div className="absolute top-[7%] left-[45%] -translate-x-1/2 font-cursive text-3xl sm:text-5xl text-emerald-700/50 -rotate-3">
        жи-ши пиши с И
      </div>

      {/* 3. Top Right - Large 'б' and 'правило' */}
      <div className="absolute top-[6%] right-[8%] font-cursive text-5xl sm:text-7xl md:text-8xl text-emerald-800/45 rotate-12">
        б
      </div>
      <div className="absolute top-[16%] right-[12%] font-cursive text-3xl sm:text-4xl text-emerald-700/50 -rotate-6">
        правило
      </div>

      {/* 4. Upper-Mid Left - Letter 'ж' */}
      <div className="absolute top-[28%] left-[3%] font-cursive text-5xl sm:text-6xl md:text-7xl text-emerald-700/45 6">
        ж
      </div>

      {/* 5. Upper-Mid Right - 'чистописание' and letter 'Д' */}
      <div className="absolute top-[28%] right-[4%] font-cursive text-3xl sm:text-4xl text-emerald-700/50 rotate-8">
        чистописание
      </div>
      <div className="absolute top-[37%] right-[10%] font-cursive text-5xl sm:text-7xl text-emerald-800/45 -rotate-8">
        Д
      </div>

      {/* 6. Center background - faint large cursive flourishes */}
      <div className="absolute top-[48%] left-[8%] font-cursive text-3xl sm:text-5xl text-emerald-700/45 -rotate-6">
        ча-ща пиши с А
      </div>
      <div className="absolute top-[50%] right-[7%] font-cursive text-4xl sm:text-6xl text-emerald-800/50 12">
        словарные слова
      </div>

      {/* 7. Lower-Mid Left - Letter 'в' and 'орфограмма' */}
      <div className="absolute top-[64%] left-[6%] font-cursive text-6xl sm:text-7xl text-emerald-800/45 -rotate-12">
        в
      </div>
      <div className="absolute top-[73%] left-[12%] font-cursive text-2xl sm:text-4xl text-emerald-700/50 rotate-6">
        орфограмма
      </div>

      {/* 8. Lower-Mid Right - 'чу-щу' and letter 'з' */}
      <div className="absolute top-[66%] right-[6%] font-cursive text-3xl sm:text-4xl text-emerald-700/50 -rotate-6">
        чу-щу пиши с У
      </div>
      <div className="absolute top-[75%] right-[14%] font-cursive text-5xl sm:text-7xl text-emerald-800/45 rotate-12">
        з
      </div>

      {/* 9. Bottom Left - letter 'я' and 'деепричастие' */}
      <div className="absolute bottom-[6%] left-[6%] font-cursive text-6xl sm:text-8xl text-emerald-800/50 rotate-8">
        я
      </div>
      <div className="absolute bottom-[13%] left-[16%] font-cursive text-2xl sm:text-4xl text-emerald-700/50 -rotate-6">
        деепричастие
      </div>

      {/* 10. Bottom Center - letter 'ф' */}
      <div className="absolute bottom-[5%] left-[48%] -translate-x-1/2 font-cursive text-5xl sm:text-7xl text-emerald-700/45 rotate-3">
        ф
      </div>

      {/* 11. Bottom Right - signature exclamation 'готово!?' and letter 'Э' */}
      <div className="absolute bottom-[7%] right-[7%] font-cursive text-4xl sm:text-6xl md:text-7xl text-emerald-800/55 -rotate-8">
        готово!?
      </div>
      <div className="absolute bottom-[16%] right-[18%] font-cursive text-5xl sm:text-7xl text-emerald-700/45 8">
        Э
      </div>
    </div>
  );
}
