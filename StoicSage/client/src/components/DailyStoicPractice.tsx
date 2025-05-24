import { useState } from 'react';
import { Button } from "@/components/ui/button";

const practices = [
  {
    title: "Morning Reflection",
    description: "Start your day by contemplating what challenges you might face and how a wise person would respond to them.",
    exercise: "Take 5 minutes in the morning to write down potential challenges for the day and how you plan to respond virtuously.",
    icon: "☀️"
  },
  {
    title: "Negative Visualization",
    description: "Imagine losing something you value to appreciate it more deeply while reducing fear of loss.",
    exercise: "Consider what it would be like to lose something you value—your health, a relationship, or material possessions. This practice helps you appreciate what you have.",
    icon: "🔄"
  },
  {
    title: "View From Above",
    description: "Gain perspective by imagining viewing your life and concerns from high above.",
    exercise: "Imagine floating above your current situation, seeing yourself and your concerns from increasingly greater heights. Notice how your problems appear smaller from this perspective.",
    icon: "🌎"
  },
  {
    title: "Mindfulness of the Present Moment",
    description: "Focus completely on the present task without distraction.",
    exercise: "For 10 minutes, focus entirely on what you're doing right now. If your mind wanders, gently bring it back to the present activity.",
    icon: "⏱️"
  },
  {
    title: "Evening Review",
    description: "Reflect on your day without judgment, considering what went well and what could be improved.",
    exercise: "Before sleep, reflect on your day: What did I do well? Where did I fail? What could I do better tomorrow?",
    icon: "🌙"
  },
  {
    title: "Voluntary Discomfort",
    description: "Intentionally experience mild discomfort to build resilience.",
    exercise: "Choose a small comfort to go without for a day (like a hot shower, coffee, or social media). Notice your reactions and build resilience.",
    icon: "💪"
  },
  {
    title: "Memento Mori",
    description: "Remember your mortality to prioritize what truly matters.",
    exercise: "Take 5 minutes to contemplate your finite time. Ask yourself: 'If I had one year left to live, how would I spend today?'",
    icon: "⏳"
  }
];

export default function DailyStoicPractice() {
  const [currentPractice, setCurrentPractice] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);

  const nextPractice = () => {
    setCurrentPractice((prev) => (prev + 1) % practices.length);
    setExpanded(false);
  };

  const previousPractice = () => {
    setCurrentPractice((prev) => (prev - 1 + practices.length) % practices.length);
    setExpanded(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const practice = practices[currentPractice];

  return (
    <section id="practice" className="max-w-3xl mx-auto mt-16">
      <h2 className="font-philosopher text-3xl font-bold text-center text-[hsl(var(--accent))] mb-8">
        Daily Stoic Practice
      </h2>
      
      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-[hsl(var(--secondary-purple))]/30 overflow-hidden shadow-xl">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center text-4xl mb-4">
            <span role="img" aria-label="practice icon" className="animate-pulse">
              {practice.icon}
            </span>
          </div>
          
          <h3 className="font-philosopher text-2xl font-bold text-center text-white mb-3">
            {practice.title}
          </h3>
          
          <p className="text-center opacity-90 mb-4">
            {practice.description}
          </p>
          
          <div 
            className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="bg-[hsl(var(--background-dark))]/50 rounded-xl p-4 border border-[hsl(var(--secondary-purple))]/20">
              <h4 className="font-philosopher text-lg font-bold mb-2 text-[hsl(var(--accent))]">
                Today's Exercise:
              </h4>
              <p>{practice.exercise}</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button
              onClick={toggleExpanded}
              variant="outline"
              className="border-[hsl(var(--secondary-purple))]/50 bg-black/20 hover:bg-[hsl(var(--primary))]/20 text-white hover:text-[hsl(var(--accent))]"
            >
              {expanded ? 'Hide Exercise' : 'Show Exercise'}
            </Button>
          </div>
        </div>
        
        <div className="flex border-t border-[hsl(var(--secondary-purple))]/30">
          <button 
            onClick={previousPractice}
            className="flex-1 py-4 text-center text-sm hover:bg-[hsl(var(--primary))]/20 transition-colors"
          >
            Previous Practice
          </button>
          <div className="w-px bg-[hsl(var(--secondary-purple))]/30"></div>
          <button 
            onClick={nextPractice}
            className="flex-1 py-4 text-center text-sm hover:bg-[hsl(var(--primary))]/20 transition-colors"
          >
            Next Practice
          </button>
        </div>
      </div>
    </section>
  );
}