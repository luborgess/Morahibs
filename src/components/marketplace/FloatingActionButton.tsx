import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  label?: string;
}

const FloatingActionButton = ({
  onClick = () => console.log("New item button clicked"),
  label = "Post New Item",
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 p-0 backdrop-blur-sm"
      size="icon"
      aria-label={label}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
