import { useState, useEffect, useCallback } from "react";
import { Compass } from "lucide-react";
import ControlPanel from "@/components/ControlPanel";
import ResultsGrid from "@/components/ResultsGrid";
import CursorGlitter from "@/components/CursorGlitter";

const Index = () => {
  const [mood, setMood] = useState("");
  const [area, setArea] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ✅ REAL BACKEND API CALL (WITH CATEGORY FILTERS)
  const handleSearch = async () => {
    if (!mood || !area) return;

    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        mood,
        area,
        categories: selectedCategories.join(","),
      });

      const response = await fetch(
        `http://127.0.0.1:8000/recommend?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cursor glitter effect */}
      <CursorGlitter />

      {/* Cursor-following glow effects */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(45 95% 55% / 0.12), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-100 ease-out"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(50 90% 50% / 0.18), transparent 35%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-75 ease-out"
        style={{
          background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(45 100% 60% / 0.15), transparent 50%)`,
        }}
      />

      {/* Static background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-0" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 pulse-glow">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Mood</span>
            <span className="text-gradient">Space</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover places that match your mood. Smart recommendations tailored to how you feel.
          </p>
        </header>

        {/* Control Panel */}
        <section className="mb-12">
          <ControlPanel
            mood={mood}
            setMood={setMood}
            area={area}
            setArea={setArea}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </section>

        {/* Results */}
        <section>
          <ResultsGrid results={results} isLoading={isLoading} />
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            MoodSpace © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
