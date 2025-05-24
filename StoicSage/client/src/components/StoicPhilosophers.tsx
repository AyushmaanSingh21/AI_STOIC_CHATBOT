import colorfulStoic from '../assets/colorful_stoic.png';
import stoicLeaders from '../assets/stoic_leaders.png';

export default function StoicPhilosophers() {
  const philosophers = [
    {
      name: "Marcus Aurelius",
      image: colorfulStoic,
      description: "Roman Emperor and Stoic philosopher known for his work 'Meditations'",
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength."
    },
    {
      name: "Epictetus",
      image: stoicLeaders,
      description: "Former slave who became an influential Stoic teacher",
      quote: "Make the best use of what is in your power, and take the rest as it happens."
    }
  ];

  return (
    <section id="philosophers" className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="font-philosopher text-3xl md:text-4xl font-bold text-center text-[hsl(var(--accent))] mb-8">
        Stoic Philosophers
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {philosophers.map((philosopher, index) => (
          <div 
            key={index} 
            className="relative group rounded-2xl bg-black/30 backdrop-blur-md border border-[hsl(var(--secondary-purple))]/30 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(133,90,243,0.2)]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={philosopher.image} 
                alt={philosopher.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              {/* Content at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-philosopher text-2xl font-bold mb-2">
                  {philosopher.name}
                </h3>
                <p className="text-sm opacity-90 mb-2">
                  {philosopher.description}
                </p>
                <blockquote className="italic text-sm opacity-80 border-l-2 border-[hsl(var(--accent))] pl-3 mt-2">
                  "{philosopher.quote}"
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          These philosophers developed practical wisdom that continues to guide and inspire people today, offering timeless insights on resilience, virtue, and inner peace.
        </p>
      </div>
    </section>
  );
}