import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  LogOut,
  LogIn,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  profile: UserProfile;
  authUser?: any;
  onOpenAuthModal: () => void;
  onSignOut: () => Promise<void>;
}

export function Navbar({ 
  activeTab, 
  onSelectTab, 
  profile,
  authUser,
  onOpenAuthModal,
  onSignOut
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter nav items: Hide 'profile' tab if unauthenticated
  const navItems: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'course', label: 'Course', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'detective-lab', label: 'Detective Lab', icon: Search },
    { id: 'daily-challenge', label: 'Daily Challenge', icon: Calendar },
    { id: 'mentor', label: 'Mentor', icon: Bot },
    ...(authUser ? [{ id: 'profile' as NavigationTab, label: 'Profile', icon: User }] : [])
  ];

  const handleNavClick = (tab: NavigationTab) => {
    if (!authUser && tab !== 'home') {
      onOpenAuthModal();
    } else {
      onSelectTab(tab);
    }
  };

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#090909]/90 backdrop-blur-md border-b border-[#262626]/80 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo & Title */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
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
                onClick={() => handleNavClick(item.id)}
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

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* BEFORE LOGIN: Show ONLY "Sign In" and "Get Started" buttons */}
          {!authUser ? (
            <>
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Sign In</span>
              </button>

              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-[#e2be4a] rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/15"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </button>
            </>
          ) : (
            /* AFTER LOGIN: Display Notification Icon, Avatar, and Dropdown */
            <>
              {/* Notification Icon */}
              <button 
                aria-label="Notifications"
                className="w-9 h-9 rounded-full bg-[#141418] border border-[#282832] flex items-center justify-center text-zinc-300 hover:text-white transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-zinc-800/50 transition-colors border border-[#D4AF37]/40 bg-[#12100d]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                    <img 
                      src={authUser?.photoURL || profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                      alt={profile.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 mr-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-[#0e0c0a] border border-[#3d3124] rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2.5 border-b border-[#231d16] mb-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Active Detective</span>
                        </div>
                        <div className="font-serif font-bold text-sm text-white truncate mt-0.5">
                          {profile.name || 'Observer'}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          {authUser.email || 'Google Observer'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onSelectTab('profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-[#1a1510] flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
                      >
                        <User className="w-4 h-4 text-[#D4AF37]" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={async () => {
                          setDropdownOpen(false);
                          await onSignOut();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 flex items-center gap-2.5 transition-colors cursor-pointer font-medium mt-1"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#141414] text-[#F5F5F5] hover:text-[#D4AF37] border border-[#262626] cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  handleNavClick(item.id);
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

          {!authUser && (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg"
              >
                Sign In / Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </motion.header>
  );
}
