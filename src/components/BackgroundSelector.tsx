import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface BackgroundSelectorProps {
  onBackgroundChange: (background: string) => void;
  currentBackground: string;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  onBackgroundChange,
  currentBackground
}) => {
  const backgrounds = [
    { id: "mountains", name: "Mountains", image: "/backgrounds/mountains.jpg" },
    { id: "forest", name: "Forest", image: "/backgrounds/forest.jpg" },
    { id: "beach", name: "Beach", image: "/backgrounds/beach.jpg" },
    { id: "cityscape", name: "Cityscape", image: "/backgrounds/cityscape.jpg" }
  ];

  return (
    <div className="absolute top-4 right-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/30"
          >
            <Settings className="h-5 w-5 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {backgrounds.map((bg) => (
            <DropdownMenuItem
              key={bg.id}
              onClick={() => onBackgroundChange(bg.id)}
              className={`flex items-center gap-2 cursor-pointer ${
                currentBackground === bg.id ? "bg-secondary" : ""
              }`}
            >
              <img
                src={bg.image}
                alt={bg.name}
                className="w-10 h-6 object-cover rounded-sm"
              />
              <span>{bg.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BackgroundSelector;
