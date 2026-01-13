import { useState, useRef, MouseEvent } from "react";
import { Star, DollarSign, Tag, ExternalLink } from "lucide-react";

interface PlaceCardProps {
  name: string;
  category: string;
  rating: number;
  averageCost: number;
  area: string;
  index?: number;
}

const PlaceCard = ({
  name,
  category,
  rating,
  averageCost,
  area,
  index = 0,
}: PlaceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const getCostIndicator = (cost: number) => {
    if (cost <= 20) return { count: 1, label: "Budget" };
    if (cost <= 50) return { count: 2, label: "Moderate" };
    if (cost <= 100) return { count: 3, label: "Upscale" };
    return { count: 4, label: "Premium" };
  };

  const costInfo = getCostIndicator(averageCost);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);

    const rotateX = (mouseY / (rect.height / 2)) * -12;
    const rotateY = (mouseX / (rect.width / 2)) * 12;

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    );
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleClick = () => {
    const query = `${name} ${area} Bangalore`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      title="Click to view on Google Maps"
      className="group relative card-elevated rounded-xl border border-border p-5 animate-slide-up cursor-pointer overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glare */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, hsl(180 60% 70% / 0.15), transparent 50%)`,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px hsl(180 60% 50% / 0.3), 0 0 20px -5px hsl(180 60% 50% / 0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{category}</span>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="h-px bg-border mb-4 group-hover:bg-primary/20 transition-colors" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 bg-primary/10 rounded-md px-2.5 py-1">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">
              {rating.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[...Array(4)].map((_, i) => (
              <DollarSign
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < costInfo.count
                    ? "text-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          📍 {area} • Avg cost ₹{averageCost}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
