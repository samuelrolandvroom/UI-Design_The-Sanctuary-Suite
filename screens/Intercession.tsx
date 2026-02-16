import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { PrayerRequest } from '../types';

export const Intercession: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Request State
  const [newRequestName, setNewRequestName] = useState('');
  const [newRequestCategory, setNewRequestCategory] = useState<PrayerRequest['category']>('General');
  const [newRequestContent, setNewRequestContent] = useState('');

  const [requests, setRequests] = useState<PrayerRequest[]>([
    {
      id: '1',
      author: 'Sarah Jenkins',
      category: 'Sickness',
      content: 'Please pray for my mother who is undergoing surgery this Thursday. We are hoping for a quick recovery and peace of mind for the family.',
      timestamp: '2 hours ago',
      prayCount: 12,
      isPrayed: false
    },
    {
      id: '2',
      author: 'Anonymous',
      category: 'Grief',
      content: 'Navigating the first anniversary of losing my brother. The silence is loud today.',
      timestamp: 'Yesterday',
      prayCount: 24,
      isPrayed: true
    },
    {
      id: '3',
      author: 'The Pastoral Team',
      category: 'World',
      content: 'For the ongoing relief efforts in the flood-affected regions. May resources reach those in desperate need.',
      timestamp: 'Dec 12, 2025',
      prayCount: 45,
      isPrayed: false
    },
    {
      id: '4',
      author: 'Mark & Elise',
      category: 'Celebration',
      content: 'Praising God for the safe arrival of baby Jude! 7lbs 6oz. Both mom and baby are resting well.',
      timestamp: 'Dec 11, 2025',
      prayCount: 88,
      isPrayed: true
    },
    {
      id: '5',
      author: 'Youth Ministry',
      category: 'General',
      content: 'Prayers for the upcoming retreat. That hearts would be open and connections would be deepened.',
      timestamp: 'Dec 10, 2025',
      prayCount: 5,
      isPrayed: false
    }
  ]);

  const categories = ['All', 'Sickness', 'Grief', 'Celebration', 'World', 'General'];
  const requestCategories: PrayerRequest['category'][] = ['Sickness', 'Grief', 'Celebration', 'World', 'General'];

  const handlePray = (id: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          isPrayed: !req.isPrayed,
          prayCount: req.isPrayed ? req.prayCount - 1 : req.prayCount + 1
        };
      }
      return req;
    }));
  };

  const handleSubmitRequest = () => {
    if (!newRequestName || !newRequestContent) return;

    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      author: newRequestName,
      category: newRequestCategory,
      content: newRequestContent,
      timestamp: 'Just now',
      prayCount: 0,
      isPrayed: false
    };

    setRequests(prev => [newRequest, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setNewRequestName('');
    setNewRequestContent('');
    setNewRequestCategory('General');
  };

  const filteredRequests = activeCategory === 'All' 
    ? requests 
    : requests.filter(r => r.category === activeCategory);

  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden relative">
      
      {/* Header */}
      <header className="flex-none px-10 py-8 border-b border-border-subtle bg-paper-main z-10 flex justify-between items-end">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <Icon name="volunteer_activism" className="text-accent-liturgical" />
             <span className="font-sans text-xs uppercase tracking-widest text-accent-liturgical">Community Prayer</span>
           </div>
           <h1 className="text-4xl font-display font-medium text-ink-primary">The Intercession</h1>
           <p className="font-serif italic text-ink-secondary mt-1">"Bear one another's burdens, and so fulfill the law of Christ."</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-ink-primary text-paper-main hover:bg-ink-secondary transition-colors rounded-sm shadow-sm"
        >
           <Icon name="add" className="text-[18px]" />
           <span className="font-sans text-xs font-bold uppercase tracking-widest">Share Request</span>
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="flex-none px-10 border-b border-border-subtle bg-paper-surface/50">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-4 font-sans text-sm tracking-wide uppercase transition-colors relative ${
                activeCategory === cat 
                  ? 'text-ink-primary font-semibold' 
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-liturgical"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Card Wall */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-10 flex items-start gap-8 snap-x snap-mandatory">
        
        {/* Add Card Prompt */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-[320px] flex-shrink-0 h-[420px] border border-dashed border-ink-muted/40 rounded-sm flex flex-col items-center justify-center gap-4 text-center p-8 bg-paper-main/50 hover:bg-paper-surface/80 hover:border-ink-muted transition-all cursor-pointer group snap-center"
        >
           <div className="w-16 h-16 rounded-full bg-paper-darker flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <Icon name="edit_note" className="text-3xl text-ink-muted group-hover:text-ink-primary" />
           </div>
           <div>
             <h3 className="font-display text-xl text-ink-primary mb-1">Share a Burden</h3>
             <p className="text-sm text-ink-muted font-serif">Or a joy. The community is here to stand with you.</p>
           </div>
        </div>

        {/* Request Cards */}
        {filteredRequests.map((req) => (
          <div 
            key={req.id}
            className={`w-[400px] flex-shrink-0 flex flex-col h-[420px] border snap-center transition-all duration-500 relative overflow-hidden group ${
              req.isPrayed 
                ? 'bg-[#FDFBF7] border-accent-liturgical/30 shadow-[0_4px_20px_rgba(140,59,59,0.05)]' 
                : 'bg-paper-surface border-border-subtle shadow-paper hover:shadow-lg'
            }`}
          >
             {/* Watercolor/Ink Wash Effect Overlay */}
             <div 
                className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#EBE0D0] transition-opacity duration-700 pointer-events-none ${
                  req.isPrayed ? 'opacity-100' : 'opacity-0'
                }`}
             ></div>

             {/* Card Header */}
             <div className="p-6 pb-4 flex justify-between items-start relative z-10">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-paper-darker border border-border-subtle flex items-center justify-center text-xs font-bold font-sans text-ink-muted uppercase">
                    {req.author.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-ink-primary leading-none">{req.author}</p>
                   <p className="text-[10px] font-mono text-ink-muted mt-1 uppercase">{req.timestamp}</p>
                 </div>
               </div>
               <span className={`text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 border rounded-sm ${
                  req.category === 'Sickness' ? 'border-red-200 text-red-800 bg-red-50' :
                  req.category === 'Celebration' ? 'border-yellow-200 text-yellow-800 bg-yellow-50' :
                  req.category === 'Grief' ? 'border-slate-200 text-slate-800 bg-slate-50' :
                  'border-border-subtle text-ink-muted bg-paper-main'
               }`}>
                 {req.category}
               </span>
             </div>

             {/* Card Body */}
             <div className="px-8 py-4 flex-1 relative z-10 flex flex-col justify-center">
               <Icon name="format_quote" className="text-3xl text-border-subtle mb-2 opacity-50" />
               <p className="font-serif text-xl leading-relaxed text-ink-primary">
                 {req.content}
               </p>
             </div>

             {/* Card Footer / Action */}
             <div className="p-6 border-t border-border-subtle/50 bg-paper-main/30 mt-auto flex justify-between items-center relative z-10">
               <div className="flex items-center gap-2 text-ink-muted" title={`${req.prayCount} people have prayed`}>
                  <Icon name="candle" className={req.isPrayed ? 'text-accent-liturgical' : ''} />
                  <span className="font-mono text-xs">
                    {req.prayCount > 0 ? `+ ${req.prayCount}` : 'Be the first'}
                  </span>
               </div>

               <button 
                 onClick={() => handlePray(req.id)}
                 className={`px-5 py-2 rounded-sm text-xs font-sans font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                   req.isPrayed 
                     ? 'bg-accent-liturgical text-paper-main shadow-md hover:bg-opacity-90' 
                     : 'border border-ink-muted text-ink-secondary hover:border-accent-liturgical hover:text-accent-liturgical'
                 }`}
               >
                 {req.isPrayed ? (
                   <>
                     <Icon name="check" className="text-[16px]" />
                     Prayed
                   </>
                 ) : (
                   'Pray'
                 )}
               </button>
             </div>
          </div>
        ))}

        {/* End of List Spacer */}
        <div className="w-10 flex-shrink-0"></div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-ink-primary/20 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-paper-main w-full max-w-lg rounded-sm shadow-2xl border border-border-subtle flex flex-col relative z-10">
              <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-paper-surface">
                 <h3 className="font-display text-2xl text-ink-primary">Submit Prayer Request</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-ink-muted hover:text-ink-primary"><Icon name="close" /></button>
              </div>
              <div className="p-8 space-y-6">
                 <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-ink-muted mb-2">Your Name</label>
                    <input 
                      type="text" 
                      value={newRequestName}
                      onChange={(e) => setNewRequestName(e.target.value)}
                      className="w-full bg-paper-surface border border-border-subtle p-3 rounded-sm font-serif text-lg text-ink-primary focus:border-ink-primary focus:ring-0" 
                      placeholder="e.g. John Doe"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-ink-muted mb-2">Category</label>
                    <div className="flex gap-2 flex-wrap">
                       {requestCategories.map(cat => (
                         <button 
                           key={cat}
                           onClick={() => setNewRequestCategory(cat)}
                           className={`px-3 py-1.5 rounded-sm border text-xs font-sans uppercase tracking-wide transition-colors ${
                             newRequestCategory === cat 
                               ? 'bg-ink-primary text-paper-main border-ink-primary' 
                               : 'bg-paper-surface border-border-subtle text-ink-secondary hover:border-ink-muted'
                           }`}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-ink-muted mb-2">Request</label>
                    <textarea 
                      rows={4} 
                      value={newRequestContent}
                      onChange={(e) => setNewRequestContent(e.target.value)}
                      className="w-full bg-paper-surface border border-border-subtle p-3 rounded-sm font-serif text-lg text-ink-primary focus:border-ink-primary focus:ring-0 resize-none" 
                      placeholder="Share your burden or joy..."
                    />
                 </div>
                 <button 
                   onClick={handleSubmitRequest}
                   disabled={!newRequestName || !newRequestContent}
                   className="w-full py-3 bg-accent-liturgical text-paper-main font-sans font-bold uppercase tracking-widest rounded-sm hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Submit Request
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};