'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/data/russianTasks';
import { CheckCircle2, Eye, EyeOff, BookOpen, Sparkles } from 'lucide-react';

interface DocumentWorkspaceProps {
  tasks: TaskItem[];
  activeTask?: TaskItem | null;
  isWatermarked?: boolean;
  watermarkText?: string;
  title?: string;
}

export function DocumentWorkspace({
  tasks,
  activeTask,
  isWatermarked = false,
  watermarkText = 'ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР',
  title = 'Рабочий лист по русскому языку'
}: DocumentWorkspaceProps) {
  const [showAnswerKeys, setShowAnswerKeys] = useState(false);

  // If no active task and tasks array is empty
  const displayTasks = tasks.length > 0 ? tasks : activeTask ? [activeTask] : [];

  return (
    <div
      id="document-workspace-container"
      className="relative w-full h-full flex flex-col items-center overflow-y-auto p-4 sm:p-6"
    >
      {/* Real A4 Paper-Style Sheet Container */}
      <div
        id="printable-worksheet"
        className="print-document relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-200/90 shadow-lg p-6 sm:p-10 transition-all duration-300 overflow-hidden min-h-[600px] flex flex-col justify-between"
      >
        {/* Diagonal Watermark for Preview (Screen 5) */}
        {isWatermarked && (
          <div
            aria-hidden="true"
            className="watermark-print-hide pointer-events-none absolute inset-0 flex items-center justify-center select-none z-20 overflow-hidden"
          >
            <div className="transform -rotate-45 text-4xl sm:text-5xl md:text-6xl font-black text-emerald-800/12 tracking-widest whitespace-nowrap uppercase border-y-4 border-dashed border-emerald-800/10 py-6 px-12 text-center">
              {watermarkText}
            </div>
          </div>
        )}

        {/* Top Header of Document */}
        <div className="relative z-10 border-b-2 border-emerald-300 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                К
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-700">
                Конструктор заданий · Методика Эльвиры
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium no-print">
              <button
                type="button"
                onClick={() => setShowAnswerKeys(!showAnswerKeys)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Переключить ключи ответов"
              >
                {showAnswerKeys ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Скрыть ответы</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Показать ответы</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-emerald-950/90 tracking-tight">
            {displayTasks.length === 1 ? displayTasks[0].title : title}
          </h2>

          {/* Student metadata fields */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-emerald-900/80 font-medium">
            <div className="border-b border-emerald-300/80 pb-1">
              <span className="text-emerald-700/60 mr-1">Ученик:</span> __________________
            </div>
            <div className="border-b border-emerald-300/80 pb-1">
              <span className="text-emerald-700/60 mr-1">Класс:</span> _______
            </div>
            <div className="border-b border-emerald-300/80 pb-1">
              <span className="text-emerald-700/60 mr-1">Дата:</span> «___» ________ 202_ г.
            </div>
          </div>
        </div>

        {/* Main Document Content: Tasks List */}
        <div className="relative z-10 flex-1 space-y-8">
          {displayTasks.length === 0 ? (
            <div className="py-16 text-center text-emerald-700/70">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-emerald-600" />
              <p className="text-base font-semibold">Выберите задание слева для отображения документа</p>
              <p className="text-xs text-emerald-600/60 mt-1">
                Кликните по заданию или разделу, чтобы посмотреть его структуру и упражнения
              </p>
            </div>
          ) : (
            displayTasks.map((task, index) => (
              <div
                key={task.id}
                className="task-print-block pb-6 border-b border-emerald-100/90 last:border-b-0"
              >
                {/* Task Title & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs">
                      {index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight">
                      {task.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    {task.grade}
                  </span>
                </div>

                {/* Rule explanation tip card */}
                {task.ruleExplanation && (
                  <div className="my-2.5 p-3 rounded-xl bg-emerald-50/70 border-l-4 border-emerald-500 text-xs sm:text-sm text-emerald-900/85">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Памятка к заданию:</span>
                    </div>
                    <p className="leading-relaxed">{task.ruleExplanation}</p>
                  </div>
                )}

                {/* Exercise prompt */}
                <div className="mt-3 mb-3">
                  <p className="font-semibold text-sm sm:text-base text-emerald-900/95 leading-snug">
                    <span className="text-emerald-700 mr-1">Инструкция:</span>
                    {task.exercisePrompt}
                  </p>
                </div>

                {/* Sentences / Exercise Body */}
                <div className="space-y-2.5 pl-2 sm:pl-3">
                  {task.sentences.map((sentence, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-sm sm:text-base font-normal text-emerald-950 leading-relaxed tracking-wide bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-100/60"
                    >
                      {sentence}
                    </div>
                  ))}
                </div>

                {/* Teacher Answer Key (Toggleable or printed) */}
                {showAnswerKeys && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950">
                    <div className="flex items-center gap-1 font-bold text-amber-800 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Ключи для проверки (ответы):</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-amber-900/90 font-mono text-xs">
                      {task.answerKey.map((ans, aIdx) => (
                        <li key={aIdx}>{ans}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Document Footer */}
        <div className="relative z-10 pt-6 mt-6 border-t border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-700/75">
          <span>Сконструировано в «Конструкторе заданий по русскому языку»</span>
          <span className="mt-1 sm:mt-0 font-medium">Страница 1 из 1</span>
        </div>
      </div>
    </div>
  );
}
