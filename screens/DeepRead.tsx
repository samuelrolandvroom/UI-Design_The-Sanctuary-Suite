import React, { useState } from 'react';
import { Icon } from '../components/Icon';

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  preview: string;
  category: 'Sermon' | 'Scripture' | 'Theology' | 'Devotional';
  content: React.ReactNode;
}

export const DeepRead: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // --- Content Repository ---
  const articles: Article[] = [
    {
      id: '1',
      title: 'The Sermon on the Mount',
      subtitle: 'Matthew 5-7',
      author: 'Scripture',
      date: 'Gospel of Matthew',
      readTime: '15 min read',
      category: 'Scripture',
      preview: 'Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him...',
      content: (
        <div className="space-y-8 text-[22px] leading-[1.7] text-ink-primary text-justify font-serif font-normal">
            <p>
                Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. And he opened his mouth and taught them, saying:
            </p>
            <p>
                "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth."
            </p>
            <div className="relative group/paragraph">
                <div className="absolute -right-16 top-2 opacity-0 group-hover/paragraph:opacity-100 transition-opacity duration-300 cursor-help hidden md:block">
                   <Icon name="sticky_note_2" className="text-ink-muted hover:text-accent-liturgical text-[20px]" />
                </div>
                <p>
                    "Blessed are those who hunger and thirst for righteousness, for they shall be satisfied. <span className="bg-paper-surface decoration-accent-liturgical/30 underline decoration-1 underline-offset-4 cursor-pointer hover:bg-[#E5E0D4] transition-colors rounded px-1 -mx-1" title="Note attached">Blessed are the merciful, for they shall receive mercy.</span> Blessed are the pure in heart, for they shall see God. Blessed are the peacemakers, for they shall be called sons of God."
                </p>
            </div>
            <p>
                "Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven. Blessed are you when others revile you and persecute you and utter all kinds of evil against you falsely on my account. Rejoice and be glad, for your reward is great in heaven, for so they persecuted the prophets who were before you."
            </p>
            <p>
               "You are the salt of the earth, but if salt has lost its taste, how shall its saltiness be restored? It is no longer good for anything except to be thrown out and trampled under people's feet."
            </p>
            <p>
                "You are the light of the world. A city set on a hill cannot be hidden. Nor do people light a lamp and put it under a basket, but on a stand, and it gives light to all in the house. In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven."
            </p>
             <div className="relative group/paragraph">
               <div className="absolute -right-16 top-2 opacity-0 group-hover/paragraph:opacity-100 transition-opacity duration-300 cursor-help hidden md:block">
                 <Icon name="history_edu" className="text-ink-muted hover:text-accent-liturgical text-[20px]" />
               </div>
               <p>
                  "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them. For truly, I say to you, until heaven and earth pass away, not an iota, not a dot, will pass from the Law until all is accomplished."
               </p>
            </div>
        </div>
      )
    },
    {
      id: '2',
      title: 'The Theology of Rest',
      subtitle: 'Sermon Transcript',
      author: 'Dr. Aris Thorne',
      date: 'Dec 14, 2025',
      readTime: '25 min read',
      category: 'Sermon',
      preview: 'We often confuse idleness with rest. But when we look at the creation narrative, we see something quite different...',
      content: (
        <div className="space-y-8 text-[22px] leading-[1.7] text-ink-primary text-justify font-serif font-normal">
           <p>
             We live in a world that never sleeps, a culture that rewards exhaustion as a badge of honor. But what if I told you that rest isn't just the cessation of work? What if rest is actually an act of resistance? An act of trust?
           </p>
           <p>
             We often confuse idleness with rest. But when we look at the creation narrative, we see something quite different. God didn't rest because He was tired; He rested because He was finished.
           </p>
           <p>
             "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done. So God blessed the seventh day and made it holy..."
           </p>
           <p>
             This holiness attached to time is unique. It's the first thing in scripture that is declared holy. Not a place, not a person, but a moment in time. A sanctuary in time.
           </p>
           <p>
             When we observe the Sabbath, we are not just taking a break. We are stepping into a cathedral built of hours, declaring that our worth is not defined by our output, but by our Creator's love.
           </p>
        </div>
      )
    },
    {
      id: '3',
      title: 'On the Incarnation',
      subtitle: 'De Incarnatione Verbi',
      author: 'St. Athanasius',
      date: '4th Century',
      readTime: '45 min read',
      category: 'Theology',
      preview: 'For the Word of God, incorporeal, incorruptible, and immaterial, entered our world...',
      content: (
         <div className="space-y-8 text-[22px] leading-[1.7] text-ink-primary text-justify font-serif font-normal">
            <p>
              For the Word of God, incorporeal, incorruptible, and immaterial, entered our world. In one sense, indeed, He was not far from it before, for no part of creation had ever been without Him, who, while ever abiding in union with the Father, yet fills all things that are.
            </p>
            <p>
              But now He entered the world in a new and special way, appearing visibly in a body. You must understand that the cause of His coming was not in Himself; the occasion was our cause.
            </p>
            <p>
              The fact that we were perishing, as I said before, was the cause of His descent to us, and our transgression called forth the Loving-kindness of the Word, that He might come to us and appear among us as a man.
            </p>
         </div>
      )
    },
    {
      id: '4',
      title: 'Advent: A Season of Waiting',
      subtitle: 'Weekly Devotional',
      author: 'Rev. Sarah Jenkins',
      date: 'Dec 01, 2025',
      readTime: '5 min read',
      category: 'Devotional',
      preview: 'Waiting is not empty time. It is the soil in which hope is planted. In Advent, we learn to wait actively.',
      content: (
        <div className="space-y-8 text-[22px] leading-[1.7] text-ink-primary text-justify font-serif font-normal">
           <p>
             Waiting is not empty time. It is the soil in which hope is planted. In Advent, we learn to wait actively. We do not wait as those who have no hope, but as those who know the end of the story.
           </p>
           <p>
             The darkness of winter is not a threat, but a canvas. It is against the backdrop of the longest nights that the light of Christ shines brightest.
           </p>
        </div>
      )
    }
  ];

  const activeArticle = articles.find(a => a.id === selectedArticleId);

  // --- View: Reader (Deep Mode) ---
  if (activeArticle) {
    return (
      <div className="flex flex-col h-full bg-paper-main relative animate-in fade-in duration-300">
        
        {/* Progress Indicator */}
        <div className="fixed bottom-0 left-[260px] right-0 h-[2px] bg-border-subtle z-50">
          <div className="h-full bg-accent-liturgical w-[35%]"></div>
        </div>

        {/* Top Navigation */}
        <div className="absolute top-6 left-6 z-20">
           <button 
             onClick={() => setSelectedArticleId(null)}
             className="flex items-center gap-2 px-4 py-2 bg-paper-surface border border-border-subtle rounded-sm hover:border-ink-primary transition-colors text-ink-secondary hover:text-ink-primary group"
           >
             <Icon name="arrow_back" className="group-hover:-translate-x-1 transition-transform" />
             <span className="font-sans text-xs uppercase tracking-widest font-bold">Back to Library</span>
           </button>
        </div>

        <main className="flex-1 w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
          <article className="max-w-[700px] mx-auto pt-24 pb-40 px-6 relative group/article">
            
            {/* Header */}
            <header className="text-center mb-16">
              <span className="block text-accent-liturgical text-sm font-medium tracking-[0.1em] uppercase mb-4 font-sans">{activeArticle.subtitle || activeArticle.category}</span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink-primary font-display mb-4">{activeArticle.title}</h1>
              <div className="flex items-center justify-center gap-4 text-ink-muted font-serif italic text-sm">
                 <span>{activeArticle.author}</span>
                 <span>•</span>
                 <span>{activeArticle.readTime}</span>
              </div>
            </header>

            {/* Content Body */}
            {activeArticle.content}

            {/* Simulated Context Menu (Visual Only) */}
            <div className="absolute top-[480px] left-1/2 -translate-x-1/2 bg-ink-primary text-paper-main px-1 py-1 rounded shadow-lg flex items-center gap-1 z-20 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none hover:pointer-events-auto cursor-default">
              <button className="hover:bg-white/10 p-2 rounded flex items-center justify-center transition-colors" title="Highlight">
                 <Icon name="brush" className="text-[18px]" />
              </button>
              <button className="hover:bg-white/10 p-2 rounded flex items-center justify-center transition-colors" title="Add Note">
                 <Icon name="edit_note" className="text-[18px]" />
              </button>
              <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
              <button className="hover:bg-white/10 p-2 rounded flex items-center justify-center transition-colors" title="Copy">
                 <Icon name="content_copy" className="text-[18px]" />
              </button>
            </div>

          </article>
        </main>
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4] z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRTVFMkRDIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNEOEQzQzgiLz4KPC9zdmc+')" }}></div>
      </div>
    );
  }

  // --- View: Library (List) ---
  return (
    <div className="flex flex-col h-full bg-paper-main overflow-hidden relative">
      
      {/* Header */}
      <header className="flex-none px-10 py-8 border-b border-border-subtle bg-paper-main z-10">
         <div className="flex items-center gap-2 mb-2">
           <Icon name="import_contacts" className="text-accent-liturgical" />
           <span className="font-sans text-xs uppercase tracking-widest text-accent-liturgical">Digital Library</span>
         </div>
         <h1 className="text-4xl font-display font-medium text-ink-primary">Deep Read</h1>
         <p className="font-serif italic text-ink-secondary mt-1">Immersive texts for contemplation and study.</p>
      </header>

      {/* Grid */}
      <main className="flex-1 overflow-y-auto p-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {articles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className="bg-paper-surface border border-border-subtle p-8 cursor-pointer group hover:border-ink-muted hover:shadow-paper transition-all flex flex-col h-[320px]"
              >
                 <div className="flex justify-between items-start mb-4">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-ink-muted border border-border-subtle px-2 py-1 rounded-sm bg-paper-main">{article.category}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{article.readTime}</span>
                 </div>
                 
                 <h3 className="font-display text-2xl text-ink-primary mb-2 group-hover:text-accent-liturgical transition-colors">{article.title}</h3>
                 <p className="font-serif italic text-ink-secondary text-sm mb-6">{article.author}</p>
                 
                 <div className="w-8 h-[1px] bg-border-subtle mb-6"></div>
                 
                 <p className="font-serif text-ink-secondary text-base leading-relaxed line-clamp-3 mb-auto">
                   {article.preview}
                 </p>
                 
                 <div className="mt-6 flex items-center gap-2 text-ink-muted text-xs font-sans uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                 </div>
              </div>
            ))}

            {/* Coming Soon Card */}
            <div className="border border-dashed border-border-subtle p-8 flex flex-col items-center justify-center text-center opacity-50 select-none">
               <Icon name="history_edu" className="text-4xl text-ink-muted mb-4" />
               <p className="font-serif text-ink-secondary">More texts are being digitized from the archives.</p>
            </div>

         </div>
      </main>

      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRTVFMkRDIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNEOEQzQzgiLz4KPC9zdmc+')" }}></div>
    </div>
  );
};