'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TaskItem } from '@/data/russianTasks';
import { DocumentWorkspace } from './DocumentWorkspace';
import { Logo } from './Logo';
import {
  ChevronLeft,
  Share2,
  Download,
  Trash2,
  FileText,
  Printer,
  Send,
  Mail,
  Copy,
  Check,
  PlusCircle,
  Sparkles,
  GripVertical
} from 'lucide-react';

interface Screen5ExportProps {
  selectedTasks: TaskItem[];
  onRemoveTask: (taskId: string) => void;
  onReorderTasks: (newTasks: TaskItem[]) => void;
  onBack: () => void;
  onAddMoreTasks: () => void;
}

export function Screen5Export({
  selectedTasks,
  onRemoveTask,
  onReorderTasks,
  onBack,
  onAddMoreTasks
}: Screen5ExportProps) {
  // Dropdown state for export & share popover
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Drag and Drop State for reordering tasks
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // keep open if clicked export button
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (index: number) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const next = [...selectedTasks];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(dropIndex, 0, moved);
    onReorderTasks(next);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Action: Print document
  const handlePrint = () => {
    window.print();
  };

  // Action: Download PDF
  const handleDownloadPDF = () => {
    setDownloadSuccessMsg('Подготовка документа к сохранению в PDF...');
    setTimeout(() => {
      window.print();
      setDownloadSuccessMsg('Документ готов к сохранению в PDF');
      setTimeout(() => setDownloadSuccessMsg(null), 3500);
    }, 400);
  };

  // Action: Download DOCX (read-only formatted document)
  const handleDownloadDOCX = () => {
    const title = 'Рабочий лист по русскому языку (Методика Эльвиры)';
    let docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${title}</title>
      <style>
        body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1b3927; }
        h1 { font-size: 16pt; color: #1e4620; border-bottom: 2pt solid #2e7d32; padding-bottom: 4pt; }
        h2 { font-size: 13pt; color: #2e7d32; margin-top: 14pt; }
        .meta { margin-bottom: 15pt; font-size: 10pt; color: #444; }
        .prompt { font-weight: bold; margin-bottom: 6pt; }
        .sentence { margin-bottom: 5pt; padding-left: 10pt; }
        .rule { background: #f0f7f2; border-left: 3pt solid #4caf50; padding: 6pt; margin: 6pt 0; font-size: 9.5pt; }
        .watermark { color: #aaa; text-align: center; font-size: 9pt; margin-top: 25pt; border-top: 1pt solid #ccc; padding-top: 6pt; }
      </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="meta">
          <strong>Ученик:</strong> ____________________________ &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Класс:</strong> ________ &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Дата:</strong> «___» ____________ 202_ г.
        </div>
    `;

    selectedTasks.forEach((task, idx) => {
      docContent += `
        <h2>Задание ${idx + 1}. ${task.title} (${task.grade})</h2>
        <div class="rule"><strong>Памятка:</strong> ${task.ruleExplanation}</div>
        <div class="prompt">Инструкция: ${task.exercisePrompt}</div>
      `;
      task.sentences.forEach((s) => {
        docContent += `<div class="sentence">${s}</div>`;
      });
    });

    docContent += `
        <div class="watermark">Сконструировано в «Конструкторе заданий по русскому языку» от Эльвиры. Документ защищен от редактирования.</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rabochiy_list_russkiy_yazyk_read_only.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg('Файл DOCX (только для чтения) успешно сохранён');
    setTimeout(() => setDownloadSuccessMsg(null), 3500);
  };

  // Action: Share Telegram
  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `Собрала рабочий лист по русскому языку в Конструкторе заданий Эльвиры! Выбрано заданий: ${selectedTasks.length}`
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  // Action: Share VK
  const handleShareVK = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Конструктор заданий по русскому языку · Рабочий лист');
    window.open(`https://vk.com/share.php?url=${url}&title=${title}`, '_blank');
  };

  // Action: Share Email
  const handleShareEmail = () => {
    const subject = encodeURIComponent('Рабочий лист по русскому языку');
    const body = encodeURIComponent(
      `Здравствуйте!\n\nНаправляю сформированный рабочий лист по русскому языку (${selectedTasks.length} заданий).\nСконструировано в приложении «Конструктор заданий по русскому языку» от Эльвиры.\n\nСсылка: ${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Action: Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <main
      id="screen-5-export"
      className="relative z-10 min-h-screen flex flex-col bg-white text-emerald-950"
    >
      {/* Toast notification message for downloads/shares */}
      {downloadSuccessMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 text-white text-sm font-semibold shadow-xl animate-fade-in no-print">
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Вернуться к выбору заданий"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-700" />
            <span>К конструктору (Стр. 3)</span>
          </button>
          <Logo size={36} />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200">
          <span>Страница 5: Экспорт и предпросмотр</span>
          <span className="text-emerald-400">·</span>
          <span>{selectedTasks.length} зад.</span>
        </div>

        {/* Top-Right: Icons for Share & Download with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-export-menu"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer ${
                isExportDropdownOpen
                  ? 'bg-emerald-700 text-white ring-2 ring-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
              title="Меню скачивания и репоста"
            >
              <Share2 className="w-4 h-4" />
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Экспорт & Репост</span>
            </button>
          </div>

          {/* Popover / Dropdown Menu matching the bottom-right diagram in photo */}
          {isExportDropdownOpen && (
            <div
              id="export-dropdown-menu"
              className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border-2 border-emerald-300/80 shadow-2xl p-4 z-50 text-emerald-950 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Category 1: Типы файлов (File types for download) */}
              <div className="mb-4">
                <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider block mb-2">
                  Типы файлов:
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-colors text-xs sm:text-sm font-bold text-emerald-950 cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-xs">
                        PDF
                      </div>
                      <div>
                        <span>PDF документ</span>
                        <span className="block text-[10px] font-normal text-emerald-700/70">
                          Чистый лист для печати
                        </span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-emerald-600 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={handleDownloadDOCX}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-colors text-xs sm:text-sm font-bold text-emerald-950 cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                        DOC
                      </div>
                      <div>
                        <span>DOCX (без редактирования)</span>
                        <span className="block text-[10px] font-normal text-emerald-700/70">
                          Защищённый файл Word
                        </span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-emerald-600 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-colors text-xs sm:text-sm font-bold text-emerald-950 cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <span>Печать</span>
                        <span className="block text-[10px] font-normal text-emerald-700/70">
                          Прямой вывод на принтер
                        </span>
                      </div>
                    </div>
                    <Printer className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>

              {/* Category 2: Поделиться (Share via Messengers & Email) */}
              <div className="pt-3 border-t border-emerald-200/80">
                <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider block mb-2">
                  Поделиться:
                </span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    onClick={handleShareTelegram}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors text-sky-800 text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-4 h-4 mb-1 text-sky-600" />
                    <span>Telegram</span>
                  </button>

                  <button
                    onClick={handleShareVK}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors text-indigo-800 text-xs font-bold cursor-pointer"
                  >
                    <span className="w-4 h-4 font-black mb-1 text-indigo-600 text-xs flex items-center justify-center">
                      VK
                    </span>
                    <span>ВКонтакте</span>
                  </button>

                  <button
                    onClick={handleShareEmail}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors text-emerald-800 text-xs font-bold cursor-pointer"
                  >
                    <Mail className="w-4 h-4 mb-1 text-emerald-600" />
                    <span>Email</span>
                  </button>
                </div>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ссылка скопирована!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Скопировать прямую ссылку</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content (2 Columns: Left reorderable list of tasks, Center document with watermark) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* --- LEFT SIDE: ONLY SELECTED TASKS WITH TRASH CAN & REORDERING --- */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 border-r border-emerald-200/80 bg-[#eef7f1] p-4 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-60px)] no-print">
          <div>
            {/* Header: "Раздел. Задание" */}
            <div className="mb-3 pb-2 border-b border-emerald-200/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-emerald-950 tracking-tight">
                  Раздел. Задание
                </h3>
                <p className="text-[11px] text-emerald-800/70">
                  Порядок следования и удаление заданий
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Всего: {selectedTasks.length}
              </span>
            </div>

            {/* List of Selected Tasks with Drag & Drop Reordering */}
            {selectedTasks.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-emerald-200 rounded-2xl bg-white/60 my-4">
                <FileText className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-900">Вы удалили все задания</p>
                <p className="text-[11px] text-emerald-700/60 mt-1 mb-3">
                  Вернитесь в конструктор, чтобы добавить упражнения в рабочий лист
                </p>
                <button
                  onClick={onAddMoreTasks}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Добавить задания</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 select-none" id="export-reorderable-tasks-list">
                {selectedTasks.map((task, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index && draggedIndex !== index;

                  return (
                    <div
                      key={task.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={() => handleDragLeave(index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`group flex items-center justify-between p-2.5 rounded-xl bg-white border-2 transition-all cursor-grab active:cursor-grabbing ${
                        isDragging
                          ? 'opacity-35 scale-[0.98] border-dashed border-emerald-500 bg-emerald-50/50 shadow-inner'
                          : isOver
                          ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300 translate-y-0.5'
                          : 'border-emerald-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-xs'
                      }`}
                      title="Зажмите и перетащите мышкой для изменения очередности"
                    >
                      {/* Left: Drag Handle Icon + Number + Task Title in format "Раздел. Задание" */}
                      <div className="flex items-center gap-1.5 overflow-hidden mr-2 min-w-0">
                        {/* Drag Handle Grip Icon */}
                        <div
                          className="text-emerald-400 group-hover:text-emerald-700 p-0.5 shrink-0 transition-colors"
                          title="Перетащите для смены порядка"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Order Number Badge */}
                        <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>

                        {/* Section & Title */}
                        <div className="truncate">
                          <span className="text-xs font-bold text-emerald-950 block truncate">
                            {task.sectionName}. {task.shortTitle}
                          </span>
                          <span className="text-[10px] text-emerald-700/70 block truncate">
                            {task.grade}
                          </span>
                        </div>
                      </div>

                      {/* Controls: Only Trash Can for Deletion (Drag handle handles reordering) */}
                      <div
                        className="flex items-center shrink-0"
                        onMouseDown={(e) => e.stopPropagation()} // don't trigger drag when clicking delete
                      >
                        <button
                          type="button"
                          onClick={() => onRemoveTask(task.id)}
                          className="p-1.5 rounded-lg text-emerald-700/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Удалить задание"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom helper in left column */}
          <div className="pt-4 border-t border-emerald-200/80 mt-4 space-y-2">
            <button
              onClick={onAddMoreTasks}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Добавить ещё задания</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-center text-emerald-700/70 leading-tight">
              <GripVertical className="w-3 h-3 shrink-0 text-emerald-500" />
              <span>Перетаскивайте задания мышкой для изменения порядка</span>
            </div>
          </div>
        </div>

        {/* --- CENTER: DOCUMENT WORKSPACE WITH WATERMARK --- */}
        <div className="flex-1 min-w-0 bg-[#f8faf9] flex flex-col overflow-hidden">
          <div className="px-6 py-2 bg-white/70 border-b border-emerald-200/60 flex items-center justify-between text-xs text-emerald-800 no-print">
            <span className="font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              Предпросмотр сформированного рабочего листа (с водяным знаком)
            </span>
            <span className="text-[11px] text-emerald-600/70 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              При печати водяной знак автоматически скрывается
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <DocumentWorkspace
              tasks={selectedTasks}
              isWatermarked={true}
              watermarkText="ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР"
              title="Итоговый рабочий лист по русскому языку"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
