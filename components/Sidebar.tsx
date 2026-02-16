import React from 'react';
import { ScreenName } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate, collapsed = false }) => {
  const NavItem = ({ screen, icon, label }: { screen: ScreenName; icon: string; label: string }) => {
    const isActive = currentScreen === screen;
    
    if (collapsed) {
      return (
        <button 
          onClick={() => onNavigate(screen)}
          className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors group relative ${
            isActive ? 'bg-paper-darker text-ink-primary' : 'text-ink-secondary hover:bg-paper-surface hover:text-ink-primary'
          }`}
          title={label}
        >
          <Icon name={icon} className="text-[24px]" />
          <span className="absolute left-12 bg-ink-primary text-paper-main text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-sans uppercase tracking-wider whitespace-nowrap pointer-events-none z-50">
            {label}
          </span>
        </button>
      );
    }

    return (
      <button 
        onClick={() => onNavigate(screen)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors group text-left ${
          isActive 
            ? 'bg-paper-darker text-ink-primary border-r-[3px] border-accent-liturgical' 
            : 'text-ink-secondary hover:bg-paper-surface hover:text-ink-primary'
        }`}
      >
        <Icon name={icon} className="text-[20px]" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  };

  if (collapsed) {
    return (
      <aside className="w-20 border-r border-border-subtle bg-paper-main flex flex-col items-center py-6 z-20 h-full flex-shrink-0">
        <div className="mb-8 text-ink-primary">
          <Icon name="church" className="text-3xl" />
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          <NavItem screen="narthex" icon="dashboard" label="The Narthex" />
          <NavItem screen="liturgy" icon="format_list_bulleted" label="Liturgy" />
          <NavItem screen="scriptorium" icon="book_2" label="The Scriptorium" />
          <NavItem screen="live-word" icon="edit_note" label="Sermon Notes" />
          <NavItem screen="deep-read" icon="import_contacts" label="Deep Read" />
          <NavItem screen="intercession" icon="volunteer_activism" label="The Intercession" />
          <NavItem screen="roster" icon="diversity_3" label="Roster" />
          <NavItem screen="choir" icon="music_note" label="Choir Loft" />
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded text-ink-secondary hover:bg-paper-surface hover:text-ink-primary transition-colors">
            <Icon name="settings" />
          </button>
          <div className="w-8 h-8 rounded-full bg-paper-darker border border-border-subtle flex items-center justify-center font-sans font-bold text-xs text-ink-primary">
            TH
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[260px] flex-shrink-0 h-full border-r border-border-subtle bg-paper-main flex flex-col justify-between py-6">
      <div>
        {/* Header */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-ink-primary text-paper-main flex items-center justify-center rounded-sm">
            <Icon name="church" className="text-[20px]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium tracking-tight leading-none font-display">Sanctuary Suite</h1>
            <span className="text-xs text-ink-muted uppercase tracking-widest font-sans mt-1">The Narthex</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3">
          <div className="px-3 py-2 text-xs font-sans uppercase tracking-widest text-ink-muted mt-2">Worship & Study</div>
          <NavItem screen="narthex" icon="dashboard" label="The Narthex" />
          <NavItem screen="liturgy" icon="format_list_bulleted" label="Order of Service" />
          <NavItem screen="scriptorium" icon="book_2" label="The Scriptorium" />
          <NavItem screen="live-word" icon="edit_note" label="Sermon Notes" />
          <NavItem screen="deep-read" icon="import_contacts" label="Deep Read" />

          <div className="px-3 py-2 text-xs font-sans uppercase tracking-widest text-ink-muted mt-6">Community</div>
          <NavItem screen="intercession" icon="volunteer_activism" label="The Intercession" />

          <div className="px-3 py-2 text-xs font-sans uppercase tracking-widest text-ink-muted mt-6">Serve</div>
          <NavItem screen="roster" icon="diversity_3" label="Roster" />

          <div className="px-3 py-2 text-xs font-sans uppercase tracking-widest text-ink-muted mt-6">Sing</div>
          <NavItem screen="choir" icon="music_note" label="Choir Loft" />
        </nav>
      </div>

      {/* User Profile */}
      <div className="px-6 border-t border-border-subtle pt-6">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-paper-darker border border-border-subtle rounded-full overflow-hidden">
             <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-ink-primary">Thomas H.</span>
            <span className="text-xs text-ink-muted font-sans">Tenor • Deacon</span>
          </div>
        </div>
      </div>
    </aside>
  );
};