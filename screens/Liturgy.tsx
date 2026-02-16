import React from 'react';
import { Icon } from '../components/Icon';

export const Liturgy: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRTVFMkRDIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNEOEQzQzgiLz4KPC9zdmc+')" }}></div>

      {/* Top Controls */}
      <header className="flex-none flex justify-between items-center px-8 py-4 z-10 border-b border-border-subtle bg-paper-main/90 backdrop-blur">
         <div className="flex items-center gap-4">
            <button className="text-ink-secondary hover:text-ink-primary">
               <Icon name="arrow_back" />
            </button>
            <span className="font-sans text-xs uppercase tracking-widest text-ink-muted">Order of Service</span>
         </div>
         <div className="flex gap-2">
            <button className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-surface rounded-sm" title="Print">
               <Icon name="print" />
            </button>
            <button className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-surface rounded-sm" title="Download PDF">
               <Icon name="download" />
            </button>
         </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto z-10 pb-20">
         <div className="max-w-[700px] mx-auto bg-paper-surface border-x border-dashed border-border-subtle min-h-full px-12 py-16 shadow-sm relative">
            
            {/* Service Header */}
            <div className="text-center mb-16 space-y-4">
               <div className="w-16 h-16 mx-auto mb-6 text-ink-primary border border-ink-primary rounded-full flex items-center justify-center">
                  <Icon name="church" className="text-3xl" />
               </div>
               <h1 className="font-display text-4xl text-ink-primary tracking-tight">The Third Sunday <br/> of Advent</h1>
               <div className="flex items-center justify-center gap-4 text-sm font-serif italic text-ink-secondary">
                  <span>December 14, 2025</span>
                  <span>•</span>
                  <span>9:00 AM & 11:00 AM</span>
               </div>
               <div className="w-12 h-[1px] bg-accent-liturgical mx-auto mt-6"></div>
            </div>

            {/* Liturgy Items */}
            <div className="space-y-12">
               
               {/* PRELUDE */}
               <section className="text-center">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">Prelude</span>
                  <h3 className="font-display text-xl text-ink-primary">Wachet auf, ruft uns die Stimme</h3>
                  <p className="font-serif italic text-ink-muted text-sm">J.S. Bach (BWV 645)</p>
               </section>

               {/* CALL TO WORSHIP */}
               <section className="space-y-4">
                  <div className="text-center">
                     <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-2">Call to Worship</span>
                     <p className="font-serif text-sm text-accent-liturgical italic mb-4">Please stand as you are able.</p>
                  </div>
                  <div className="font-serif text-lg leading-relaxed text-ink-primary space-y-4 pl-4 border-l-2 border-border-subtle">
                     <p><strong className="font-sans text-xs uppercase tracking-wide text-ink-muted mr-2">Leader:</strong> Prepare the way of the Lord.</p>
                     <p><strong className="font-sans text-xs uppercase tracking-wide text-ink-primary mr-2">People:</strong> Make straight in the desert a highway for our God.</p>
                     <p><strong className="font-sans text-xs uppercase tracking-wide text-ink-muted mr-2">Leader:</strong> Every valley shall be lifted up, and every mountain and hill be made low.</p>
                     <p><strong className="font-sans text-xs uppercase tracking-wide text-ink-primary mr-2">People:</strong> And the glory of the Lord shall be revealed.</p>
                  </div>
               </section>

               {/* OPENING HYMN */}
               <section className="text-center group cursor-pointer">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">Opening Hymn</span>
                  <div className="inline-block p-4 border border-transparent group-hover:border-border-subtle group-hover:bg-paper-main rounded-sm transition-all">
                     <h3 className="font-display text-2xl text-ink-primary group-hover:text-accent-liturgical transition-colors">O Come, O Come, Emmanuel</h3>
                     <p className="font-serif italic text-ink-muted text-sm">Hymn No. 119 • VENI EMMANUEL</p>
                  </div>
               </section>

               {/* PRAYER OF CONFESSION */}
               <section>
                  <div className="text-center mb-4">
                     <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">Prayer of Confession</span>
                     <p className="font-serif text-sm text-accent-liturgical italic">Unison</p>
                  </div>
                  <p className="font-serif text-lg leading-loose text-justify text-ink-secondary">
                     God of grace and truth, in Jesus Christ you came among us as light shining in darkness. We confess that we have not welcomed the light, or trusted the good news of peace. We have closed our eyes to glory in our midst, expecting little, and hoping for less. Forgive our doubt, and renew our hope, so that we may receive the fullness of your grace, and live in the truth of Christ the Lord. Amen.
                  </p>
               </section>

               <div className="w-full flex items-center gap-4 opacity-30">
                  <div className="h-px bg-ink-muted flex-1"></div>
                  <Icon name="cross" className="text-xl" />
                  <div className="h-px bg-ink-muted flex-1"></div>
               </div>

               {/* SCRIPTURE READING */}
               <section className="text-center">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">The Epistle Reading</span>
                  <h3 className="font-display text-xl text-ink-primary mb-2">Philippians 4:4-7</h3>
                  <p className="font-serif text-ink-secondary text-base max-w-md mx-auto italic">
                     "Rejoice in the Lord always; again I will say, rejoice. Let your reasonableness be known to everyone..."
                  </p>
                  <button className="mt-4 text-xs font-sans uppercase tracking-widest text-ink-muted hover:text-ink-primary border-b border-transparent hover:border-ink-primary transition-all">Read Full Text</button>
               </section>

               {/* SERMON */}
               <section className="text-center py-6 bg-paper-main/50 border-y border-border-subtle my-8">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-2">The Sermon</span>
                  <h2 className="font-display text-3xl text-ink-primary mb-1">The Theology of Rest</h2>
                  <p className="font-serif italic text-ink-secondary">Dr. Aris Thorne</p>
                  <div className="mt-6 flex justify-center gap-4">
                     <button className="flex items-center gap-2 px-4 py-2 bg-ink-primary text-paper-main rounded-sm text-xs font-sans font-bold uppercase tracking-widest hover:bg-ink-secondary transition-colors">
                        <Icon name="edit_note" className="text-sm" />
                        Take Notes
                     </button>
                  </div>
               </section>

               {/* OFFERTORY */}
               <section className="text-center">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">Offertory Anthem</span>
                  <h3 className="font-display text-xl text-ink-primary">Lo, How a Rose E'er Blooming</h3>
                  <p className="font-serif italic text-ink-muted text-sm">Michael Praetorius</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-ink-muted mt-2">Sanctuary Choir</p>
               </section>

               {/* BENEDICTION */}
               <section className="text-center">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-accent-liturgical mb-1">Benediction</span>
                  <p className="font-serif text-sm text-accent-liturgical italic">Please stand for the blessing.</p>
               </section>

               <div className="pt-12 text-center">
                   <p className="font-serif italic text-ink-muted text-sm">Postlude: In Dulci Jubilo (BWV 729)</p>
               </div>

            </div>
         </div>
      </main>
    </div>
  );
};