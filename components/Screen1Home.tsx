'use client';

import React from 'react';
import { Logo } from './Logo';
import { ElviraHero } from './ElviraHero';
import { Download, FileText, HelpCircle, ArrowRight } from 'lucide-react';

interface Screen1HomeProps {
  onStart: () => void;
  onOpenHelp: () => void;
}

export function Screen1Home({ onStart, onOpenHelp }: Screen1HomeProps) {
  return (
    <main
      id="screen-1-home"
      className="relative z-10 min-h-screen flex flex-col justify-between p-3 sm:p-6 md:p-12 max-w-7xl mx-auto"
    >
      {/* Top Header: Logo and Info button on light-green glass rectangles */}
      <header className="flex items-center justify-between w-full">
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_2px_12px_rgba(16,185,129,0.06)]">
          <Logo size={42} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs font-bold text-emerald-900 bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_2px_12px_rgba(16,185,129,0.06)] hover:bg-[#e1efe6] transition-all cursor-pointer"
            title="Инструкция к конструктору"
          >
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Инструкция</span>
          </button>
        </div>
      </header>

      {/* Hero Section: On mobile: Title -> Photo -> Description & Chips. On desktop: 2-column layout */}
      <div className="my-auto py-2 sm:py-6 lg:py-10 flex flex-col lg:grid lg:grid-cols-12 items-center justify-between gap-3 sm:gap-5 lg:gap-12 w-full">
        {/* 1. Main Title Block */}
        <div className="order-1 lg:col-span-7 flex flex-col items-center lg:items-start w-full">
          <div className="w-full sm:w-auto inline-block p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_8px_30px_rgba(16,185,129,0.08)] mb-1 sm:mb-3 transition-all text-center lg:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold text-[#047857] tracking-tight leading-[1.14] drop-shadow-[0_2px_5px_rgba(4,120,87,0.22)]">
              Конструктор заданий по русскому языку
            </h1>
          </div>
        </div>

        {/* 2. Photo of Elvira (Enlarged): On mobile order-2 (between Title and Description), on desktop right column */}
        <div className="order-2 lg:order-2 lg:col-span-5 lg:row-span-2 flex justify-center lg:justify-end w-full my-2 sm:my-3 lg:my-0">
          <ElviraHero />
        </div>

        {/* 3. Description & 3 Chips: On mobile placed UNDER photo (order-3), on desktop placed in left column */}
        <div className="order-3 lg:order-3 lg:col-span-7 flex flex-col items-center lg:items-start w-full">
          {/* Description text on a light-green glass rectangle */}
          <div className="w-full p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_6px_24px_rgba(16,185,129,0.06)] mb-2.5 sm:mb-4 max-w-xl text-center lg:text-left">
            <p className="text-xs sm:text-base lg:text-lg text-emerald-900/90 leading-relaxed font-medium">
              Собирайте авторские дидактические материалы, проверочные карточки и рабочие листы
              будто из кубиков лего. Быстро, методически выверено и со вкусом.
            </p>
          </div>

          {/* 3 feature badges on light-green glass rectangles */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 pt-0 sm:pt-1">
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_4px_16px_rgba(16,185,129,0.06)] hover:bg-[#e1efe6] hover:scale-[1.02] transition-all cursor-pointer"
              onClick={onStart}
              title="Готовые задания"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-emerald-950">База заданий</span>
            </div>

            <div
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_4px_16px_rgba(16,185,129,0.06)] hover:bg-[#e1efe6] hover:scale-[1.02] transition-all cursor-pointer"
              onClick={onStart}
              title="Экспорт в PDF и DOCX"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-emerald-950">PDF & DOCX</span>
            </div>

            <div
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_4px_16px_rgba(16,185,129,0.06)] hover:bg-[#e1efe6] hover:scale-[1.02] transition-all cursor-pointer"
              onClick={onOpenHelp}
              title="Как это работает"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-emerald-950">Методика</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center: Green Start Button */}
      <footer className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4 pb-1 sm:pb-2">
        <button
          id="btn-start-construction"
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-14 py-2.5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-lg tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>Начать</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        {/* Footnote text on light-green glass rectangle */}
        <div className="mt-2 sm:mt-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-xs">
          <span className="text-[11px] sm:text-xs font-medium text-emerald-900/80">
            Переход к интерактивной инструкции и конструктору
          </span>
        </div>
      </footer>
    </main>
  );
}
