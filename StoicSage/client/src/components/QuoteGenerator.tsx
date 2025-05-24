import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const quotes = [
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    text: "He who fears death will never do anything worthy of a man who is alive.",
    author: "Seneca"
  },
  {
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus"
  },
  {
    text: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus"
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius"
  },
  {
    text: "How long are you going to wait before you demand the best for yourself?",
    author: "Epictetus"
  },
  {
    text: "If it is not right, do not do it, if it is not true, do not say it.",
    author: "Marcus Aurelius"
  },
  {
    text: "You become what you give your attention to.",
    author: "Epictetus"
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca"
  },
  {
    text: "The chief task in life is simply this: to identify and separate matters so that I can say clearly to myself which are externals not under my control, and which have to do with the choices I actually control.",
    author: "Epictetus"
  },
  {
    text: "The happiness of those who want to be popular depends on others; the happiness of those who seek pleasure fluctuates with moods outside their control; but the happiness of the wise grows out of their own free acts.",
    author: "Marcus Aurelius"
  },
  {
    text: "If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, 'He was ignorant of my other faults, else he would have not mentioned these alone.'",
    author: "Epictetus"
  },
  {
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus"
  }
];

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState<typeof quotes[0]>(quotes[0]);
  const [fadeIn, setFadeIn] = useState(true);

  const getRandomQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setFadeIn(true);
    }, 500);
  };

  useEffect(() => {
    // Set a random quote on initial render
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return (
    <section className="max-w-3xl mx-auto mt-16">
      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-[hsl(var(--secondary-purple))]/30 overflow-hidden p-8 shadow-xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent opacity-50"></div>
        
        <h2 className="font-philosopher text-2xl md:text-3xl font-bold text-[hsl(var(--accent))] mb-4 text-center">
          Daily Stoic Wisdom
        </h2>
        
        <div className={`min-h-[150px] flex flex-col justify-center items-center transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <blockquote className="italic text-lg md:text-xl text-center mb-4">
            "{currentQuote.text}"
          </blockquote>
          
          <cite className="text-[hsl(var(--accent))] font-medium text-right block w-full pr-4">
            — {currentQuote.author}
          </cite>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={getRandomQuote}
            variant="outline"
            className="border-[hsl(var(--secondary-purple))]/50 bg-black/20 hover:bg-[hsl(var(--primary))]/20 text-white hover:text-[hsl(var(--accent))]"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>
    </section>
  );
}