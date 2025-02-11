import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Store, LucideIcon } from "lucide-react";

const icons = {
  Plus,
  Store,
} as const;

interface FloatingActionButtonProps {
  onClick?: () => void;
  label?: string;
  icon?: keyof typeof icons;
}

const FloatingActionButton = ({
  onClick = () => console.log("New item button clicked"),
  label = "Post New Item",
  icon = "Plus",
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-black hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 p-0 backdrop-blur-sm"
      size="icon"
      aria-label={label}
    >
      {React.createElement(icons[icon], { className: "h-6 w-6" })}
    </Button>
  );
};

export default FloatingActionButton;
