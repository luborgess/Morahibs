import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Laptop,
  Shirt,
  Book,
  Sofa,
  Car,
  Gamepad,
  Camera,
  Headphones,
  Watch,
  Smartphone,
  LucideIcon,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface CategoryCarouselProps {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
}

const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: Laptop },
  { id: "clothing", name: "Clothing", icon: Shirt },
  { id: "books", name: "Books", icon: Book },
  { id: "furniture", name: "Furniture", icon: Sofa },
  { id: "vehicles", name: "Vehicles", icon: Car },
  { id: "gaming", name: "Gaming", icon: Gamepad },
  { id: "cameras", name: "Cameras", icon: Camera },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "watches", name: "Watches", icon: Watch },
  { id: "phones", name: "Phones", icon: Smartphone },
];

export default function CategoryCarousel({
  selectedCategory = "all",
  onSelectCategory,
}: CategoryCarouselProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-lg pb-4">
      <div className="flex w-max space-x-4 p-4">
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:bg-gray-100",
            selectedCategory === "all" &&
              "bg-black text-white hover:bg-gray-900",
          )}
          onClick={() => onSelectCategory("all")}
        >
          All Categories
        </Button>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant="outline"
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:bg-gray-100",
                selectedCategory === category.id &&
                  "bg-black text-white hover:bg-gray-900",
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}
