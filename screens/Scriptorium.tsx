import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { ArchiveEntry } from '../types';

export const Scriptorium: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'note' | 'scripture' | 'lyric'>('all');

  // Mock Data
  const entries: ArchiveEntry[] = [
    {
      id: '1',
      type: 'note',
      title: 'The Beatitudes Reflection',
      reference: 'Matt 5:1-12',
      preview: 'The inverted kingdom of heaven. Blessed are the poor in spirit, for theirs is the kingdom. This connects to the idea of emptying oneself to be filled.',
      date: 'Dec 05, 2025',
      tags: ['kingdom', 'grace', 'matthew']
    },
    {
      id: '2',
      type: 'scripture',
      title: 'Comfort in Anxiety',
      reference: 'Phil 4:6-7',
      preview: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.',
      date: 'Nov 28, 2025',
      tags: ['peace', 'prayer']
    },
    {
      id: '3',
      type: 'lyric',
      title: 'Come Thou Fount',
      reference: 'Hymn #12',
      preview: 'Prone to wander, Lord, I feel it, prone to leave the God I love; here’s my heart, O take and seal it, seal it for thy courts above.',
      date: 'Nov 15, 2025',
      tags: ['worship', 'confession']
    },
    {
      id: '4',
      type: 'note',
      title: 'Notes on Genesis 1',
      reference: 'Gen 1:1',
      preview: 'Creation ex nihilo. The chaotic waters vs the ordering word of God. Light is the first structure.',
      date: 'Oct 20, 2025',
      tags: ['creation', 'origins']
    },
    {
      id: '5',
      type: 'scripture',
      title: 'The Word Made Flesh',
      reference: 'John 1:14',
      preview: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.',
      date: 'Oct 10, 2025',
      tags: ['incarnation', 'gospel']
    }
  ];

  // Biblical Index Data (Abbreviated)
  const bibleBooks = [
    { name: 'GEN', count: 12 }, { name: 'EXO', count: 4 }, { name: 'LEV', count: 0 }, 
    { name: 'PSA', count: 45 }, { name: 'PRO', count: 8 }, { name: 'ISA', count: 15 },
    { name: 'MAT', count: 22 }, { name: 'MRK', count: 5 }, { name: 'LUK', count: 18 },
    { name: 'JHN', count: 30 }, { name: 'ACT', count: 12 }, { name: 'ROM', count: 14 },
    { name: 'REV', count: 2 }
  ];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || entry.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-full bg-paper-main overflow-hidden">
      
      {/* Left Panel: The Index (Library Card Catalog Style) */}
      <aside className="w-80 border-r border-border-subtle bg-paper-surface flex flex-col z-10 hidden md:flex">
        <div className="p-6 border-b border-border-subtle">
           <h2 className="font-display text-xl text-ink-primary mb-1">The Index</h2>
           <p className="font-serif italic text-xs text-ink-muted">Your personal concordance.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Biblical Frequency Heatmap */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-widest text-ink-muted mb-4 font-bold">Biblical Focus</h3>
            <div className="grid grid-cols-4 gap-2">
              {bibleBooks.map((book) => (
                <div 
                  key={book.name} 
                  className={`text-center py-1.5 rounded-sm border text-[10px] font-mono cursor-pointer transition-colors ${
                    book.count > 20 ? 'bg-ink-primary text-paper-main border-ink-primary' :
                    book.count > 10 ? 'bg-ink-muted/20 text-ink-primary border-ink-muted/30' :
                    book.count > 0 ? 'bg-paper-main text-ink-secondary border-border-subtle' :
                    'opacity-30 border-transparent text-ink-muted'
                  }`}
                  title={`${book.count} entries`}
                >
                  {book.name}
                </div>
              ))}
              <div className="col-span-4 text-center mt-2 text-[10px] text-ink-muted italic hover:text-ink-primary cursor-pointer">View All Books</div>
            </div>
          </div>

          {/* Tags Cloud */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-widest text-ink-muted mb-4 font-bold">Top Topics</h3>
            <div className="flex flex-wrap gap-2">
               {['#grace', '#kingdom', '#prayer', '#worship', '#suffering', '#hope', '#advent'].map(tag => (
                 <span key={tag} className="px-2 py-1 bg-paper-main border border-border-subtle rounded-sm text-xs text-ink-secondary font-serif hover:border-ink-muted cursor-pointer transition-colors">
                   {tag}
                 </span>
               ))}
            </div>
          </div>

        </div>
      </aside>

      {/* Main Content: The Archive */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header / Search */}
        <header className="flex-none px-10 py-8 border-b border-border-subtle bg-paper-main z-10">
           <div className="flex items-center gap-2 mb-4">
             <Icon name="book_2" className="text-ink-secondary" />
             <span className="font-sans text-xs uppercase tracking-widest text-ink-secondary">The Scriptorium</span>
           </div>
           
           <div className="relative max-w-2xl">
              <input 
                type="text" 
                placeholder="Search notes, scriptures, and lyrics..." 
                className="w-full bg-transparent border-b-2 border-border-subtle py-4 text-3xl font-display text-ink-primary placeholder-ink-muted/50 focus:outline-none focus:border-ink-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted">
                 <Icon name="search" className="text-2xl" />
              </div>
           </div>

           {/* Filter Tabs */}
           <div className="flex gap-6 mt-8">
              {['all', 'note', 'scripture', 'lyric'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`text-sm font-sans uppercase tracking-widest pb-1 transition-colors ${
                    activeFilter === filter 
                      ? 'text-ink-primary border-b border-accent-liturgical' 
                      : 'text-ink-muted hover:text-ink-secondary'
                  }`}
                >
                  {filter}s
                </button>
              ))}
           </div>
        </header>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {filteredEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="group p-6 bg-paper-surface border border-border-subtle rounded-sm hover:border-ink-muted hover:shadow-paper transition-all cursor-pointer flex gap-6"
              >
                {/* Icon Column */}
                <div className="flex-shrink-0 pt-1">
                   <div className={`w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center ${
                      entry.type === 'scripture' ? 'bg-[#F4F1E8] text-accent-liturgical' :
                      entry.type === 'lyric' ? 'bg-[#EEF0F2] text-ink-secondary' :
                      'bg-paper-darker text-ink-primary'
                   }`}>
                      <Icon name={
                        entry.type === 'scripture' ? 'menu_book' :
                        entry.type === 'lyric' ? 'music_note' :
                        'edit_note'
                      } />
                   </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-display text-xl text-ink-primary group-hover:text-accent-liturgical transition-colors">{entry.title}</h3>
                      <span className="font-mono text-xs text-ink-muted">{entry.date}</span>
                   </div>
                   
                   {entry.reference && (
                     <p className="font-sans text-xs uppercase tracking-wide text-ink-muted mb-3 font-semibold">{entry.reference}</p>
                   )}
                   
                   <p className="font-serif text-lg text-ink-secondary leading-relaxed line-clamp-2">
                     {entry.preview}
                   </p>

                   <div className="flex gap-2 mt-4">
                      {entry.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-ink-muted bg-paper-main px-1.5 py-0.5 rounded border border-border-subtle">
                          #{tag}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
                   <Icon name="arrow_forward" />
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-20 opacity-50">
                <Icon name="manage_search" className="text-4xl text-ink-muted mb-4" />
                <p className="font-serif text-xl text-ink-secondary">No manuscripts found matching your query.</p>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
};