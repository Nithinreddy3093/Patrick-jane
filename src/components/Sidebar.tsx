import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Target, 
  Search, 
  Flame, 
  Bot, 
  User, 
  Settings,
  Bell,
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  profile: UserProfile;
}

export function Sidebar({ activeTab, onSelectTab, profile }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'course', label: 'Course', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'detective-lab', label: 'Detective Lab', icon: Search },
    { id: 'daily-challenge', label: 'Daily Challenge', icon: Flame },
    { id: 'mentor', label: 'Mentor', icon: Bot },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#222] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-[#141414] flex items-center justify-center p-1">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-[7]">
              <circle cx="50" cy="50" r="42" />
              <path d="M 33 38 Q 35 48 37 40" strokeWidth="8" strokeLinecap="round" />
              <path d="M 63 38 Q 65 48 67 40" strokeWidth="8" strokeLinecap="round" />
              <path d="M 30 62 Q 50 82 70 62" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-serif font-bold text-sm tracking-wider text-white">THE JANE METHOD</span>
        </div>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Left Sidebar Overlay / Backdrop on Mobile */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
        />
      )}

      {/* Left Sidebar Fixed Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0a0c] border-r border-[#1f1f24] flex flex-col justify-between transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding */}
        <div className="p-6 border-b border-[#1f1f24]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#141414] flex items-center justify-center p-1.5 shadow-lg shadow-[#D4AF37]/10 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-[7]">
                <circle cx="50" cy="50" r="42" />
                <path d="M 33 38 Q 35 48 37 40" strokeWidth="8" strokeLinecap="round" />
                <path d="M 63 38 Q 65 48 67 40" strokeWidth="8" strokeLinecap="round" />
                <path d="M 30 62 Q 50 82 70 62" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm tracking-widest text-white uppercase leading-snug">
                THE JANE METHOD
              </h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a9a9a] font-mono">
                OBSERVE. ANALYZE. DEDUCE. MASTER.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/40 text-[#F5D982] shadow-md shadow-[#D4AF37]/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#141418]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Daily Reminder Box */}
        <div className="p-4 m-3 rounded-xl bg-[#121216] border border-[#26262e] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
          
          {/* Subtle desk lamp background image */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />

          <div className="relative z-20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase flex items-center gap-1">
                <span>✦</span> DAILY REMINDER
              </span>
            </div>
            
            <p className="text-xs text-zinc-300 font-serif italic leading-relaxed">
              "The details are not the details. They make the design."
            </p>
            
            <p className="text-[10px] text-zinc-500 font-mono text-right">
              — The Guide
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
