import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-[hsl(var(--secondary-purple))]/20 mt-16 backdrop-blur-md bg-[hsl(var(--background-dark))]/70 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <span className="font-philosopher text-xl font-bold text-[hsl(var(--accent))] cursor-pointer">
                StoicBot
              </span>
            </Link>
            <p className="text-sm opacity-70 mt-1">Ancient wisdom for modern times.</p>
          </div>
          
          <div className="text-sm opacity-70">
            <p>&copy; {currentYear} StoicBot. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
