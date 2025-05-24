import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const books = [
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "A collection of personal writings by Marcus Aurelius recording his private notes to himself and ideas on Stoic philosophy. Written as a source for his own guidance and self-improvement.",
    level: "Beginner",
    image: "https://m.media-amazon.com/images/I/71WF-Pz1siL._AC_UY218_.jpg"
  },
  {
    title: "Letters from a Stoic",
    author: "Seneca",
    description: "A collection of 124 letters Seneca wrote to his friend Lucilius Junior that discuss a range of moral issues. These letters provide insights into Seneca's philosophy and how Stoicism can be applied in daily life.",
    level: "Intermediate",
    image: "https://m.media-amazon.com/images/I/81QrCuGArYL._AC_UY218_.jpg"
  },
  {
    title: "Discourses and Selected Writings",
    author: "Epictetus",
    description: "A compilation of Epictetus' teachings recorded by his student Arrian. The Discourses focus on themes like freedom, living by nature, and dealing with difficulties.",
    level: "Intermediate",
    image: "https://m.media-amazon.com/images/I/81c30NAhxRL._AC_UY218_.jpg"
  },
  {
    title: "The Daily Stoic",
    author: "Ryan Holiday & Stephen Hanselman",
    description: "A modern book offering 366 days of Stoic insights and exercises, featuring quotes from the great Stoic philosophers and commentary on how to apply these teachings to modern life.",
    level: "Beginner",
    image: "https://m.media-amazon.com/images/I/71tW-9kfPmL._AC_UY218_.jpg"
  },
  {
    title: "A Guide to the Good Life: The Ancient Art of Stoic Joy",
    author: "William B. Irvine",
    description: "A contemporary introduction to Stoic philosophy that shows how applying Stoic principles can lead to a more meaningful and tranquil life.",
    level: "Beginner",
    image: "https://m.media-amazon.com/images/I/71EbZPYPioL._AC_UY218_.jpg"
  },
  {
    title: "How to Be a Stoic",
    author: "Massimo Pigliucci",
    description: "A practical guide to using ancient Stoic wisdom to face modern life's challenges, written by a professor of philosophy who practices Stoicism himself.",
    level: "Beginner",
    image: "https://m.media-amazon.com/images/I/71w7GF8mD3L._AC_UY218_.jpg"
  }
];

export default function BookRecommendations() {
  const [expandedBook, setExpandedBook] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedBook === index) {
      setExpandedBook(null);
    } else {
      setExpandedBook(index);
    }
  };

  return (
    <section id="books" className="max-w-4xl mx-auto mt-16">
      <h2 className="font-philosopher text-3xl font-bold text-center text-[hsl(var(--accent))] mb-8">
        Essential Stoic Reading
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {books.map((book, index) => (
          <div 
            key={index}
            className={`bg-black/30 backdrop-blur-md rounded-xl border border-[hsl(var(--secondary-purple))]/30 overflow-hidden cursor-pointer transition-all duration-300 ${expandedBook === index ? 'shadow-[0_0_30px_rgba(133,90,243,0.2)]' : 'hover:shadow-[0_0_15px_rgba(133,90,243,0.1)]'}`}
          >
            <div 
              className="flex items-center p-4 gap-4"
              onClick={() => toggleExpand(index)}
            >
              <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-md">
                <img 
                  src={book.image} 
                  alt={`${book.title} by ${book.author}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-philosopher text-lg font-bold text-white">
                  {book.title}
                </h3>
                <p className="text-sm opacity-70">
                  by {book.author}
                </p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${book.level === 'Beginner' ? 'bg-green-900/40 text-green-200' : book.level === 'Intermediate' ? 'bg-yellow-900/40 text-yellow-200' : 'bg-red-900/40 text-red-200'}`}>
                    {book.level}
                  </span>
                </div>
              </div>
              
              <ChevronRight 
                className={`w-5 h-5 text-[hsl(var(--accent))] transition-transform duration-300 ${expandedBook === index ? 'rotate-90' : ''}`}
              />
            </div>
            
            <div 
              className={`px-4 overflow-hidden transition-all duration-300 ${expandedBook === index ? 'max-h-48 pb-4' : 'max-h-0'}`}
            >
              <p className="text-sm opacity-80 mb-4">
                {book.description}
              </p>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(`${book.title} by ${book.author} book`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[hsl(var(--accent))] hover:underline inline-flex items-center"
              >
                Find this book
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}