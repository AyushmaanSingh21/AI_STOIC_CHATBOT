export default function PrinciplesSection() {
  const principles = [
    {
      title: "Virtue",
      description: "The highest good and the only true path to happiness lies in living virtuously: with wisdom, courage, justice, and temperance."
    },
    {
      title: "Control",
      description: "Distinguish between what you can control (your judgments and actions) and what you cannot (external events)."
    },
    {
      title: "Acceptance",
      description: "Accept what happens with equanimity. Nothing happens to the wise person contrary to their expectations."
    },
    {
      title: "Present Moment",
      description: "Live in the present moment, neither anxious about the future nor regretful about the past."
    }
  ];

  return (
    <section id="principles" className="max-w-3xl mx-auto mt-12 bg-primary/20 backdrop-blur-md rounded-2xl border border-[hsl(var(--secondary-purple))]/30 p-8 shadow-xl">
      <h2 className="font-philosopher text-3xl font-bold text-[hsl(var(--accent))] mb-6">Key Stoic Principles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <div key={index} className="bg-[hsl(var(--background-dark))]/40 rounded-xl p-5 border border-[hsl(var(--secondary-purple))]/20">
            <h3 className="font-philosopher text-xl font-semibold text-[hsl(var(--accent))] mb-2">{principle.title}</h3>
            <p className="opacity-80">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
