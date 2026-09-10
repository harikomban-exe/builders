import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { activities } from '../data/activities';
import { newsletters } from '../data/newsletters';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  
  // Interaction Refs
  const heroRef = useRef(null);
  const pointerGlowRef = useRef(null);
  const logoRef = useRef(null);
  const heroContentRef = useRef(null);
  const exploreBtnRef = useRef(null);
  const quoteRef = useRef(null);

  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const shouldAnimate = !prefersReducedMotion && !isTouch;

    const ctx = gsap.context(() => {
      // 1. Generic Section Reveals for Bento Items
      gsap.utils.toArray('.reveal-bento').forEach((element, i) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          }
        });
      });

      // 2. Quote Interaction (Fade + Scale)
      gsap.fromTo(quoteRef.current, 
        { opacity: 0, scale: 0.97, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%'
          }
        }
      );

      // 3. Scroll-Based Hero Logo Reveal (Illumination glow on scroll)
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { color: '#ffffff', textShadow: '0px 0px 0px rgba(255, 255, 255, 0)' },
          {
            color: '#ffffff',
            textShadow: '0px 0px 20px rgba(255, 255, 255, 0.4)',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 0.5,
            }
          }
        );
      }

      // 4. Mission/Vision Stagger Reveal
      gsap.from('.mission-vision-item', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mission-vision-container',
          start: 'top 90%'
        }
      });

      // 5. Mouse Parallax setup (Desktop only)
      if (shouldAnimate) {
        // Create quickTo instances for smooth performance
        const glowX = gsap.quickTo(pointerGlowRef.current, "x", { duration: 0.4, ease: "power3" });
        const glowY = gsap.quickTo(pointerGlowRef.current, "y", { duration: 0.4, ease: "power3" });
        
        const logoX = gsap.quickTo(logoRef.current, "x", { duration: 0.6, ease: "power2.out" });
        const logoY = gsap.quickTo(logoRef.current, "y", { duration: 0.6, ease: "power2.out" });

        const contentX = gsap.quickTo(heroContentRef.current, "x", { duration: 0.8, ease: "power2.out" });
        const contentY = gsap.quickTo(heroContentRef.current, "y", { duration: 0.8, ease: "power2.out" });

        const handleHeroMouseMove = (e) => {
          if (!heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Normalized coordinates (-1 to 1)
          const normX = (relX - centerX) / centerX;
          const normY = (relY - centerY) / centerY;

          // Pointer Glow follows exactly
          glowX(relX);
          glowY(relY);

          // Subtle Parallax (Max 8-15px)
          logoX(normX * 12);
          logoY(normY * 12);
          
          contentX(normX * 6);
          contentY(normY * 6);
        };

        const handleHeroMouseLeave = () => {
          // Reset parallax positions
          logoX(0);
          logoY(0);
          contentX(0);
          contentY(0);
          // Hide glow subtly handled in CSS opacity on hover
        };

        heroRef.current.addEventListener('mousemove', handleHeroMouseMove);
        heroRef.current.addEventListener('mouseleave', handleHeroMouseLeave);

        // Magnetic Button setup
        const btnX = gsap.quickTo(exploreBtnRef.current, "x", { duration: 0.4, ease: "power3" });
        const btnY = gsap.quickTo(exploreBtnRef.current, "y", { duration: 0.4, ease: "power3" });

        const handleBtnMouseMove = (e) => {
          const rect = exploreBtnRef.current.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          
          // Max magnetic movement 4-6px
          const moveX = ((relX / rect.width) - 0.5) * 10; 
          const moveY = ((relY / rect.height) - 0.5) * 10;
          
          btnX(moveX);
          btnY(moveY);
        };

        const handleBtnMouseLeave = () => {
          btnX(0);
          btnY(0);
        };

        if(exploreBtnRef.current) {
          exploreBtnRef.current.addEventListener('mousemove', handleBtnMouseMove);
          exploreBtnRef.current.addEventListener('mouseleave', handleBtnMouseLeave);
        }

        return () => {
          if (heroRef.current) {
            heroRef.current.removeEventListener('mousemove', handleHeroMouseMove);
            heroRef.current.removeEventListener('mouseleave', handleHeroMouseLeave);
          }
          if (exploreBtnRef.current) {
            exploreBtnRef.current.removeEventListener('mousemove', handleBtnMouseMove);
            exploreBtnRef.current.removeEventListener('mouseleave', handleBtnMouseLeave);
          }
        };
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const latestActivity = activities[0];
  const latestNewsletter = newsletters[0];

  return (
    <div className="pt-8 pb-16" ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,_auto)]">
        
        {/* Large Box: Welcome + Mission/Vision (HERO) */}
        <div 
          ref={heroRef}
          className="bento-card p-8 md:p-12 lg:col-span-2 flex flex-col justify-center bg-primary text-white relative overflow-hidden group/hero"
        >
          {/* Pointer Glow */}
          <div 
            ref={pointerGlowRef}
            className="absolute top-[-192px] left-[-192px] w-[384px] h-[384px] bg-accent/20 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 mix-blend-screen"
          />

          {/* Decorative subtle background elements for depth */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          {/* Logo / Title */}
          <div className="relative z-10" ref={logoRef}>
            <h1 
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              className="text-5xl md:text-7xl font-display font-bold mb-4 inline-block origin-left transition-transform duration-500 will-change-transform"
              style={{ transform: isHoveringLogo ? 'scale(1.01)' : 'scale(1)' }}
            >
              ASTHRA
            </h1>
          </div>

          {/* Content Wrapper for slight parallax */}
          <div ref={heroContentRef} className="relative z-10 will-change-transform">
            <p className="text-xl md:text-2xl font-light mb-8 opacity-90 text-white">Where Ideas Ignite.</p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-4 mission-vision-container">
              <div className="mission-vision-item group/mv transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-2 text-accent transition-colors group-hover/mv:text-orange-400">Mission</h3>
                <p className="text-sm opacity-80 leading-relaxed text-white">ASTHRA brings students together to explore technology, creativity, and new ideas through collaboration and meaningful experiences.</p>
              </div>
              <div className="mission-vision-item group/mv transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-2 text-accent transition-colors group-hover/mv:text-orange-400">Vision</h3>
                <p className="text-sm opacity-80 leading-relaxed text-white">To create a student community where curiosity leads to innovation and collaboration leads to impact.</p>
              </div>
            </div>
            
            <div className="mt-10 inline-block">
              <Link 
                to="/activities" 
                ref={exploreBtnRef}
                className="inline-flex items-center space-x-2 text-white bg-accent/90 hover:bg-accent px-6 py-3 rounded-full transition-colors duration-300 font-medium will-change-transform"
              >
                <span>Explore Activities</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Box: Quote */}
        <div 
          ref={quoteRef}
          className="bento-card p-8 md:p-12 flex flex-col justify-center items-center text-center bg-muted relative overflow-hidden group/quote"
        >
          {/* Subtle background glow for quote on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/quote:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <blockquote className="text-3xl md:text-4xl font-display italic text-primary leading-tight relative z-10">
            “Create boldly. Collaborate freely. Inspire endlessly.”
          </blockquote>
        </div>

        {/* Box: Featured Activity */}
        <Link to={`/activities/${latestActivity.id}`} className="reveal-bento bento-card group relative overflow-hidden block">
          <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/30"></div>
          <img src={latestActivity.coverImage} alt={latestActivity.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="relative z-20 h-full p-8 flex flex-col justify-end text-white">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 bg-accent/90 text-white w-max px-3 py-1 rounded-full">Latest Activity</span>
            <h3 className="text-2xl font-display font-bold mb-2">{latestActivity.title}</h3>
            <p className="text-sm opacity-90">{latestActivity.date}</p>
          </div>
        </Link>

        {/* Box: Featured Newsletter */}
        <Link to={`/newsletters/${latestNewsletter.id}`} className="reveal-bento bento-card lg:col-span-2 group relative overflow-hidden block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10 transition-opacity group-hover:from-primary/80"></div>
          <img src={latestNewsletter.coverImage} alt={latestNewsletter.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="relative z-20 h-full p-8 flex flex-col justify-center text-white md:w-2/3">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 bg-surface/20 text-white w-max px-3 py-1 rounded-full backdrop-blur-md">Latest Newsletter</span>
            <h3 className="text-3xl font-display font-bold mb-3">{latestNewsletter.title}</h3>
            <p className="text-sm opacity-80 mb-6 line-clamp-2">{latestNewsletter.shortDescription}</p>
            <div className="flex items-center space-x-2 text-accent font-medium group-hover:underline">
              <span>Read Newsletter</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
