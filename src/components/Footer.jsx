import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-display font-bold text-primary mb-2">ASTHRA</h2>
          <p className="text-sm text-slate-600 max-w-md">
            ASTHRA — Inspiring students to learn, create, collaborate, and lead.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a
            href="https://instagram.com/asthra.community"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span className="text-sm font-medium">@asthra.community</span>
          </a>
          
          <a
            href="mailto:hello@asthra.community"
            className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">Email Us</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
