import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Cafe",
  "Restaurant",
  "Park",
  "Temple",
  "Bar",
  "Brewery",
  "Museum",
  "Bookstore",
  "View Point",
  "Forest",
  "Theatre",
];

interface ControlPanelProps {
  mood: string;
  setMood: (mood: string) => void;
  area: string;
  setArea: (area: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

const moods = [
  { value: "happy", label: "😊 Happy" },
  { value: "relaxed", label: "😌 Relaxed" },
  { value: "adventurous", label: "🎯 Adventurous" },
  { value: "romantic", label: "💕 Romantic" },
  { value: "focused", label: "🎯 Focused" },
  { value: "social", label: "🎉 Social" },
];

const ControlPanel = ({
  mood,
  setMood,
  area,
  setArea,
  selectedCategories,          // ✅ FIX
  setSelectedCategories,       // ✅ FIX
  onSearch,
  isLoading = false,
}: ControlPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Find Your Space
          </h2>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mood Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              How are you feeling?
            </label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger>
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Where are you looking?
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter city or neighborhood"
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Categories
            </label>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      setSelectedCategories(
                        selectedCategories.includes(category)
                          ? selectedCategories.filter((c) => c !== category)
                          : [...selectedCategories, category]
                      )
                    }
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-4">
            <Button
              onClick={onSearch}
              disabled={isLoading}
              variant="default"   // safer than glow for now
              className="w-full"
              size="lg"
            >
              {isLoading ? "Finding..." : "Find Places"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
