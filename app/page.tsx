'use client';

import React, { useState } from 'react';
import { CalligraphyBackground } from '@/components/CalligraphyBackground';
import { Screen1Home } from '@/components/Screen1Home';
import { Screen2Instruction } from '@/components/Screen2Instruction';
import { Screen3Constructor } from '@/components/Screen3Constructor';
import { Screen5Export } from '@/components/Screen5Export';
import { SECTIONS_DATA, TaskItem, INITIAL_SELECTED_TASK_IDS } from '@/data/russianTasks';

export default function Home() {
  // Current active screen: 1, 2, 3, or 5
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  // Selected tasks state
  const initialTasks = SECTIONS_DATA.flatMap((s) => s.tasks).filter((t) =>
    INITIAL_SELECTED_TASK_IDS.includes(t.id)
  );
  const [selectedTasks, setSelectedTasks] = useState<TaskItem[]>(initialTasks);

  // Toggle task selection
  const handleToggleTask = (task: TaskItem) => {
    setSelectedTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      if (exists) {
        return prev.filter((t) => t.id !== task.id);
      } else {
        return [...prev, task];
      }
    });
  };

  // Remove selected task by ID
  const handleRemoveSelectedTask = (taskId: string) => {
    setSelectedTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Reorder tasks
  const handleReorderTasks = (newTasks: TaskItem[]) => {
    setSelectedTasks(newTasks);
  };

  return (
    <div className="relative min-h-screen bg-white text-emerald-950 flex flex-col font-sans">
      {/* Authentic Calligraphic Russian Background Watermark ("А б в г Д Е ж...", "палочка", "эти буквы") */}
      <CalligraphyBackground />

      {/* Screen Render based on user flow */}
      <div className="relative z-10 flex-1 flex flex-col">
        {currentScreen === 1 && (
          <Screen1Home
            onStart={() => setCurrentScreen(2)}
            onOpenHelp={() => setCurrentScreen(2)}
          />
        )}

        {currentScreen === 2 && (
          <Screen2Instruction
            onBack={() => setCurrentScreen(1)}
            onProceed={() => setCurrentScreen(3)}
          />
        )}

        {currentScreen === 3 && (
          <Screen3Constructor
            sections={SECTIONS_DATA}
            selectedTasks={selectedTasks}
            onToggleTask={handleToggleTask}
            onRemoveSelectedTask={handleRemoveSelectedTask}
            onBack={() => setCurrentScreen(2)}
            onGoToExport={() => setCurrentScreen(5)}
          />
        )}

        {currentScreen === 5 && (
          <Screen5Export
            selectedTasks={selectedTasks}
            onRemoveTask={handleRemoveSelectedTask}
            onReorderTasks={handleReorderTasks}
            onBack={() => setCurrentScreen(3)}
            onAddMoreTasks={() => setCurrentScreen(3)}
          />
        )}
      </div>
    </div>
  );
}
