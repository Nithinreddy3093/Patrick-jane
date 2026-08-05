import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Music } from 'lucide-react';
import { NavigationTab } from '../types';

interface AmbientAudioProps {
  activeTab: NavigationTab;
}

export function AmbientAudio({ activeTab }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25); // low volume background atmospheric
  const [currentSoundLabel, setCurrentSoundLabel] = useState('Rain & Clock');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isSetupRef = useRef(false);

  // Sound generator nodes
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const tickIntervalRef = useRef<any>(null);

  useEffect(() => {
    // Update ambient sound description based on active tab
    switch (activeTab) {
      case 'home':
        setCurrentSoundLabel('Reception Hall - Gentle Rain & Distant City');
        break;
      case 'course':
        setCurrentSoundLabel('Training Room - Study Desk & Ticking Clock');
        break;
      case 'practice':
        setCurrentSoundLabel('Observation Lab - Rain & Precision Clock');
        break;
      case 'detective-lab':
        setCurrentSoundLabel('Investigation HQ - Tactical Room Hum & Ticks');
        break;
      case 'daily-challenge':
        setCurrentSoundLabel('Mission Dispatch - Clock Pendulum & Static');
        break;
      case 'mentor':
        setCurrentSoundLabel('Private Office - Soft Fire Crackle & Rain');
        break;
      case 'profile':
        setCurrentSoundLabel('Personal Study - Warm Room Tone & Pendulum');
        break;
      default:
        setCurrentSoundLabel('Atmospheric Ambient');
    }

    if (isPlaying) {
      updateSoundForTab(activeTab);
    }
  }, [activeTab, isPlaying]);

  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gainNode;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const updateSoundForTab = (tab: NavigationTab) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;

    // Stop current noise source if any
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); } catch (e) {}
      noiseSourceRef.current = null;
    }
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }

    const ctx = audioCtxRef.current;
    const masterGain = gainNodeRef.current;

    // 1. Generate Pink/Brown Rain Noise with Lowpass Filter
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.05; // soften pink noise
      b6 = white * 0.115926;
    }

    const whiteNoiseSource = ctx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Filter for rain softness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = (tab === 'mentor' || tab === 'profile') ? 600 : 900;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.15; // soft rain volume

    whiteNoiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    whiteNoiseSource.start();
    noiseSourceRef.current = whiteNoiseSource;

    // 2. Pendulum Ticking Clock Effect
    const playTick = (isTock = false) => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const osc = ctx.createOscillator();
      const tickGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTock ? 600 : 850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);

      tickGain.gain.setValueAtTime(0.08, ctx.currentTime);
      tickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(tickGain);
      tickGain.connect(masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    };

    let tickState = false;
    tickIntervalRef.current = setInterval(() => {
      tickState = !tickState;
      playTick(tickState);
    }, 1000); // 1 tick per second
  };

  const togglePlay = () => {
    initAudioContext();

    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.resume();
        updateSoundForTab(activeTab);
      }
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVol;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#121218]/90 backdrop-blur-md border border-[#D4AF37]/40 rounded-full px-3 py-1.5 shadow-2xl transition-all hover:border-[#D4AF37]">
      {/* Play/Pause Mute Toggle */}
      <button
        onClick={togglePlay}
        className="w-7 h-7 rounded-full bg-[#1c1810] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shrink-0"
        title={isPlaying ? "Mute Atmospheric Ambient Sound" : "Enable Cinematic Atmospheric Sound"}
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-400" />}
      </button>

      {/* Atmospheric Audio Label & Equalizer Visualizer */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono pr-1">
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-[#D4AF37] animate-[bounce_1s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-[#D4AF37] animate-[bounce_1s_infinite_300ms] h-2/3" />
            <span className="w-0.5 bg-[#D4AF37] animate-[bounce_1s_infinite_200ms] h-4/5" />
          </div>
        ) : (
          <Radio className="w-3 h-3 text-zinc-500" />
        )}

        <span className="text-zinc-300 font-medium max-w-[180px] truncate">
          {isPlaying ? currentSoundLabel : "Cinematic Ambient Sound"}
        </span>

        {/* Volume Slider */}
        {isPlaying && (
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-12 h-1 accent-[#D4AF37] cursor-pointer ml-1"
          />
        )}
      </div>
    </div>
  );
}
