'use client';

import React, { useState, useRef, useSyncExternalStore } from 'react';
import { Camera } from 'lucide-react';

function subscribePhoto(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('elvira-photo-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('elvira-photo-change', callback);
  };
}

function getPhotoSnapshot(): string {
  try {
    return localStorage.getItem('elvira_author_photo') || '/elvira.png';
  } catch {
    return '/elvira.png';
  }
}

function getServerPhotoSnapshot(): string {
  return '/elvira.png';
}

export function ElviraHero() {
  const storedPhoto = useSyncExternalStore(
    subscribePhoto,
    getPhotoSnapshot,
    getServerPhotoSnapshot
  );
  const [overridePhoto, setOverridePhoto] = useState<string | null>(null);
  const photoSrc = overridePhoto || storedPhoto;

  const [hasError, setHasError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          try {
            localStorage.setItem('elvira_author_photo', result);
            window.dispatchEvent(new Event('elvira-photo-change'));
          } catch {
            // Storage quota warning ignore
          }
          setOverridePhoto(result);
          setHasError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          try {
            localStorage.setItem('elvira_author_photo', result);
            window.dispatchEvent(new Event('elvira-photo-change'));
          } catch {}
          setOverridePhoto(result);
          setHasError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[640px] mx-auto select-none group flex flex-col items-center justify-center transition-all"
      id="elvira-creator-hero"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Hidden file input for changing or uploading the author photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Direct Full-Size Photo Without Container or Frame */}
      <div className="relative w-full flex items-center justify-center max-h-[260px] xs:max-h-[310px] sm:max-h-[440px] lg:max-h-none">
        {!hasError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photoSrc}
            alt="Автор методики Эльвира (by @elli_talks)"
            className="w-full max-h-[260px] xs:max-h-[310px] sm:max-h-[440px] lg:max-h-none h-auto object-contain block select-none drop-shadow-xl rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
            suppressHydrationWarning
            onError={() => {
              // If /elvira.png is not found on local disk, show accurate styled visual representation
              setHasError(true);
            }}
          />
        ) : (
          /* High-fidelity visual representation matching the exact uploaded elvira.png:
             - Enlarged responsive photo
             - Elvira in beige bucket hat, rounded wireframe glasses, friendly smile
             - Open pink linen button-down shirt over white ribbed top
             - Cloud thought bubble with green 'by @elli_talks' on the top right
          */
          <div className="relative w-full aspect-[4/3.8] max-h-[260px] xs:max-h-[310px] sm:max-h-[440px] lg:max-h-none flex flex-col items-center justify-end overflow-visible">
            {/* Embedded Thought Bubble on top-right (matching elvira.png) */}
            <div className="absolute top-1 sm:top-2 right-2 sm:right-8 z-20 flex flex-col items-end drop-shadow-md">
              <div className="relative bg-white rounded-2xl sm:rounded-3xl px-3 sm:px-4 py-1 sm:py-2 border border-neutral-200/80 shadow-md">
                <span className="font-extrabold text-xs sm:text-sm lg:text-base text-[#00b020] tracking-tight whitespace-nowrap">
                  by @elli_talks
                </span>
              </div>
              <div className="flex flex-col items-end mr-3 sm:mr-4 mt-0.5 sm:mt-1 gap-0.5 sm:gap-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-xs" />
                <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-white shadow-xs mr-0.5 sm:mr-1" />
              </div>
            </div>

            {/* SVG Portrait matching elvira.png details */}
            <svg
              viewBox="0 0 380 390"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-xl"
            >
              {/* Soft organic dark studio aura */}
              <circle cx="190" cy="230" r="160" fill="rgba(24, 24, 24, 0.92)" />

              {/* Long brown hair back */}
              <path
                d="M120,180 C95,225 85,290 90,380 C115,390 138,360 145,300 C150,255 150,200 150,180 Z"
                fill="#3d2a1d"
              />
              <path
                d="M260,180 C285,225 295,290 290,380 C265,390 242,360 235,300 C230,255 230,200 230,180 Z"
                fill="#3d2a1d"
              />

              {/* Shoulders & Clothing */}
              {/* White ribbed inner top */}
              <path
                d="M155,270 L225,270 L232,390 L148,390 Z"
                fill="#f7f7f7"
              />
              <line x1="168" y1="280" x2="168" y2="390" stroke="#e5e5e5" strokeWidth="2.5" />
              <line x1="180" y1="275" x2="180" y2="390" stroke="#e5e5e5" strokeWidth="2.5" />
              <line x1="190" y1="275" x2="190" y2="390" stroke="#e5e5e5" strokeWidth="2.5" />
              <line x1="200" y1="275" x2="200" y2="390" stroke="#e5e5e5" strokeWidth="2.5" />
              <line x1="212" y1="280" x2="212" y2="390" stroke="#e5e5e5" strokeWidth="2.5" />

              {/* Neck */}
              <path
                d="M165,215 C165,248 168,268 190,268 C212,268 215,248 215,215 Z"
                fill="#f4cfb6"
              />

              {/* Pink Linen Button-Down Shirt Left flap */}
              <path
                d="M162,265 L100,282 L48,390 L155,390 L168,295 L155,268 Z"
                fill="#f3a9b7"
              />
              {/* Pink Shirt Right flap */}
              <path
                d="M218,265 L280,282 L332,390 L225,390 L212,295 L225,268 Z"
                fill="#f3a9b7"
              />
              {/* Collars */}
              <polygon points="162,265 130,288 160,295" fill="#e995a5" />
              <polygon points="218,265 250,288 220,295" fill="#e995a5" />

              {/* Hair strands framing face */}
              <path
                d="M128,180 C118,230 116,280 128,325 C135,315 142,245 142,190 Z"
                fill="#4b3524"
              />
              <path
                d="M252,180 C262,230 264,280 252,325 C245,315 238,245 238,190 Z"
                fill="#4b3524"
              />

              {/* Face */}
              <path
                d="M138,155 C138,122 242,122 242,155 C242,205 228,238 190,238 C152,238 138,205 138,155 Z"
                fill="#fae2ce"
              />

              {/* Gentle warm smile */}
              <path
                d="M172,205 Q190,218 208,205"
                stroke="#a63e52"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute nose */}
              <path d="M188,184 Q190,192 194,191" stroke="#d49e7b" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* Eyebrows */}
              <path d="M156,158 Q170,154 178,158" stroke="#4a3325" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M202,158 Q210,154 224,158" stroke="#4a3325" strokeWidth="2.5" strokeLinecap="round" />

              {/* Eyes */}
              <ellipse cx="168" cy="170" rx="4" ry="4.5" fill="#322115" />
              <circle cx="170" cy="168" r="1.5" fill="#ffffff" />
              <ellipse cx="212" cy="170" rx="4" ry="4.5" fill="#322115" />
              <circle cx="214" cy="168" r="1.5" fill="#ffffff" />

              {/* Round Wireframe Glasses (signature look) */}
              <circle cx="168" cy="170" r="18" fill="rgba(255,255,255,0.15)" stroke="#2b2b2b" strokeWidth="2.2" />
              <circle cx="212" cy="170" r="18" fill="rgba(255,255,255,0.15)" stroke="#2b2b2b" strokeWidth="2.2" />
              <path d="M186,168 Q190,166 194,168" stroke="#2b2b2b" strokeWidth="2.2" fill="none" />
              <line x1="150" y1="168" x2="140" y2="166" stroke="#2b2b2b" strokeWidth="2" />
              <line x1="230" y1="168" x2="240" y2="166" stroke="#2b2b2b" strokeWidth="2" />

              {/* Tan / Khaki Bucket Hat (Panama) */}
              <path
                d="M115,135 C108,130 138,112 190,112 C242,112 272,130 265,135 C253,144 127,144 115,135 Z"
                fill="#d8cca8"
                stroke="#2a251e"
                strokeWidth="2.2"
              />
              <path
                d="M140,126 C138,92 145,66 190,66 C235,66 242,92 240,126 Z"
                fill="#cebe95"
                stroke="#2a251e"
                strokeWidth="2.2"
              />
              {/* Hat band stitching */}
              <path d="M142,106 Q190,109 238,106" stroke="#9e8d66" strokeWidth="1.8" strokeDasharray="4 2" fill="none" />
            </svg>
          </div>
        )}

        {/* Floating Subtle Change Photo Button (No Container) */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white text-xs font-medium backdrop-blur-xs shadow-lg cursor-pointer no-print"
          title="Нажмите, чтобы загрузить elvira.png или перетащите файл"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-300" />
          <span>Сменить фото</span>
        </button>
      </div>

      {/* Green Accent Stripe directly where the photo ends with clean green shadow (no glow) */}
      <div className="relative w-full flex flex-col items-center mt-0 sm:mt-0.5 pointer-events-none select-none">
        <div
          className="relative w-4/5 sm:w-5/6 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 shadow-[0_8px_18px_rgba(5,150,105,0.45),0_3px_6px_rgba(4,120,87,0.25)] border border-emerald-300/70"
        />
      </div>
    </div>
  );
}
