import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-[hsl(var(--background-dark))]/70 border-b border-[hsl(var(--secondary-purple))]/20 px-6 py-4 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-philosopher text-2xl md:text-3xl font-bold text-[hsl(var(--accent))] cursor-pointer">
            StoicBot
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-sm hover:text-[hsl(var(--accent))] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/chat" 
                className="text-sm hover:text-[hsl(var(--accent))] transition-colors duration-200"
              >
                Chat
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
