import React, { useRef } from 'react';
import { motion, PanInfo, BoundingBox } from 'motion/react';
import { FolderArchive, ChevronRight, CheckCircle2, Lock, FileText, Pin, Check } from 'lucide-react';

export interface DraggableFolderProps {
  key?: React.Key;
  children?: React.ReactNode;
  title?: string;
  category?: string;
  dayIndex?: number;
  objective?: string;
  isCompleted?: boolean;
  xpReward?: number;
  onClick?: () => void;
  className?: string;
  dragConstraints?: React.RefObject<Element> | { top?: number; left?: number; right?: number; bottom?: number };
  dragElastic?: number;
  snapToOrigin?: boolean;
  folderStyle?: 'manila' | 'dark' | 'leather' | 'custom';
}

export function DraggableFolder({
  children,
  title,
  category,
  dayIndex,
  objective,
  isCompleted,
  xpReward,
  onClick,
  className = '',
  dragConstraints,
  dragElastic = 0.2,
  snapToOrigin = false,
  folderStyle = 'manila'
}: DraggableFolderProps) {
  const isCustomChildren = Boolean(children);

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      dragSnapToOrigin={snapToOrigin}
      whileHover={{ scale: 1.02, rotate: -0.5 }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ 
        scale: 1.05, 
        rotate: 2, 
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 20px rgba(212, 175, 55, 0.3)"
      }}
      onClick={onClick}
      className={`cursor-grab active:cursor-grabbing select-none relative ${className}`}
    >
      {/* Visual Indicator: Draggable Grip / Pin Icon */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
        <Pin className="w-2.5 h-2.5 rotate-45 text-[#D4AF37]" />
        <span>DRAGGABLE</span>
      </div>

      {isCustomChildren ? (
        children
      ) : (
        /* Standalone Manila / Vintage Detective Folder Component */
        <div 
          className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden group shadow-xl ${
            folderStyle === 'manila'
              ? 'bg-[#1b1712] border-[#4a3b2b] hover:border-[#D4AF37]'
              : folderStyle === 'dark'
              ? 'bg-[#141210] border-[#2d2822] hover:border-[#D4AF37]'
              : 'bg-[#1e1711] border-[#524130] hover:border-[#F5D982]'
          }`}
          style={{
            backgroundImage: 'radial-gradient(circle at 100% 0%, #292119 0%, #12100e 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.15)'
          }}
        >
          {/* Folder Tab Cutout Styling at top */}
          <div className="absolute -top-0.5 left-6 w-24 h-2 rounded-b bg-[#3b2e21] border-x border-b border-[#D4AF37]/40" />

          {/* Folder Top Stamped Tag */}
          <div className="flex items-center justify-between mb-4 pt-1">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#090909]/80 text-[#D4AF37] border border-[#D4AF37]/30 font-bold tracking-wider">
              {dayIndex ? `CASE #${dayIndex}` : 'FOLDER'} {category ? `• ${category}` : ''}
            </span>

            {isCompleted ? (
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SOLVED
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                CLASSIFIED
              </span>
            )}
          </div>

          {title && (
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2 leading-snug">
              {title}
            </h3>
          )}

          {objective && (
            <p className="text-xs text-zinc-300 line-clamp-2 mb-4 font-sans leading-relaxed">
              {objective}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-[#29221b] text-xs font-mono text-zinc-400">
            {xpReward ? (
              <span>+{xpReward} XP REWARD</span>
            ) : (
              <span>CONFIDENTIAL FILE</span>
            )}
            <span className="text-[#D4AF37] flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
              <span>Inspect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
