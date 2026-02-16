import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../components/Icon';
import { ChoirTrack } from '../types';

// Mock Data for Songs
interface Song {
  id: string;
  title: string;
  composer: string;
  hymnNumber: string;
  lyrics: string[]; // simplified for display
}

const SONGS: Song[] = [
  {
    id: '1',
    title: 'Holy, Holy, Holy!',
    composer: 'Reginald Heber',
    hymnNumber: '362',
    lyrics: [
      "Holy, holy, holy! All the saints adore Thee,",
      "Casting down their golden crowns around the glassy sea;",
      "Cherubim and seraphim falling down before Thee,",
      "Which wert, and art, and evermore shalt be."
    ]
  },
  {
    id: '2',
    title: 'Be Thou My Vision',
    composer: 'Ancient Irish Hymn',
    hymnNumber: '488',
    lyrics: [
      "Be Thou my Vision, O Lord of my heart;",
      "Naught be all else to me, save that Thou art.",
      "Thou my best Thought, by day or by night,",
      "Waking or sleeping, Thy presence my light."
    ]
  },
  {
    id: '3',
    title: 'It Is Well With My Soul',
    composer: 'Horatio Spafford',
    hymnNumber: '705',
    lyrics: [
      "When peace, like a river, attendeth my way,",
      "When sorrows like sea billows roll;",
      "Whatever my lot, Thou has taught me to say,",
      "It is well, it is well, with my soul."
    ]
  },
  {
    id: '4',
    title: 'Great Is Thy Faithfulness',
    composer: 'Thomas Chisholm',
    hymnNumber: '129',
    lyrics: [
      "Great is Thy faithfulness, O God my Father,",
      "There is no shadow of turning with Thee;",
      "Thou changest not, Thy compassions, they fail not",
      "As Thou hast been Thou forever wilt be."
    ]
  }
];

export const ChoirLoft: React.FC = () => {
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [volume, setVolume] = useState(80); // 0 to 100
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  
  // Content State
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSheetMusicMode, setIsSheetMusicMode] = useState(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);

  // Track State
  const [tracks, setTracks] = useState<ChoirTrack[]>([
    { id: '1', name: 'Soprano', isMuted: false, isSolo: false, volume: 80 },
    { id: '2', name: 'Alto', isMuted: false, isSolo: false, volume: 80 },
    { id: '3', name: 'Tenor', isMuted: false, isSolo: true, volume: 100 }, // Default solo for demo
    { id: '4', name: 'Bass', isMuted: false, isSolo: false, volume: 80 },
  ]);

  const currentSong = SONGS[currentSongIndex];

  // Simulation Interval
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (repeatMode === 'one') return 0;
            if (repeatMode === 'all') {
               handleNext();
               return 0;
            }
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.2; // increment
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, repeatMode]);

  // Handlers
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentSongIndex(prev => (prev + 1) % SONGS.length);
    setProgress(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrev = () => {
    if (progress > 5) {
      setProgress(0);
    } else {
      setCurrentSongIndex(prev => (prev - 1 + SONGS.length) % SONGS.length);
      setProgress(0);
    }
    if (!isPlaying) setIsPlaying(true);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'one' | 'all')[] = ['off', 'all', 'one'];
    const nextIndex = (modes.indexOf(repeatMode) + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setProgress(pct);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setVolume(pct);
  };

  // Track Handlers
  const toggleTrackMute = (id: string) => {
    setTracks(prev => prev.map(t => t.id === id ? { ...t, isMuted: !t.isMuted } : t));
  };

  const toggleTrackSolo = (id: string) => {
    // Logic: If clicking an active solo, turn it off. If clicking inactive, turn it on and turn others off (exclusive solo).
    setTracks(prev => prev.map(t => ({
      ...t,
      isSolo: t.id === id ? !t.isSolo : false
    })));
  };

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setProgress(0);
    setIsSongModalOpen(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden relative">
      
      {/* --- Song Selection Modal --- */}
      {isSongModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-10 animate-in fade-in duration-200">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm"
             onClick={() => setIsSongModalOpen(false)}
           ></div>
           
           {/* Modal Content */}
           <div className="bg-paper-main w-full max-w-2xl max-h-[80%] rounded-sm shadow-2xl border border-border-subtle flex flex-col relative z-10 overflow-hidden">
             <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-paper-surface">
               <h3 className="font-display text-2xl text-ink-primary">Select Hymn</h3>
               <button onClick={() => setIsSongModalOpen(false)} className="text-ink-muted hover:text-ink-primary">
                 <Icon name="close" />
               </button>
             </div>
             <div className="overflow-y-auto p-4 space-y-2">
               {SONGS.map((song, idx) => (
                 <div 
                   key={song.id} 
                   onClick={() => handleSelectSong(idx)}
                   className={`p-4 rounded-sm cursor-pointer flex justify-between items-center group transition-colors ${
                     idx === currentSongIndex ? 'bg-ink-primary text-paper-main' : 'hover:bg-paper-surface border border-transparent hover:border-border-subtle'
                   }`}
                 >
                   <div>
                     <div className={`font-display text-xl ${idx === currentSongIndex ? 'text-paper-main' : 'text-ink-primary'}`}>{song.title}</div>
                     <div className={`font-sans text-xs uppercase tracking-widest ${idx === currentSongIndex ? 'text-paper-surface/70' : 'text-ink-muted'}`}>
                       #{song.hymnNumber} • {song.composer}
                     </div>
                   </div>
                   {idx === currentSongIndex && <Icon name="graphic_eq" className="text-accent-liturgical" />}
                 </div>
               ))}
             </div>
           </div>
        </div>
      )}

      {/* --- Header --- */}
      <header className="flex-none flex items-center justify-between border-b border-border-subtle bg-paper-main px-8 py-4 z-10">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">Choir Loft</h2>
          <div className="h-6 w-px bg-border-subtle"></div>
          
          {/* Song Selector Trigger */}
          <button 
            onClick={() => setIsSongModalOpen(true)}
            className="flex flex-col items-start group hover:bg-paper-surface px-3 py-1 -ml-3 rounded-sm transition-colors text-left"
          >
             <div className="flex items-center gap-2">
               <span className="font-display text-lg leading-none group-hover:text-accent-liturgical transition-colors">{currentSong.title}</span>
               <Icon name="expand_more" className="text-sm text-ink-muted" />
             </div>
             <span className="font-serif italic text-ink-muted text-sm">{currentSong.hymnNumber} • {currentSong.composer}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsSheetMusicMode(!isSheetMusicMode)}
             className={`group flex h-10 items-center justify-center gap-2 rounded-sm border px-4 transition-all ${
               isSheetMusicMode 
                 ? 'bg-ink-primary text-paper-main border-ink-primary shadow-inner' 
                 : 'bg-paper-surface border-border-subtle text-ink-primary hover:border-ink-primary'
             }`}
           >
             <Icon name={isSheetMusicMode ? "lyrics" : "library_music"} className="text-[20px]" />
             <span className="font-sans text-xs font-bold uppercase tracking-wider">
               {isSheetMusicMode ? 'Lyrics View' : 'Sheet Music'}
             </span>
           </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative">
        
        {/* Center Display (Lyrics or Sheet Music) */}
        <section className="flex-grow relative flex flex-col items-center justify-center bg-paper-main py-12 px-4 overflow-y-auto no-scrollbar">
           
           {isSheetMusicMode ? (
             <div className="w-full max-w-4xl h-full bg-white shadow-lg border border-border-subtle p-8 overflow-y-auto flex flex-col items-center animate-in fade-in duration-300">
                {/* Fake Sheet Music Visual */}
                <div className="space-y-12 w-full opacity-80">
                  <div className="w-full border-b border-black pb-2 mb-8 flex justify-between items-end">
                    <h1 className="font-display text-3xl">{currentSong.title}</h1>
                    <span className="font-serif italic">{currentSong.composer}</span>
                  </div>
                  {/* Staves */}
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-full space-y-2 relative">
                       {/* 5 lines */}
                       <div className="border-t border-black h-2"></div>
                       <div className="border-t border-black h-2"></div>
                       <div className="border-t border-black h-2"></div>
                       <div className="border-t border-black h-2"></div>
                       <div className="border-t border-black"></div>
                       {/* Notes (random) */}
                       <div className="absolute top-2 left-10 w-3 h-2 bg-black rounded-full"></div>
                       <div className="absolute top-2 left-10 w-0.5 h-8 bg-black -mt-6"></div>
                       
                       <div className="absolute top-4 left-24 w-3 h-2 bg-black rounded-full"></div>
                       <div className="absolute top-4 left-24 w-0.5 h-8 bg-black -mt-6"></div>

                       <div className="absolute top-0 left-40 w-3 h-2 bg-black rounded-full"></div>
                       <div className="absolute top-0 left-40 w-0.5 h-8 bg-black -mt-6"></div>
                       
                       <p className="font-serif text-lg text-center mt-4">{currentSong.lyrics[i-1]}</p>
                    </div>
                  ))}
                </div>
             </div>
           ) : (
             <div className="w-full max-w-3xl text-center space-y-8 select-none animate-in fade-in slide-in-from-bottom-4 duration-500">
               {currentSong.lyrics.map((line, idx) => {
                 // Highlight logic based on progress purely for visual demo
                 // We'll just highlight the middle lines as "active" roughly
                 const isActive = idx === 1 || idx === 2; 
                 return (
                   <p 
                    key={idx} 
                    className={`font-serif transition-all duration-500 ${
                      isActive 
                        ? 'text-4xl md:text-5xl text-ink-primary font-medium leading-tight scale-100 blur-none opacity-100' 
                        : 'text-2xl text-ink-muted/40 blur-[0.5px] scale-95'
                    }`}
                   >
                     {line}
                   </p>
                 );
               })}
             </div>
           )}
           
           {/* Play overlay for Lyrics Mode */}
           {!isSheetMusicMode && isPlaying && (
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 text-accent-liturgical opacity-10 animate-pulse pointer-events-none">
                 <Icon name="play_arrow" className="text-9xl" />
              </div>
           )}
        </section>

        {/* --- Audio Deck --- */}
        <section className="flex-none bg-paper-surface border-t border-border-subtle shadow-[0_-1px_0_rgba(216,211,200,0.5)] z-20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
            
            {/* Tracks */}
            <div className="grid grid-cols-1 gap-1">
               {tracks.map(track => (
                 <div key={track.id} className={`group flex items-center gap-4 py-2 hover:bg-paper-main/50 rounded-sm px-2 transition-colors ${track.isSolo ? 'bg-paper-main border border-border-subtle shadow-sm relative' : ''}`}>
                   {track.isSolo && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ink-primary rounded-l-sm"></div>}
                   <div className={`w-24 font-sans text-xs font-bold uppercase tracking-wider ${track.isSolo ? 'text-ink-primary pl-1' : 'text-ink-muted group-hover:text-ink-primary'}`}>{track.name}</div>
                   <div className="flex gap-1">
                      <button 
                        onClick={() => toggleTrackMute(track.id)}
                        className={`h-6 w-6 flex items-center justify-center border border-border-subtle rounded-sm text-[10px] font-sans font-bold transition-colors ${track.isMuted ? 'bg-ink-muted text-white' : 'text-ink-muted hover:border-ink-primary hover:text-ink-primary'}`}
                      >M</button>
                      <button 
                        onClick={() => toggleTrackSolo(track.id)}
                        className={`h-6 w-6 flex items-center justify-center border transition-colors rounded-sm text-[10px] font-sans font-bold ${track.isSolo ? 'border-accent-liturgical bg-accent-liturgical text-paper-main' : 'border-border-subtle text-ink-muted hover:border-ink-primary hover:text-ink-primary'}`}
                      >S</button>
                   </div>
                   <div className={`flex-grow h-8 flex items-center ${track.isSolo ? 'relative h-12' : 'opacity-30'}`}>
                      {/* Mock Waveform SVG */}
                      <svg className="w-full h-full text-ink-primary fill-current" preserveAspectRatio="none" viewBox="0 0 400 32">
                        <path d="M0,16 Q10,6 20,16 T40,16 T60,16 T80,16 T100,10 T120,22 T140,16 T160,8 T180,24 T200,16 T220,12 T240,20 T260,16 T280,16 T300,6 T320,26 T340,16 T360,16 T380,16 T400,16 V17 H0 Z" />
                      </svg>
                      {track.isSolo && (
                        <div className="absolute top-0 h-full w-px bg-accent-liturgical z-10" style={{ left: `${progress}%` }}></div>
                      )}
                   </div>
                 </div>
               ))}
            </div>

            {/* Transport Controls */}
            <div className="flex items-center justify-between border-t border-border-subtle pt-6 mt-2 select-none">
               {/* Time */}
               <div className="font-mono text-sm text-ink-primary w-24">
                 {Math.floor((progress/100) * 195 / 60)}:{Math.floor((progress/100) * 195 % 60).toString().padStart(2, '0')} 
                 <span className="text-ink-muted"> / 3:15</span>
               </div>
               
               {/* Main Buttons */}
               <div className="flex items-center gap-8">
                  <button onClick={handlePrev} className="text-ink-muted hover:text-ink-primary transition-colors active:scale-95"><Icon name="skip_previous" className="text-3xl" /></button>
                  <button onClick={handlePlayPause} className="group flex items-center justify-center h-16 w-16 rounded-full border border-ink-primary bg-transparent hover:bg-ink-primary transition-all duration-200 active:scale-95 shadow-sm">
                    <Icon name={isPlaying ? "pause" : "play_arrow"} className="text-4xl text-ink-primary group-hover:text-paper-main pl-1" />
                  </button>
                  <button onClick={handleNext} className="text-ink-muted hover:text-ink-primary transition-colors active:scale-95"><Icon name="skip_next" className="text-3xl" /></button>
               </div>

               {/* Right Side Controls */}
               <div className="flex items-center gap-6 w-56 justify-end">
                  {/* Repeat Button */}
                  <button 
                    onClick={toggleRepeat} 
                    className={`transition-colors relative ${
                      repeatMode === 'off' ? 'text-ink-muted hover:text-ink-primary' : 'text-accent-liturgical'
                    }`}
                    title={`Repeat: ${repeatMode}`}
                  >
                    <Icon name={repeatMode === 'one' ? "repeat_one" : "repeat"} />
                    {repeatMode === 'all' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-liturgical"></div>}
                  </button>
                  
                  {/* Volume Slider */}
                  <div className="flex items-center gap-3 flex-grow group">
                     <button onClick={() => setVolume(v => v === 0 ? 80 : 0)}>
                       <Icon name={volume === 0 ? "volume_off" : "volume_up"} className="text-ink-muted text-sm" />
                     </button>
                     <div 
                       className="relative h-4 w-full flex items-center cursor-pointer"
                       onClick={handleVolumeChange}
                     >
                        {/* Track */}
                        <div className="h-px bg-border-subtle w-full"></div>
                        {/* Fill */}
                        <div className="absolute left-0 h-px bg-ink-primary transition-all duration-75" style={{ width: `${volume}%` }}></div>
                        {/* Thumb */}
                        <div 
                          className="absolute h-3 w-3 bg-ink-primary rounded-[1px] shadow-sm transform transition-transform group-hover:scale-125" 
                          style={{ left: `${volume}%`, transform: 'translate(-50%)' }}
                        ></div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Global Progress Bar (The "Tracker") */}
            <div 
              className="absolute top-0 left-0 w-full h-1 bg-transparent cursor-pointer group"
              onClick={handleSeek}
            >
              <div className="h-full bg-accent-liturgical/20 w-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Actual Progress Line displayed on the waveforms usually, but let's add a top line for global tracking clarity */}
              <div className="absolute top-0 left-0 h-1 bg-accent-liturgical transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};