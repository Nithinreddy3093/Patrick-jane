import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Target, 
  Search, 
  Calendar, 
  Bot, 
  User, 
  Menu, 
  X,
  Bell,
  ChevronDown
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  profile: UserProfile;
}

export function Navbar({ activeTab, onSelectTab, profile }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'course', label: 'Course', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'detective-lab', label: 'Detective Lab', icon: Search },
    { id: 'daily-challenge', label: 'Daily Challenge', icon: Calendar },
    { id: 'mentor', label: 'Mentor', icon: Bot },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#090909]/90 backdrop-blur-md border-b border-[#262626]/80 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Minimal Gold Smiley Logo & Brand Title */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {/* Minimal Gold Smiley Icon */}
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#141414] flex items-center justify-center p-1.5 shadow-md shadow-[#D4AF37]/10 group-hover:border-[#F5D982] transition-all">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-[7]"
            >
              <circle cx="50" cy="50" r="42" />
              <path d="M 33 38 Q 35 48 37 40" strokeWidth="8" strokeLinecap="round" />
              <path d="M 63 38 Q 65 48 67 40" strokeWidth="8" strokeLinecap="round" />
              <path d="M 30 62 Q 50 82 70 62" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors uppercase">
              The Jane Method
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#B8B8B8] font-mono hidden sm:block">
              Observe. Analyze. Deduce. Master.
            </p>
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative py-1 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#B8B8B8] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full shadow-sm shadow-[#D4AF37]/50" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Start Learning Button, Bell & Profile Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onSelectTab('course')}
            className="hidden md:flex items-center gap-2 border border-[#D4AF37] text-[#F5F5F5] hover:bg-[#D4AF37]/15 rounded-lg px-4 py-2 text-xs font-semibold tracking-wider transition-all cursor-pointer hover:border-[#F5D982]"
          >
            <span>Start Learning</span>
          </button>

          {/* Bell Icon with badge */}
          <button className="w-9 h-9 rounded-full bg-[#141418] border border-[#282832] flex items-center justify-center text-zinc-300 hover:text-white transition-colors relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </button>

          {/* User Profile Chip */}
          <div 
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/50 bg-zinc-800 shrink-0">
              <img 
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#141414] text-[#F5F5F5] hover:text-[#D4AF37] border border-[#262626] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090909]/95 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-6 py-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold'
                    : 'text-[#B8B8B8] hover:text-white bg-[#141414]/50'
                }`}
              >
                <Icon className="w-4 h-4 text-[#D4AF37]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onSelectTab('course');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-4 py-3 rounded-lg bg-[#D4AF37] text-[#090909] font-bold text-xs uppercase tracking-wider cursor-pointer text-center"
          >
            Start Learning
          </button>
        </div>
      )}
    </motion.header>
  );
}
