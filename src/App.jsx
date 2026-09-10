import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetails from './pages/ActivityDetails';
import Newsletters from './pages/Newsletters';
import NewsletterDetails from './pages/NewsletterDetails';
import Committee from './pages/Committee';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/newsletters/:id" element={<NewsletterDetails />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-display font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-slate-600 mb-8">The page you are looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Return Home</a>
    </div>
  );
}

export default App;
