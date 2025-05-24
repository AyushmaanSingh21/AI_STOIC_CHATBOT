import { Helmet } from "react-helmet";
import ParallaxBackground from "@/components/ParallaxBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import StoicPhilosophers from "@/components/StoicPhilosophers";
import QuoteGenerator from "@/components/QuoteGenerator";
import DailyStoicPractice from "@/components/DailyStoicPractice";
import BookRecommendations from "@/components/BookRecommendations";
import InteractiveTimeline from "@/components/InteractiveTimeline";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>StoicBot - Ancient Wisdom for Modern Times</title>
        <meta
          name="description"
          content="StoicBot is an AI assistant trained on Stoic philosophy. Ask questions about virtue, resilience, and finding tranquility in a chaotic world."
        />
        <meta
          property="og:title"
          content="StoicBot - Ancient Wisdom for Modern Times"
        />
        <meta
          property="og:description"
          content="Explore stoic philosophy through conversation with an AI assistant trained on the works of Marcus Aurelius, Epictetus, and Seneca."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <ParallaxBackground />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="relative z-10 pt-8 pb-20 px-4 flex-grow">
          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-philosopher text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-[hsl(var(--accent))]">Stoic</span>Bot
            </h1>
            <h2 className="font-philosopher text-3xl md:text-4xl font-bold text-[hsl(var(--accent))] mb-4 leading-tight">
              Ancient Wisdom for Modern Challenges
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Explore stoic philosophy through conversation. Ask questions about
              life, resilience, virtue, and finding peace in a chaotic world.
            </p>
          </section>

          {/* Quote Generator Section */}
          <QuoteGenerator />

          {/* Stoic Philosophers Section */}
          <StoicPhilosophers />

          {/* Daily Practice Section */}
          <DailyStoicPractice />

          {/* Book Recommendations Section */}
          <BookRecommendations />

          {/* Interactive Timeline Section */}
          <InteractiveTimeline />

          <AboutSection />
          <PrinciplesSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
