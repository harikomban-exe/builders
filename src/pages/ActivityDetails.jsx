import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { activities } from '../data/activities';

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.id === id);

  useEffect(() => {
    if (!activity) return;
    // Simple fade in effect
  }, [activity]);

  if (!activity) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-display font-bold mb-4 text-primary">Activity not found</h1>
        <button onClick={() => navigate('/activities')} className="btn-primary mt-4 inline-flex items-center space-x-2">
          <ArrowLeft size={18} />
          <span>Back to Activities</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto animate-fade-in">
      <Link to="/activities" className="inline-flex items-center space-x-2 text-slate-500 hover:text-accent transition-colors mb-8 group">
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Activities</span>
      </Link>

      <div className="mb-10">
        <span className="text-sm font-semibold text-accent mb-3 block uppercase tracking-wider">{activity.date}</span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">{activity.title}</h1>
      </div>

      <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 shadow-bento">
        <img 
          src={activity.coverImage} 
          alt={activity.title} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x500?text=Event+Cover'; }}
        />
      </div>

      <div className="prose prose-lg prose-slate max-w-none mb-16">
        <p className="text-xl leading-relaxed text-primary/80 font-medium mb-6">
          {activity.shortDescription}
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          {/* Simulated longer description using provided data context */}
          The {activity.title} brought together students to explore ideas, create meaningful projects, and develop new skills. 
          The event focused on collaboration and learning, providing a platform for participants to showcase their talents and learn from peers.
          It was an inspiring experience that highlighted the potential of student-driven initiatives.
        </p>
      </div>

      {/* Additional Images Placeholder Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-display font-bold text-primary mb-6">Event Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activity.highlights?.map((imgUrl, idx) => (
            <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-muted group relative">
              <img 
                src={imgUrl} 
                alt={`${activity.title} highlight ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
                onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400`; }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
