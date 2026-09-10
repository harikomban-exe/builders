import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { committee } from '../data/committee';

gsap.registerPlugin(ScrollTrigger);

export default function Committee() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal year headings
      gsap.from('.year-heading', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });

      // Reveal members stagger per section
      const sections = document.querySelectorAll('.committee-section');
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll('.member-card'), {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-12" ref={containerRef}>
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Our Committee</h1>
        <p className="text-lg text-slate-600 max-w-2xl">Meet the dedicated students who lead ASTHRA, organizing events, inspiring peers, and driving innovation forward.</p>
      </div>

      <div className="space-y-24">
        {committee.map((group, index) => (
          <section key={index} className="committee-section">
            <h2 className="year-heading text-3xl font-display font-bold text-primary mb-10 pb-4 border-b border-border inline-block pr-12">
              {group.year}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {group.members.map((member, mIndex) => (
                <div key={mIndex} className="member-card group">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-muted border border-border shadow-sm">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { 
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f1f5f9&color=0f172a&size=400&font-size=0.33`; 
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                      <p className="text-sm font-medium text-accent">{member.position}</p>
                    </div>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#0A66C2] transition-colors p-1"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
