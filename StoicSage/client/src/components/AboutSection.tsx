export default function AboutSection() {
  return (
    <section id="about" className="max-w-3xl mx-auto mt-20 bg-primary/20 backdrop-blur-md rounded-2xl border border-[hsl(var(--secondary-purple))]/30 p-8 shadow-xl">
      <h2 className="font-philosopher text-3xl font-bold text-[hsl(var(--accent))] mb-6">About StoicBot</h2>
      
      <div className="space-y-6">
        <p>
          StoicBot is powered by a machine learning model trained on the works of great Stoic philosophers including Marcus Aurelius, Epictetus, and Seneca. It helps users explore Stoic philosophy through natural conversation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[hsl(var(--background-dark))]/40 rounded-xl p-5 border border-[hsl(var(--secondary-purple))]/20">
            <h3 className="font-philosopher text-xl font-semibold text-[hsl(var(--accent))] mb-2">Learn Stoicism</h3>
            <p className="opacity-80">Discover the principles and practical wisdom of Stoic philosophy through guided conversation.</p>
          </div>
          
          <div className="bg-[hsl(var(--background-dark))]/40 rounded-xl p-5 border border-[hsl(var(--secondary-purple))]/20">
            <h3 className="font-philosopher text-xl font-semibold text-[hsl(var(--accent))] mb-2">Apply to Modern Life</h3>
            <p className="opacity-80">Get insights on how to apply ancient Stoic teachings to contemporary challenges and situations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
