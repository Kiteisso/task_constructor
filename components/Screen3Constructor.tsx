'use client';

import React, { useState } from 'react';
import { Section, TaskItem, SECTIONS_DATA } from '@/data/russianTasks';
import { DocumentWorkspace } from './DocumentWorkspace';
import { Logo } from './Logo';
import {
  ChevronLeft,
  Download,
  Check,
  Plus,
  Layers,
  ChevronRight,
  BookOpen,
  X,
  FileCheck2
} from 'lucide-react';

interface Screen3ConstructorProps {
  sections: Section[];
  selectedTasks: TaskItem[];
  onToggleTask: (task: TaskItem) => void;
  onRemoveSelectedTask: (taskId: string) => void;
  onBack: () => void;
  onGoToExport: () => void;
}

export function Screen3Constructor({
  sections = SECTIONS_DATA,
  selectedTasks,
  onToggleTask,
  onRemoveSelectedTask,
  onBack,
  onGoToExport
}: Screen3ConstructorProps) {
  // Currently active section (defaults to first section: Grammar)
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || 'grammar');
  // Whether the sections menu is collapsed to the narrow badge strip (as on the scheme)
  const [isSectionsCollapsed, setIsSectionsCollapsed] = useState<boolean>(true);
  // Active task currently previewed in the document space
  const [previewTaskId, setPreviewTaskId] = useState<string>(
    selectedTasks[0]?.id || sections[0]?.tasks[0]?.id || ''
  );

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const allTasks = sections.flatMap((s) => s.tasks);
  const activePreviewTask = allTasks.find((t) => t.id === previewTaskId) || activeSection?.tasks[0];

  const handleSelectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setIsSectionsCollapsed(true);
    const targetSection = sections.find((s) => s.id === sectionId);
    if (targetSection && targetSection.tasks.length > 0) {
      setPreviewTaskId(targetSection.tasks[0].id);
    }
  };

  const handleTaskClick = (task: TaskItem) => {
    setPreviewTaskId(task.id);
  };

  return (
    <main
      id="screen-3-constructor"
      className="relative z-10 min-h-screen flex flex-col bg-white text-emerald-950"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/90 backdrop-blur-md border-b border-emerald-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Назад к инструкции"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Инструкция</span>
          </button>
          <Logo size={36} />
        </div>

        {/* Current status info */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-emerald-800/80 bg-emerald-50/60 px-3 py-1 rounded-full border border-emerald-200/60">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Раздел: {activeSection?.name}</span>
          <span className="text-emerald-400">·</span>
          <span>Выбрано задач: {selectedTasks.length}</span>
        </div>

        {/* Top-Right Download Icon Button (Navigates to Screen 5) */}
        <div className="flex items-center gap-3">
          <button
            id="btn-goto-screen5"
            onClick={onGoToExport}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            title="Скачать и экспортировать рабочий лист (Страница 5)"
          >
            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            <span>Скачать</span>
            {selectedTasks.length > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-white text-emerald-800 text-xs font-black flex items-center justify-center">
                {selectedTasks.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout (3 Columns as depicted in the wireframe) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* --- LEFT SECTION 1 & 2: SECTIONS & TASKS DRAWER --- */}
        <div className="flex shrink-0 z-20 border-r border-emerald-200/80 bg-[#eef7f1]">
          {/* Narrow Strip with Letter Badges (A, B, C, D, S) when collapsed */}
          <div
            className={`flex flex-col items-center py-4 px-2 bg-emerald-800 text-white transition-all duration-300 ${
              isSectionsCollapsed ? 'w-14 sm:w-16' : 'w-16'
            }`}
          >
            <button
              onClick={() => setIsSectionsCollapsed(!isSectionsCollapsed)}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/60 transition-colors mb-4"
              title={isSectionsCollapsed ? 'Развернуть разделы' : 'Свернуть'}
            >
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${
                  isSectionsCollapsed ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>

            {/* Badges Column: (A), (B), (C), (D), (S) matching wireframe scheme */}
            <div className="flex flex-col gap-3 w-full items-center">
              {sections.map((section) => {
                const isActive = section.id === activeSectionId;
                const sectionTaskCount = selectedTasks.filter(
                  (t) => t.sectionId === section.id
                ).length;

                return (
                  <button
                    key={section.id}
                    onClick={() => handleSelectSection(section.id)}
                    className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-emerald-900 shadow-md ring-2 ring-emerald-300 scale-105'
                        : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-700/80 hover:text-white'
                    }`}
                    title={`${section.badge} — ${section.name}`}
                  >
                    <span>{section.badge}</span>
                    {sectionTaskCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 text-emerald-950 font-black text-[10px] flex items-center justify-center ring-1 ring-white">
                        {sectionTaskCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Sections Pop-up Drawer (When expanded, or alongside task list) */}
          {!isSectionsCollapsed && (
            <div className="w-64 p-4 bg-emerald-700 text-white flex flex-col justify-between border-r border-emerald-600 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-600">
                  <h3 className="text-sm font-bold tracking-wide uppercase text-emerald-100">
                    Разделы конструктора
                  </h3>
                  <button
                    onClick={() => setIsSectionsCollapsed(true)}
                    className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {sections.map((section) => {
                    const isActive = section.id === activeSectionId;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSelectSection(section.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-emerald-900 shadow-sm ring-2 ring-emerald-300'
                            : 'bg-white/95 text-emerald-800 hover:bg-white hover:text-emerald-950'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-black">
                            {section.badge}
                          </span>
                          <span>{section.name}</span>
                        </div>
                        <span className="text-[11px] font-normal text-emerald-600">
                          {section.tasks.length} заданий
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-emerald-800/80 text-[11px] text-emerald-100/80 leading-snug">
                Нажмите на раздел, чтобы открыть банк авторских заданий.
              </div>
            </div>
          )}

          {/* Tasks Drawer for the Selected Section ("Раздел. Задание") */}
          <div className="w-72 sm:w-80 p-4 flex flex-col justify-between bg-emerald-50/60 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div>
              {/* Header: "Раздел. Задание" */}
              <div className="mb-4 pb-2 border-b border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                    {activeSection?.badge}
                  </span>
                  <h3 className="text-sm font-extrabold text-emerald-950 tracking-tight">
                    {activeSection?.name}. Задания
                  </h3>
                </div>
                <p className="text-[11px] text-emerald-800/70 mt-1 leading-snug">
                  {activeSection?.description}
                </p>
              </div>

              {/* List of Tasks on White Rectangular Buttons with Checkboxes */}
              <div className="space-y-2.5">
                {activeSection?.tasks.map((task) => {
                  const isSelected = selectedTasks.some((t) => t.id === task.id);
                  const isPreviewing = previewTaskId === task.id;

                  return (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={`group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-100/70 border-emerald-500 shadow-2xs'
                          : isPreviewing
                          ? 'bg-white border-emerald-400 shadow-2xs ring-2 ring-emerald-200/60'
                          : 'bg-white border-emerald-200/80 hover:border-emerald-300 hover:bg-emerald-50/40'
                      }`}
                    >
                      {/* Task Info & Title */}
                      <div className="flex-1 pr-2">
                        <div className="text-xs sm:text-sm font-bold text-emerald-950 leading-snug">
                          {task.shortTitle}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                            {task.grade}
                          </span>
                          {isPreviewing && (
                            <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-0.5">
                              <BookOpen className="w-3 h-3" /> Просмотр
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Checkbox / Plus Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTask(task);
                        }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-600 hover:text-white'
                        }`}
                        title={isSelected ? 'Убрать из выбранных' : 'Добавить в рабочий лист'}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper in Task Drawer */}
            <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-700/75 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Кликните по заданию для открытия документа</span>
            </div>
          </div>
        </div>

        {/* --- CENTER: SPACE FOR DOCUMENT ("Пространство для документа") --- */}
        <div className="flex-1 min-w-0 bg-[#f8faf9] flex flex-col overflow-hidden">
          <div className="px-6 py-2.5 bg-white/70 border-b border-emerald-200/60 flex items-center justify-between text-xs text-emerald-800">
            <span className="font-semibold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Пространство для документа · {activePreviewTask?.title}
            </span>
            <span className="text-emerald-600/70 hidden sm:inline">
              Предпросмотр структуры и упражнений
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <DocumentWorkspace
              tasks={activePreviewTask ? [activePreviewTask] : []}
              activeTask={activePreviewTask}
              isWatermarked={false}
              title={activePreviewTask?.title || 'Рабочий лист'}
            />
          </div>
        </div>

        {/* --- RIGHT: DYNAMIC LIST OF SELECTED TASKS --- */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-emerald-200/80 bg-white p-4 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-60px)]">
          <div>
            {/* Header: "Выбрано: N задания" */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-extrabold text-emerald-950">
                  Выбрано: {selectedTasks.length} {selectedTasks.length === 1 ? 'задание' : selectedTasks.length > 4 ? 'заданий' : 'задания'}
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Лист
              </span>
            </div>

            {/* Dynamic List of Selected Tasks */}
            {selectedTasks.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-emerald-200 rounded-2xl my-4 text-emerald-700/70">
                <Plus className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-900">Задания пока не выбраны</p>
                <p className="text-[11px] text-emerald-700/60 mt-1">
                  Нажимайте плюсики или чекбоксы слева, чтобы наполнить рабочий лист
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedTasks.map((task, index) => (
                  <div
                    key={task.id}
                    onClick={() => setPreviewTaskId(task.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      previewTaskId === task.id
                        ? 'bg-emerald-100/80 border-emerald-500 shadow-2xs font-semibold'
                        : 'bg-emerald-50/50 border-emerald-200/70 hover:bg-emerald-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-bold text-emerald-950 block truncate">
                          {task.shortTitle}
                        </span>
                        <span className="text-[10px] text-emerald-700/70 block">
                          {task.sectionBadge} · {task.sectionName}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSelectedTask(task.id);
                      }}
                      className="p-1 rounded-md text-emerald-700/60 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 ml-1 cursor-pointer"
                      title="Удалить из выбранных"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Callout in Right Sidebar: Navigate to Screen 5 */}
          <div className="pt-4 border-t border-emerald-200/80 mt-4">
            <button
              onClick={onGoToExport}
              disabled={selectedTasks.length === 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-sm transition-all cursor-pointer ${
                selectedTasks.length === 0
                  ? 'bg-emerald-200 text-emerald-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Перейти к скачиванию (Стр. 5)</span>
            </button>
            <p className="text-[10px] text-center text-emerald-700/60 mt-1.5">
              Сортировка, водяной знак, PDF, DOCX и репост
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
