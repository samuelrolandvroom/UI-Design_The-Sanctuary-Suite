import React from 'react';
import { Icon } from '../components/Icon';
import { ScreenName } from '../types';

interface NarthexProps {
  onNavigate: (screen: ScreenName) => void;
}

export const Narthex: React.FC<NarthexProps> = ({ onNavigate }) => {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-paper-main relative">
      {/* Top Bar / Date */}
      <header className="sticky top-0 z-10 bg-paper-main/95 backdrop-blur-sm border-b border-border-subtle px-10 py-6 flex justify-between items-end">
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-accent-liturgical mb-1">Liturgical Calendar</p>
          <h2 className="text-3xl font-display font-medium text-ink-primary">3rd Sunday of Advent</h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-ink-muted">DECEMBER 14, 2025</p>
          <p className="font-serif italic text-ink-secondary text-lg">Season of Advent</p>
        </div>
      </header>

      {/* Masonry Grid Layout */}
      <div className="p-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Main Focus) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Next Sunday Card (Hero) */}
            <div className="bg-paper-surface border border-border-subtle flex flex-col md:flex-row min-h-[280px] hover:border-ink-muted transition-colors cursor-default">
              <div className="w-full md:w-1/3 bg-paper-darker border-b md:border-b-0 md:border-r border-border-subtle p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#3A3A38 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <span className="font-sans text-xs uppercase tracking-widest text-ink-muted mb-2 z-10">Next Service</span>
                <div className="font-display text-6xl text-ink-primary mb-2 z-10">14</div>
                <div className="font-serif text-xl italic text-ink-secondary mb-6 z-10">December</div>
                <div className="w-8 h-[1px] bg-border-subtle mb-4 z-10"></div>
                <p className="font-mono text-sm text-ink-secondary z-10">9:00 AM & 11:00 AM</p>
              </div>
              <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl mb-4 text-ink-primary">Your Assignments</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border border-border-subtle bg-paper-main/50 rounded-sm">
                      <div className="w-10 h-10 rounded-full border border-border-subtle bg-paper-surface flex items-center justify-center text-accent-liturgical">
                        <Icon name="door_open" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-ink-muted">Role</p>
                        <p className="text-lg font-medium text-ink-primary">Usher (North Door)</p>
                        <p className="text-sm text-ink-secondary font-serif mt-1">Distribute bulletins and assist with seating for the 9:00 AM service.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="check_circle" className="text-accent-liturgical text-[18px]" />
                      <span className="text-sm font-mono text-ink-muted">Confirmed by Mary S. yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => onNavigate('roster')}
                    className="px-6 py-2 border border-border-subtle hover:border-ink-primary hover:bg-paper-darker text-sm font-sans uppercase tracking-widest text-ink-primary transition-colors rounded-sm"
                  >
                    View Full Roster
                  </button>
                </div>
              </div>
            </div>

            {/* Choir Practice Widget */}
            <div className="bg-paper-surface border border-border-subtle p-6 hover:border-ink-muted transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="music_note" className="text-accent-liturgical" />
                  <h3 className="font-display text-xl text-ink-primary">Choir Practice</h3>
                </div>
                <span className="px-2 py-1 bg-paper-darker text-xs font-mono border border-border-subtle rounded-sm">WED 7:00 PM</span>
              </div>
              <div className="flex items-center gap-6">
                <div 
                  className="w-24 h-24 bg-paper-darker border border-border-subtle flex items-center justify-center shrink-0 relative group cursor-pointer overflow-hidden"
                  onClick={() => onNavigate('choir')}
                >
                  {/* Using a placeholder that looks abstract/paper-like */}
                  <img 
                    src="https://picsum.photos/id/452/200/200" 
                    alt="Sheet music" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply grayscale" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-paper-main/30 group-hover:bg-paper-main/10 transition-colors">
                    <Icon name="play_circle" className="text-4xl text-ink-primary drop-shadow-md" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-xs uppercase tracking-widest text-ink-muted mb-1">Current Hymn</p>
                  <h4 className="font-display text-2xl italic text-ink-primary mb-2">O Come, O Come, Emmanuel</h4>
                  <div className="w-full bg-paper-darker h-1 rounded-full overflow-hidden mb-2">
                    <div className="bg-accent-liturgical h-full w-[35%]"></div>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-ink-muted">
                    <span>Tenor Part</span>
                    <span>1:12 / 3:45</span>
                  </div>
                </div>
                <button className="hidden md:flex flex-col items-center justify-center w-16 h-16 border border-border-subtle hover:bg-paper-darker transition-colors rounded-sm group">
                  <Icon name="download" className="text-ink-secondary group-hover:text-accent-liturgical" />
                  <span className="text-[10px] font-sans uppercase mt-1 text-ink-muted">PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Widgets) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Recent Notes */}
            <div className="bg-paper-surface border border-border-subtle flex flex-col">
              <div className="p-4 border-b border-border-subtle bg-paper-surface/50 flex justify-between items-center">
                <h3 className="font-display text-lg text-ink-primary">Recent Notes</h3>
                <button 
                    onClick={() => onNavigate('live-word')}
                    className="text-ink-secondary hover:text-accent-liturgical transition-colors"
                >
                  <Icon name="add" className="text-[20px]" />
                </button>
              </div>
              <div className="divide-y divide-border-subtle">
                <div className="p-4 hover:bg-paper-main cursor-pointer group transition-colors" onClick={() => onNavigate('deep-read')}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif font-medium text-ink-primary group-hover:text-accent-liturgical transition-colors">Sermon on the Mount</h4>
                    <span className="font-mono text-[10px] text-ink-muted">10:42 AM</span>
                  </div>
                  <p className="font-serif text-sm text-ink-secondary italic mb-2">Matthew 5:1-12</p>
                  <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                    The beatitudes as a map for the inverted kingdom. Blessed are the poor in spirit...
                  </p>
                </div>
                <div className="p-4 hover:bg-paper-main cursor-pointer group transition-colors">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif font-medium text-ink-primary group-hover:text-accent-liturgical transition-colors">Advent Preparation</h4>
                    <span className="font-mono text-[10px] text-ink-muted">YESTERDAY</span>
                  </div>
                  <p className="font-serif text-sm text-ink-secondary italic mb-2">General Intercessions</p>
                  <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                    Focus on the upcoming missions trip to Belize. Remember to ask Sarah about the logistics.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-paper-surface/30 text-center">
                <button className="text-xs font-sans uppercase tracking-widest text-ink-muted hover:text-ink-primary transition-colors">View All Notes</button>
              </div>
            </div>

            {/* Verse of the Day (Vertical Card) */}
            <div className="bg-paper-darker/30 border border-border-subtle p-6 flex flex-col items-center text-center relative overflow-hidden">
              <Icon name="format_quote" className="text-4xl text-border-subtle mb-4" />
              <blockquote className="font-display text-xl text-ink-primary leading-relaxed mb-4">
                "The people walking in darkness have seen a great light; on those living in the land of deep darkness a light has dawned."
              </blockquote>
              <cite className="font-serif italic text-sm text-accent-liturgical not-italic">— Isaiah 9:2</cite>
              <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-50"></div>
            </div>

            {/* Community / Updates */}
            <div className="bg-paper-surface border border-border-subtle p-5">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="campaign" className="text-ink-secondary text-[18px]" />
                <h3 className="font-sans text-xs uppercase tracking-widest text-ink-secondary">Announcements</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-liturgical mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-ink-primary font-medium">Christmas Pageant</p>
                    <p className="text-xs text-ink-muted">Rehearsal this Saturday at 10 AM.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-border-subtle mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-ink-primary font-medium">Choir Robes Fitting</p>
                    <p className="text-xs text-ink-muted">Thursday at 6 PM in the vestry.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Quote/Footer Area */}
        <div className="mt-16 text-center border-t border-border-subtle pt-8 pb-4">
          <p className="font-serif italic text-ink-muted text-sm">Soli Deo Gloria</p>
        </div>
      </div>
    </main>
  );
};