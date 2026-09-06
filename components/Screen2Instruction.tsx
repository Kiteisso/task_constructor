'use client';

import React from 'react';
import { Logo } from './Logo';
import { LegoManual } from './LegoManual';
import { ChevronLeft, Blocks, ArrowRight } from 'lucide-react';

interface Screen2InstructionProps {
  onBack: () => void;
  onProceed: () => void;
}

export function Screen2Instruction({ onBack, onProceed }: Screen2InstructionProps) {
  return (
    <main
      id="screen-2-instruction"
      className="relative z-10 min-h-screen flex flex-col justify-between p-3 sm:p-6 md:p-12 max-w-7xl mx-auto"
    >
      {/* Top Header with Back Button and Logo on light-green glass rectangles */}
      <header className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold text-emerald-900 bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_2px_12px_rgba(16,185,129,0.06)] hover:bg-[#e1efe6] transition-all cursor-pointer"
          title="Вернуться на главную"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-700" />
          <span>Назад</span>
        </button>

        <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_2px_12px_rgba(16,185,129,0.06)]">
          <Logo size={42} />
        </div>
      </header>

      {/* Main Content: Title & descriptions placed on delicate light-green glass rectangles */}
      <div className="my-auto py-4 sm:py-6 lg:py-8 w-full">
        <div className="flex flex-col items-center text-center mb-5 sm:mb-7">
          {/* Badge on soft-green glass pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] text-emerald-900 text-xs font-bold shadow-xs mb-3">
            <Blocks className="w-3.5 h-3.5 text-emerald-700" />
            <span>Инструкция по сборке заданий</span>
          </div>

          {/* Heading in soft-green glass rectangle */}
          <div className="w-full sm:w-auto inline-block p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_8px_30px_rgba(16,185,129,0.08)] mb-3 transition-all text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#047857] tracking-tight leading-[1.15] drop-shadow-[0_2px_4px_rgba(4,120,87,0.2)]">
              Как работает конструктор
            </h2>
          </div>

          {/* Subtitle / explanation in soft-green glass rectangle */}
          <div className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-[0_4px_20px_rgba(16,185,129,0.06)] max-w-2xl mx-auto">
            <p className="text-xs sm:text-base text-emerald-950 font-medium leading-relaxed">
              Сборка дидактического листа напоминает сборку модели LEGO: от базовой задумки до готового документа за 4 простых шага.
            </p>
          </div>
        </div>

        {/* The Translucent Light-Green Glass Rectangle with 4 Stages */}
        <div className="relative rounded-3xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all">
          <LegoManual />
        </div>
      </div>

      {/* Bottom: Green button "Приступить к конструированию" */}
      <footer className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4 pb-1 sm:pb-2">
        <button
          id="btn-start-building"
          onClick={onProceed}
          className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-14 py-2.5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-lg tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>Приступить к конструированию</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        {/* Footnote text in light-green glass rectangle */}
        <div className="mt-2 sm:mt-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-[#ebf4ef]/85 backdrop-blur-md border border-[#c1dec9] shadow-xs">
          <span className="text-[11px] sm:text-xs font-medium text-emerald-900/80">
            Переход к выбору разделов и заданий (Шаг 3)
          </span>
        </div>
      </footer>
    </main>
  );
}
