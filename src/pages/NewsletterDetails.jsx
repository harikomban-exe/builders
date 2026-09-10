import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { newsletters } from '../data/newsletters';

export default function NewsletterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsletter = newsletters.find(n => n.id === id);

  useEffect(() => {
    if (!newsletter) return;
  }, [newsletter]);

  if (!newsletter) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-display font-bold mb-4 text-primary">Newsletter not found</h1>
        <button onClick={() => navigate('/newsletters')} className="btn-primary mt-4 inline-flex items-center space-x-2">
          <ArrowLeft size={18} />
          <span>Back to Newsletters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto animate-fade-in">
      <Link to="/newsletters" className="inline-flex items-center space-x-2 text-slate-500 hover:text-accent transition-colors mb-8 group">
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Newsletters</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-12 mb-12">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden shadow-bento border border-border">
            <img 
              src={newsletter.coverImage} 
              alt={newsletter.title} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Newsletter+Cover'; }}
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <span className="text-sm font-semibold text-accent mb-3 block uppercase tracking-wider">{newsletter.date}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">{newsletter.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {newsletter.shortDescription}
          </p>
          
          <div>
            <a href="#" onClick={(e) => e.preventDefault()} className="btn-primary inline-flex items-center space-x-2">
              <Download size={18} />
              <span>Download PDF</span>
            </a>
            <p className="text-xs text-slate-400 mt-3">* PDF download is a simulated action for this demo.</p>
          </div>
        </div>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-display font-bold text-primary mb-4">In this edition</h3>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore the latest highlights, stories, and updates from the ASTHRA community. We bring you insights into student projects, upcoming events, and a recap of our recent achievements. 
          Thank you for being part of our journey as we continue to learn, create, and collaborate.
        </p>
      </div>
    </div>
  );
}
