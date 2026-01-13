import { MapPin } from "lucide-react";
import PlaceCard from "./PlaceCard";

interface Place {
  name: string;
  category: string;
  rating: number;
  averageCost: number;
  area: string;
}

interface ResultsGridProps {
  results: Place[];
  isLoading?: boolean;
}

const ResultsGrid = ({ results, isLoading = false }: ResultsGridProps) => {
  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Finding Places...
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="card-elevated rounded-xl border border-border p-5 animate-pulse"
            >
              <div className="h-5 bg-secondary rounded w-3/4 mb-3" />
              <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
              <div className="h-px bg-border mb-4" />
              <div className="flex justify-between">
                <div className="h-7 bg-secondary rounded w-16" />
                <div className="h-4 bg-secondary rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
          <MapPin className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No places found yet
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Select your mood and enter a location to discover places that match how you're feeling.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Recommended Places
          </h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((place, index) => (
          <PlaceCard
            key={`${place.name}-${index}`}
            name={place.name}
            category={place.category}
            rating={place.rating}
            averageCost={place.averageCost}
            area={place.area}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
