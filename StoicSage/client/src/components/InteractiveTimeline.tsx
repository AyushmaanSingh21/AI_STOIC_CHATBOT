import { useState } from 'react';

const timelineEvents = [
  {
    year: "301 BCE",
    event: "Founding of Stoicism",
    description: "Zeno of Citium founds the Stoic school of philosophy in Athens, teaching at the Stoa Poikile (Painted Porch).",
    significance: "Established the foundation of Stoic philosophy with its emphasis on logic, physics, and ethics."
  },
  {
    year: "c. 280-207 BCE",
    event: "Chrysippus' Contributions",
    description: "Chrysippus systematizes Stoic philosophy, writing over 700 works (almost all lost) and significantly developing Stoic logic.",
    significance: "Often credited as the 'Second Founder' of Stoicism for his extensive development of the school's doctrines."
  },
  {
    year: "c. 135-51 BCE",
    event: "Posidonius' Era",
    description: "Posidonius combines Stoic philosophy with elements of Platonism and synthesizes scientific knowledge of his time.",
    significance: "Influenced Roman thinkers and contributed to Stoicism's spread throughout the Mediterranean world."
  },
  {
    year: "106-43 BCE",
    event: "Cicero's Writings",
    description: "Roman statesman Cicero writes several works discussing Stoic ideas, though he was not strictly a Stoic himself.",
    significance: "Helped transmit Greek philosophical ideas, including Stoicism, to Roman culture and posterity."
  },
  {
    year: "4 BCE - 65 CE",
    event: "Seneca's Life",
    description: "Seneca the Younger serves as advisor to Emperor Nero and writes numerous essays and letters on Stoic philosophy.",
    significance: "Seneca's practical and accessible writings became one of the primary sources of Stoic thought for later generations."
  },
  {
    year: "c. 55-135 CE",
    event: "Epictetus' Teaching",
    description: "Former slave Epictetus establishes a school in Nicopolis, teaching Stoic philosophy with emphasis on personal freedom.",
    significance: "His teachings, recorded by his student Arrian in the Discourses and Enchiridion, focus on distinguishing between what we can and cannot control."
  },
  {
    year: "121-180 CE",
    event: "Marcus Aurelius' Reign",
    description: "Roman Emperor Marcus Aurelius writes his personal reflections (later titled 'Meditations') while on military campaigns.",
    significance: "Represents the application of Stoic principles at the highest level of political power and remains one of the most popular Stoic texts."
  },
  {
    year: "529 CE",
    event: "Closing of Philosophical Schools",
    description: "Emperor Justinian closes the philosophical schools in Athens, marking the formal end of ancient Stoicism.",
    significance: "Though formal Stoic schools disappeared, Stoic ideas continued to influence Christianity and later philosophical traditions."
  },
  {
    year: "16th-17th centuries",
    event: "Neostoicism",
    description: "Justus Lipsius and others revive Stoic ethics combined with Christianity during the Renaissance.",
    significance: "Created a bridge between ancient Stoicism and modern interpretations, influencing European intellectual life."
  },
  {
    year: "21st century",
    event: "Modern Stoicism Revival",
    description: "Renewed interest in Stoicism as practical philosophy for modern life, with books, online communities, and events like Stoic Week.",
    significance: "Stoicism finds new relevance as a practical philosophy for dealing with challenges in the modern world."
  }
];

export default function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState<number>(9); // Start with modern stoicism selected

  return (
    <section id="timeline" className="max-w-5xl mx-auto mt-20 px-4">
      <h2 className="font-philosopher text-3xl font-bold text-center text-[hsl(var(--accent))] mb-8">
        Journey of Stoic Philosophy
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--secondary-purple))]/10 via-[hsl(var(--secondary-purple))]/50 to-[hsl(var(--secondary-purple))]/10"></div>
        
        {/* Timeline events */}
        <div className="space-y-12 relative">
          {timelineEvents.map((event, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:items-start gap-4 md:gap-8`}
            >
              {/* Year bubble */}
              <div 
                className="relative order-1 md:w-1/2 flex justify-center md:justify-end"
                onClick={() => setActiveEvent(index)}
              >
                <div 
                  className={`z-10 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${activeEvent === index 
                    ? 'bg-[hsl(var(--primary))] text-white scale-110 shadow-[0_0_20px_rgba(133,90,243,0.4)]' 
                    : 'bg-[hsl(var(--background-dark))] border border-[hsl(var(--secondary-purple))]/30 text-[hsl(var(--accent))] hover:border-[hsl(var(--secondary-purple))]'}`}
                >
                  <div className="text-xs font-bold">{event.year.split(' ')[0]}</div>
                </div>
              </div>
              
              {/* Event content */}
              <div 
                className={`order-2 md:w-1/2 bg-black/30 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
                  activeEvent === index 
                    ? 'border-[hsl(var(--secondary-purple))]/70 shadow-[0_5px_30px_rgba(133,90,243,0.15)]' 
                    : 'border-[hsl(var(--secondary-purple))]/20'
                } p-4 md:p-6 cursor-pointer`}
                onClick={() => setActiveEvent(index)}
              >
                <h3 className="font-philosopher text-xl font-bold text-white mb-2">
                  {event.event}
                </h3>
                <div className="text-xs text-[hsl(var(--accent))] font-medium mb-3">
                  {event.year}
                </div>
                <p className="text-sm opacity-80 mb-3">
                  {event.description}
                </p>
                <div className={`text-sm border-t border-[hsl(var(--secondary-purple))]/20 pt-3 mt-3 transition-all duration-500 ${
                  activeEvent === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  <strong className="text-[hsl(var(--accent))] text-xs">Historical Significance:</strong>
                  <p className="mt-1 opacity-90">{event.significance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}