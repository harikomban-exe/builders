import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { activities } from '../data/activities';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Activities() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.activity-card', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-16 md:py-24" ref={containerRef}>
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">EXPLORE</span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Activities</h1>
        <p className="text-lg text-slate-600">Discover our latest events, workshops, and student-driven initiatives designed to inspire and innovate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
        {activities.map((activity) => (
          <Link 
            key={activity.id} 
            to={`/activities/${activity.id}`}
            className="activity-card group flex flex-col h-full bg-surface border border-border/60 hover:border-border rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-bento"
          >
            {/* IMAGE */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
              <img 
                src={activity.coverImage} 
                alt={activity.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&h=600'; e.target.classList.add('img-placeholder') }}
              />
            </div>
            
            {/* CONTENT */}
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">{activity.date}</span>
              <h3 className="text-2xl font-display font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">{activity.title}</h3>
              
              <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed flex-grow">
                {activity.shortDescription}
              </p>
              
              <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300">
                <span className="mr-2">View Details</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
