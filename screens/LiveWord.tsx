import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../components/Icon';
import { Note } from '../types';

interface TranscriptItem {
  id: number;
  time: string;
  text: string;
  type: 'text' | 'active' | 'scripture' | 'upcoming';
  ref?: string;
}

interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export const LiveWord: React.FC = () => {
  // --- State ---
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Input State
  const [inputText, setInputText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  // Header Editable State (Ceremony Context)
  const [title, setTitle] = useState("The Theology of Rest");
  const [speaker, setSpeaker] = useState("Dr. Aris Thorne");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Defaults to today

  // Left Pane Mode (Transcript vs Bible)
  const [leftPaneMode, setLeftPaneMode] = useState<'transcript' | 'bible'>('transcript');
  
  // Bible State
  const [bibleVersion, setBibleVersion] = useState('kjv'); // Default to King James
  const [bibleBook, setBibleBook] = useState('John');
  const [bibleChapter, setBibleChapter] = useState('1');
  const [bibleVerses, setBibleVerses] = useState<BibleVerse[]>([]);
  const [isLoadingBible, setIsLoadingBible] = useState(false);

  // Selection State
  const [selectedTranscriptId, setSelectedTranscriptId] = useState<number | null>(null);

  // Notes State
  const [notes, setNotes] = useState<Partial<Note>[]>([
    {
      id: 'init-1',
      timestamp: '10:40',
      content: '"Rest is not passive." This is a key distinction. Requires trust that the world won\'t fall apart if I stop.',
      title: 'Thought'
    },
    {
      id: 'init-2',
      timestamp: '10:42',
      content: 'Reference to Hebrews 4 later? The "Sabbath rest" that remains for the people of God.',
      scripture: 'Gen 2:2-3',
      tags: ['theology', 'sabbath']
    }
  ]);
  
  // Simulated Transcript Data
  const [transcript] = useState<TranscriptItem[]>([
    { id: 1, time: '10:38', text: "Good morning, everyone. It is a profound joy to be with you all today as we continue our series on the rhythms of grace. We live in a world that never sleeps, a culture that rewards exhaustion.", type: 'text' },
    { id: 2, time: '10:39', text: "But what if I told you that rest isn't just the cessation of work? What if rest is actually an act of resistance? An act of trust?", type: 'text' },
    { id: 3, time: '10:40', text: "We often confuse idleness with rest. But when we look at the creation narrative, we see something quite different. God didn't rest because He was tired; He rested because He was finished.", type: 'active' },
    { id: 4, time: 'Gen 2:2', text: '"And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done. So God blessed the seventh day and made it holy..."', type: 'scripture' },
    { id: 5, time: '...', text: "This holiness attached to time is unique. It's the first thing in scripture that is declared holy. Not a place, not a person, but a moment in time.", type: 'upcoming' }
  ]);

  const bibleBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
  const bibleChapters = Array.from({ length: 50 }, (_, i) => (i + 1).toString());
  
  // Refs
  const notesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // --- Effects ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (notesEndRef.current) {
      notesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notes]);

  // Fetch Bible Content from API
  useEffect(() => {
    const fetchBible = async () => {
      if (leftPaneMode !== 'bible') return;
      
      setIsLoadingBible(true);
      try {
        // Using bible-api.com (Public Domain versions)
        const safeBook = bibleBook.replace(/\s+/g, ''); // API expects '1John' not '1 John' usually, but bible-api handles most well.
        const response = await fetch(`https://bible-api.com/${bibleBook}+${bibleChapter}?translation=${bibleVersion}`);
        const data = await response.json();
        if (data.verses) {
          setBibleVerses(data.verses);
        } else {
          setBibleVerses([]);
        }
      } catch (error) {
        console.error("Failed to fetch bible text", error);
        setBibleVerses([]);
      } finally {
        setIsLoadingBible(false);
      }
    };

    fetchBible();
  }, [bibleBook, bibleChapter, bibleVersion, leftPaneMode]);

  // --- Handlers ---

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Add note
        const newNote: Partial<Note> = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: 'Voice Memo',
          title: 'Audio Recording',
          audioUrl: audioUrl,
          duration: formatDuration(recordingDuration)
        };
        setNotes(prev => [...prev, newNote]);
        
        // Reset
        setRecordingDuration(0);
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please ensure permissions are granted.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleTranscriptClick = (id: number) => {
    setSelectedTranscriptId(id === selectedTranscriptId ? null : id);
  };

  const handleSubmitNote = () => {
    if (!inputText.trim()) return;

    const linkedItem = selectedTranscriptId ? transcript.find(t => t.id === selectedTranscriptId) : null;

    const newNote: Partial<Note> = {
      id: Date.now().toString(),
      timestamp: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputText,
      scripture: linkedItem?.type === 'scripture' ? linkedItem.time : undefined,
      title: linkedItem ? 'Reflection' : 'Thought'
    };

    setNotes(prev => [...prev, newNote]);
    setInputText('');
    setSelectedTranscriptId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote();
    }
  };

  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-border-subtle bg-paper-main px-8 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex flex-col flex-1 max-w-2xl">
          {/* Editable Title */}
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-display text-2xl font-semibold text-ink-primary bg-transparent border-none p-0 focus:ring-0 focus:border-b focus:border-ink-muted placeholder-ink-muted/50 w-full"
            placeholder="Sermon Title"
          />
          <div className="flex items-center gap-2 text-sm text-ink-muted font-sans tracking-wide uppercase mt-1">
            {/* Editable Speaker */}
            <input 
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus:border-b focus:border-ink-muted w-32 uppercase text-sm font-sans text-ink-muted"
              placeholder="Speaker"
            />
            <span className="w-1 h-1 rounded-full bg-ink-muted"></span>
            {/* Date Picker (Updates Ceremony Context) */}
            <input 
               type="date"
               value={date}
               onChange={(e) => setDate(e.target.value)}
               className="bg-transparent border-none p-0 focus:ring-0 focus:border-b focus:border-ink-muted w-auto uppercase text-sm font-sans text-ink-muted cursor-pointer"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Save Button */}
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all duration-300 ${isSaved ? 'bg-green-100 border-green-200 text-green-800' : 'bg-ink-primary text-paper-main border-transparent hover:bg-ink-secondary'}`}
          >
            <Icon name={isSaved ? "check" : "save"} className="text-[18px]" />
            <span className="text-xs font-sans font-bold uppercase tracking-widest">{isSaved ? 'Saved' : 'Save Notes'}</span>
          </button>

          {/* Recording Toggle */}
          <button 
            onClick={handleToggleRecording}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
              isRecording 
                ? 'bg-red-50 border-red-200 shadow-sm animate-pulse' 
                : 'bg-paper-main border-border-subtle hover:bg-paper-surface'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {isRecording && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-liturgical opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRecording ? 'bg-accent-liturgical' : 'bg-ink-muted'}`}></span>
            </span>
            <span className={`text-xs font-sans font-medium uppercase tracking-widest ${isRecording ? 'text-accent-liturgical' : 'text-ink-muted'}`}>
              {isRecording ? 'Stop Rec' : 'Record'}
            </span>
            <span className="text-xs font-mono text-ink-muted pl-1 border-l border-border-subtle ml-1 w-[42px]">
              {isRecording ? formatDuration(recordingDuration) : "00:00"}
            </span>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-ink-secondary hover:text-ink-primary">
            <Icon name="more_vert" />
          </button>
        </div>
      </header>

      {/* Split Pane Container */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Pane: Scripture & Transcript */}
        <section className="w-[45%] h-full flex flex-col border-r border-border-subtle bg-paper-main relative z-10">
          
          {/* Pane Switcher / Navigation */}
          <div className="flex-none px-6 py-3 border-b border-border-subtle flex justify-between items-center bg-paper-surface/50">
            <div className="flex gap-4">
              <button 
                onClick={() => setLeftPaneMode('transcript')}
                className={`text-xs font-sans font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${leftPaneMode === 'transcript' ? 'border-accent-liturgical text-ink-primary' : 'border-transparent text-ink-muted hover:text-ink-primary'}`}
              >
                Live Transcript
              </button>
              <button 
                onClick={() => setLeftPaneMode('bible')}
                className={`text-xs font-sans font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${leftPaneMode === 'bible' ? 'border-accent-liturgical text-ink-primary' : 'border-transparent text-ink-muted hover:text-ink-primary'}`}
              >
                Bible Reader
              </button>
            </div>
            {leftPaneMode === 'transcript' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-accent-liturgical animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-liturgical"></span>
                LIVE
              </span>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 pb-32 scroll-smooth">
            
            {leftPaneMode === 'transcript' ? (
              /* Transcript View */
              <div className="max-w-xl mx-auto flex flex-col gap-8">
                {transcript.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleTranscriptClick(item.id)}
                    className={`flex gap-4 group p-3 -ml-2 rounded-sm transition-all duration-200 border border-transparent ${
                      item.id === selectedTranscriptId 
                        ? 'bg-paper-surface border-accent-liturgical/30 shadow-sm scale-[1.01]' 
                        : item.type === 'active' 
                          ? 'bg-paper-surface/50 border-l-2 border-l-accent-liturgical/20' 
                          : 'hover:bg-paper-surface/50 cursor-pointer'
                    }`}
                  >
                    <div className="w-12 pt-1 flex-shrink-0 text-right flex flex-col items-end">
                      {item.type === 'scripture' ? (
                        <>
                            <Icon name="menu_book" className={`text-sm mb-1 ${item.id === selectedTranscriptId ? 'text-accent-liturgical' : 'text-ink-muted'}`} />
                            <span className="font-mono text-[10px] text-ink-muted">{item.time}</span>
                        </>
                      ) : (
                        <span className={`font-mono text-[10px] ${item.type === 'active' || item.id === selectedTranscriptId ? 'text-ink-primary bg-paper-surface border border-border-subtle px-1 rounded' : 'text-ink-muted'}`}>
                            {item.time}
                        </span>
                      )}
                    </div>
                    
                    {item.type === 'scripture' ? (
                      <div className={`flex-1 pl-6 pr-4 py-4 rounded-r-sm italic transition-colors ${item.id === selectedTranscriptId ? 'bg-paper-main' : 'bg-paper-surface/30 border-l-4 border-accent-liturgical'}`}>
                        <p className="text-xl leading-relaxed text-ink-primary font-display">{item.text}</p>
                      </div>
                    ) : (
                      <div className="relative flex-1">
                        <p className={`text-lg leading-relaxed font-serif transition-colors ${item.id === selectedTranscriptId ? 'text-ink-primary font-medium' : 'text-ink-secondary'}`}>
                          {item.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Bible Reader View */
              <div className="max-w-xl mx-auto flex flex-col gap-6 h-full">
                {/* Bible Controls */}
                <div className="flex gap-2 sticky top-0 bg-paper-main py-2 z-10 border-b border-border-subtle mb-4">
                  <select 
                    value={bibleBook}
                    onChange={(e) => setBibleBook(e.target.value)}
                    className="bg-paper-surface border border-border-subtle rounded-sm text-sm font-sans p-2 focus:border-ink-primary focus:ring-0 max-w-[140px]"
                  >
                    {bibleBooks.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select 
                    value={bibleChapter}
                    onChange={(e) => setBibleChapter(e.target.value)}
                    className="bg-paper-surface border border-border-subtle rounded-sm text-sm font-sans p-2 focus:border-ink-primary focus:ring-0"
                  >
                    {bibleChapters.map(c => <option key={c} value={c}>Ch {c}</option>)}
                  </select>
                  <select 
                    value={bibleVersion}
                    onChange={(e) => setBibleVersion(e.target.value)}
                    className="bg-paper-surface border border-border-subtle rounded-sm text-sm font-sans p-2 focus:border-ink-primary focus:ring-0 ml-auto"
                  >
                    <option value="kjv">KJV (King James)</option>
                    <option value="web">WEB (World English)</option>
                    <option value="bbe">BBE (Basic English)</option>
                    <option value="asv">ASV (American Std)</option>
                  </select>
                </div>

                {/* Bible Text */}
                {isLoadingBible ? (
                   <div className="flex items-center justify-center h-64 text-ink-muted animate-pulse">
                     <span className="font-serif italic">Fetching Scripture...</span>
                   </div>
                ) : (
                   <div className="font-serif text-xl leading-loose text-ink-primary text-justify animate-in fade-in duration-500">
                     <h2 className="font-display text-3xl mb-6 text-center">{bibleBook} {bibleChapter}</h2>
                     {bibleVerses.length > 0 ? (
                       bibleVerses.map((verse) => (
                         <span key={verse.verse} className="relative group/verse hover:bg-paper-surface/80 rounded px-1 transition-colors">
                            <sup className="text-[10px] font-bold text-accent-liturgical mr-1 select-none opacity-50 group-hover/verse:opacity-100">{verse.verse}</sup>
                            {verse.text.replace(/\n/g, ' ')}
                            {" "}
                         </span>
                       ))
                     ) : (
                       <p className="text-center text-ink-muted italic">Text not available or failed to load.</p>
                     )}
                   </div>
                )}
                
                <div className="text-center mt-8 pt-8 border-t border-border-subtle">
                   <p className="text-[10px] text-ink-muted uppercase tracking-widest">Scripture via Bible-API.com</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Note Canvas */}
        <section 
          className="w-[55%] h-full bg-paper-main relative overflow-y-auto overflow-x-hidden p-8 z-10" 
          style={{ backgroundImage: 'radial-gradient(#D8D3C8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        >
          
          <div className="max-w-xl mx-auto flex flex-col gap-6 pb-32">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-paper-surface border border-border-subtle shadow-paper rounded-sm p-5 group hover:border-ink-muted transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white bg-ink-primary px-1.5 py-0.5 rounded-sm">{note.timestamp}</span>
                    
                    {note.scripture && (
                      <span className="font-mono text-[10px] text-accent-liturgical border border-accent-liturgical/30 bg-accent-liturgical/5 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                        <Icon name="link" className="text-[10px]" />
                        {note.scripture}
                      </span>
                    )}

                    {!note.scripture && note.title && (
                       <span className="font-sans text-[10px] uppercase tracking-wider text-ink-muted">{note.title}</span>
                    )}
                  </div>
                  <button className="text-ink-muted hover:text-accent-liturgical opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="more_horiz" className="text-sm" />
                  </button>
                </div>
                
                {/* Note Content */}
                {note.audioUrl ? (
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 bg-paper-main p-3 rounded-sm border border-border-subtle group/audio">
                         <div className="w-10 h-10 rounded-full bg-accent-liturgical text-paper-main flex items-center justify-center shadow-sm">
                            <Icon name="graphic_eq" className="text-xl" />
                         </div>
                         <div className="flex-1 flex flex-col">
                            <audio controls src={note.audioUrl} className="w-full h-8 opacity-70 hover:opacity-100 transition-opacity" />
                         </div>
                      </div>
                      <div className="flex justify-between items-center px-1">
                          <p className="font-serif text-sm text-ink-secondary italic">Voice Reflection</p>
                          <span className="font-mono text-[10px] text-ink-muted">{note.duration}</span>
                      </div>
                   </div>
                ) : (
                   <p className="font-serif text-lg text-ink-primary leading-snug">
                     {note.content}
                   </p>
                )}

                {note.tags && (
                  <div className="mt-3 pt-2 border-t border-border-subtle/50 flex gap-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-sans uppercase tracking-wide bg-paper-main text-ink-muted border border-border-subtle">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={notesEndRef} />
          </div>

          {/* Empty State Hint (Only show if few notes) */}
          {notes.length < 1 && (
             <div className="absolute top-20 right-20 w-48 text-right opacity-30 pointer-events-none select-none">
                <p className="font-display italic text-xl text-ink-muted">Tap any transcript line to anchor a note...</p>
                <Icon name="north_east" className="ml-auto mt-2 text-4xl text-ink-muted" />
             </div>
          )}

          {/* Input Area */}
          <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-3 w-full max-w-[45%] pr-8">
            {selectedTranscriptId && (
               <div className="self-start ml-2 mb-1 bg-accent-liturgical text-paper-main px-3 py-1 rounded-t-sm text-xs font-sans flex items-center gap-2 shadow-sm animate-in fade-in slide-in-from-bottom-1">
                 <Icon name="link" className="text-[14px]" />
                 Linking to {transcript.find(t => t.id === selectedTranscriptId)?.time}
                 <button onClick={() => setSelectedTranscriptId(null)} className="hover:text-white/80"><Icon name="close" className="text-[12px]" /></button>
               </div>
            )}
            <div className={`bg-paper-main border shadow-paper p-1 rounded-lg w-full flex gap-2 items-center transition-colors ${selectedTranscriptId ? 'border-accent-liturgical' : 'border-border-subtle'}`}>
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-none bg-transparent focus:ring-0 p-3 font-serif text-lg placeholder-ink-muted text-ink-primary" 
                placeholder={selectedTranscriptId ? "Add a note to this section..." : "Type a reflection..."}
                type="text"
                autoFocus
              />
              <button 
                onClick={handleSubmitNote}
                disabled={!inputText.trim()}
                className="p-2 rounded hover:bg-paper-surface text-accent-liturgical disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="send" />
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};