import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const RosterGrid: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Update dates for Dec 2025 (Sundays: 7, 14, 21, 28)
  const rosterDates = [
      { day: '07', label: 'Advent II' },
      { day: '14', label: 'Advent III' },
      { day: '21', label: 'Advent IV' },
      { day: '25', label: 'Christmas' },
      { day: '28', label: 'Christmas 1' }
  ];

  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden relative">
      {/* Controls Bar */}
      <div className="flex-none px-6 py-4 flex items-center justify-between bg-paper-main/95 backdrop-blur-sm z-20 border-b border-border-subtle">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-display font-semibold text-ink-primary">Volunteer Roster</h2>
          <div className="flex items-center gap-2 border border-border-subtle rounded bg-white/50 px-1">
            <button className="p-1 hover:text-accent-liturgical transition-colors">
              <Icon name="chevron_left" />
            </button>
            <span className="font-display text-lg px-2 min-w-[140px] text-center">December 2025</span>
            <button className="p-1 hover:text-accent-liturgical transition-colors">
               <Icon name="chevron_right" />
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted material-symbols-outlined text-[18px]">search</span>
            <input className="pl-9 pr-4 py-2 bg-white/50 border border-border-subtle rounded-sm text-sm font-sans focus:outline-none focus:border-ink-primary w-64 placeholder-ink-muted" placeholder="Find volunteer..." type="text"/>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-ink-primary text-paper-main rounded-sm hover:bg-ink-secondary transition-colors shadow-sm">
            <Icon name="add" className="text-[18px]" />
            <span className="text-sm font-sans font-medium uppercase tracking-wide">Add Role</span>
          </button>
        </div>
      </div>

      {/* Ledger Grid Container */}
      <div className="flex-1 overflow-auto no-scrollbar relative bg-paper-main px-6 pb-6 pt-4">
        <div className="min-w-max border border-border-subtle bg-white/30 rounded-sm shadow-sm">
          
          {/* Table Header */}
          <div className="flex sticky top-0 z-20 bg-paper-surface border-b border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
             <div className="sticky left-0 z-30 w-64 bg-paper-surface border-r border-border-subtle p-3 flex items-center">
               <span className="text-xs font-sans font-bold uppercase tracking-widest text-ink-muted">Role / Ministry</span>
             </div>
             <div className="flex-1 grid grid-cols-[repeat(5,minmax(200px,1fr))] divide-x divide-border-subtle">
                {rosterDates.map((dateObj, i) => (
                  <div key={dateObj.day} className={`p-3 text-center group cursor-pointer hover:bg-white/40 transition-colors ${i === 1 ? 'bg-white/40 border-b-2 border-accent-liturgical relative' : ''}`}>
                    {i === 1 && <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-accent-liturgical"></div>}
                    <div className={`text-xs font-mono mb-1 ${i === 1 ? 'text-accent-liturgical font-bold' : 'text-ink-muted'}`}>DEC {i === 3 ? '(THU)' : '(SUN)'}</div>
                    <div className="text-xl font-display font-medium text-ink-primary">{dateObj.day}</div>
                    <div className="text-xs text-ink-secondary italic">{dateObj.label}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border-subtle">
             {/* Section Header */}
             <div className="bg-paper-surface/30">
               <div className="sticky left-0 bg-paper-surface/80 backdrop-blur-sm border-r border-border-subtle px-3 py-1.5 z-10">
                 <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-muted">Hospitality Team</span>
               </div>
             </div>

             {/* Row 1 */}
             <div className="flex hover:bg-white/40 transition-colors group">
               <div className="sticky left-0 z-10 w-64 bg-paper-main border-r border-border-subtle p-3 flex flex-col justify-center group-hover:bg-[#F9F7F2] transition-colors">
                  <span className="text-sm font-sans font-medium uppercase tracking-wide text-ink-primary">Head Usher</span>
                  <span className="text-xs text-ink-muted font-serif italic">North Entrance</span>
               </div>
               <div className="flex-1 grid grid-cols-[repeat(5,minmax(200px,1fr))] divide-x divide-border-subtle">
                  <div className="p-2 flex items-center justify-center">
                    <div className="w-full h-full border border-border-subtle bg-white rounded-sm p-2 flex items-center gap-2 shadow-sm">
                      <img src="https://picsum.photos/id/1012/50/50" className="w-6 h-6 rounded-full grayscale opacity-80" alt="Avatar" />
                      <span className="text-sm font-medium text-ink-primary truncate">James Miller</span>
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-center bg-white/20">
                    <div className="w-full h-full border border-border-subtle bg-white rounded-sm p-2 flex items-center gap-2 shadow-sm ring-1 ring-accent-liturgical/20">
                      <img src="https://picsum.photos/id/1027/50/50" className="w-6 h-6 rounded-full grayscale opacity-80" alt="Avatar" />
                      <span className="text-sm font-medium text-ink-primary truncate">Sarah Jenkins</span>
                      <Icon name="check_circle" className="text-accent-liturgical text-[14px] ml-auto" />
                    </div>
                  </div>
                  
                  {/* Interactive Cell */}
                  <div className="p-2 flex items-center justify-center relative">
                    <button 
                      onClick={() => setPopoverOpen(!popoverOpen)}
                      className="w-full h-full border border-dashed border-ink-muted/40 rounded-sm flex items-center justify-center gap-1 hover:bg-paper-surface/50 hover:border-ink-muted transition-all group/btn"
                    >
                      <Icon name="add" className="text-ink-muted group-hover/btn:text-ink-primary text-[16px]" />
                      <span className="text-xs text-ink-muted group-hover/btn:text-ink-primary font-sans font-medium uppercase tracking-wide">Assign</span>
                    </button>
                    {popoverOpen && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 w-[280px] z-50 bg-paper-main rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-border-subtle flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                         <div className="px-3 py-2 border-b border-border-subtle bg-paper-surface flex justify-between items-center">
                           <span className="text-xs font-sans font-bold uppercase tracking-wide text-ink-muted">Select Volunteer</span>
                           <button onClick={() => setPopoverOpen(false)} className="text-ink-muted hover:text-accent-liturgical"><Icon name="close" className="text-[14px]" /></button>
                         </div>
                         <div className="p-2">
                           <input autoFocus className="w-full text-sm px-2 py-1.5 bg-white border border-border-subtle rounded-sm focus:border-ink-primary focus:outline-none mb-2" placeholder="Search name..." type="text"/>
                           <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto">
                              <button className="flex items-center gap-2 p-1.5 hover:bg-paper-surface rounded-sm text-left group/item" onClick={() => setPopoverOpen(false)}>
                                <div className="w-5 h-5 bg-ink-muted/20 rounded-full flex items-center justify-center text-[10px] text-ink-primary font-bold">JD</div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-ink-primary group-hover/item:font-medium">John Doe</span>
                                  <span className="text-[10px] text-ink-muted">Available</span>
                                </div>
                              </button>
                           </div>
                         </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 flex items-center justify-center">
                    <div className="w-full h-full border border-border-subtle bg-white rounded-sm p-2 flex items-center gap-2 shadow-sm opacity-60">
                      <div className="w-6 h-6 rounded-full bg-ink-muted/10 flex items-center justify-center text-xs text-ink-muted font-bold">?</div>
                      <span className="text-sm font-medium text-ink-muted truncate">Pending...</span>
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-center">
                    <button className="w-full h-full border border-dashed border-ink-muted/40 rounded-sm flex items-center justify-center opacity-50 hover:opacity-100 transition-all">
                      <Icon name="add" className="text-ink-muted text-[16px]" />
                    </button>
                  </div>
               </div>
             </div>
             
             {/* Conflict Row Example */}
             <div className="flex hover:bg-white/40 transition-colors group">
               <div className="sticky left-0 z-10 w-64 bg-paper-main border-r border-border-subtle p-3 flex flex-col justify-center group-hover:bg-[#F9F7F2] transition-colors">
                  <span className="text-sm font-sans font-medium uppercase tracking-wide text-ink-primary">Greeter</span>
                  <span className="text-xs text-ink-muted font-serif italic">Main Lobby</span>
               </div>
               <div className="flex-1 grid grid-cols-[repeat(5,minmax(200px,1fr))] divide-x divide-border-subtle">
                 <div className="p-2 flex items-center justify-center relative">
                   <div className="w-full h-full border border-accent-liturgical/30 bg-white rounded-sm p-2 flex items-center gap-2 shadow-sm hatch-pattern cursor-pointer group/conflict">
                      <img src="https://picsum.photos/id/64/50/50" className="w-6 h-6 rounded-full grayscale opacity-80" alt="Avatar" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-ink-primary truncate">Alice Howard</span>
                        <span className="text-[10px] text-accent-liturgical font-bold uppercase tracking-wider">Double Booked</span>
                      </div>
                      <Icon name="warning" className="text-accent-liturgical text-[16px] ml-auto group-hover/conflict:scale-110 transition-transform" />
                   </div>
                 </div>
                 {/* Fillers */}
                 {[1,2,3,4].map(k => (
                    <div key={k} className="p-2 flex items-center justify-center">
                      <button className="w-full h-full border border-dashed border-ink-muted/40 rounded-sm flex items-center justify-center opacity-50 hover:opacity-100 transition-all">
                        <Icon name="add" className="text-ink-muted text-[16px]" />
                      </button>
                    </div>
                 ))}
               </div>
             </div>

          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-none px-6 py-2 border-t border-border-subtle bg-paper-surface text-[10px] text-ink-muted font-sans font-medium uppercase tracking-wider flex gap-6 z-20">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-dashed border-ink-muted/50 rounded-sm bg-transparent"></div>
            <span>Unassigned</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-border-subtle rounded-sm bg-white"></div>
            <span>Confirmed</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-accent-liturgical/30 rounded-sm bg-white hatch-pattern"></div>
            <span className="text-accent-liturgical">Conflict</span>
         </div>
      </div>
    </div>
  );
};