import { useRef } from 'react';
import { Award, Printer, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { getRankFromXp } from '../data/ranksData';

interface CertificateViewProps {
  profile: UserProfile;
  onBack: () => void;
}

export function CertificateView({ profile, onBack }: CertificateViewProps) {
  const currentRank = getRankFromXp(profile.xp);
  const certRef = useRef<HTMLDivElement | null>(null);

  const issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const certId = `JANE-CERT-${profile.name.replace(/\s+/g, '').toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-[#262626] pb-4">
        <button
          onClick={onBack}
          className="px-3.5 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Official Certificate Card */}
      <div
        ref={certRef}
        className="relative bg-[#090909] border-4 border-[#D4AF37] p-8 sm:p-12 md:p-16 rounded-3xl text-center space-y-8 shadow-2xl overflow-hidden"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Certificate Watermark Icon */}
        <div className="w-20 h-20 rounded-full bg-[#141414] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-xl shadow-[#D4AF37]/20">
          <Award className="w-10 h-10 text-[#D4AF37]" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            ACADEMIC CERTIFICATE OF MASTERY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            The Jane Method
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Academy of Observation & Logical Deduction
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono text-zinc-400 uppercase">This Certifies That</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text">
            {profile.name}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed font-serif italic">
            has successfully demonstrated high-level proficiency in visual observation, non-verbal micro-expression analysis, memory palace architecture, and first-principles critical deduction, achieving the rank status of:
          </p>

          <div className="inline-block px-6 py-2.5 rounded-2xl bg-[#141414] border border-[#D4AF37] font-mono text-lg text-[#D4AF37] font-bold shadow-lg">
            {currentRank.badgeSymbol} {currentRank.title}
          </div>
        </div>

        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="text-center sm:text-left">
            <span className="block text-zinc-500">Issue Date:</span>
            <span className="text-white font-semibold">{issueDate}</span>
          </div>

          <div className="text-center">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
            <span className="text-[10px] text-zinc-500 block">AUTHENTICATED DIGITAL DIPLOMA</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="block text-zinc-500">Verification ID:</span>
            <span className="text-[#D4AF37] font-semibold">{certId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
