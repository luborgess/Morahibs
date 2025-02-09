import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MarketplaceHeaderProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: FilterOptions) => void;
  onSort?: (sortBy: string) => void;
}

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  condition: string;
}

const MarketplaceHeader = ({
  onSearch = () => {},
  onFilter = () => {},
  onSort = () => {},
}: MarketplaceHeaderProps) => {
  return (
    <header className="w-full h-16 px-4 md:px-6 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between gap-4 sticky top-0 z-50">
      <div className="flex-1 max-w-2xl flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            className="pl-10 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  onValueChange={(value) =>
                    onFilter({
                      category: value,
                      priceRange: [0, 1000],
                      condition: "any",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  className="my-6"
                  onValueChange={(value) =>
                    onFilter({
                      category: "all",
                      priceRange: value as [number, number],
                      condition: "any",
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select
                  onValueChange={(value) =>
                    onFilter({
                      category: "all",
                      priceRange: [0, 1000],
                      condition: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Condition</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Select onValueChange={onSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
};

export default MarketplaceHeader;
