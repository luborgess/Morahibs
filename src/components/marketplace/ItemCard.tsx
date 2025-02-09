import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface ItemCardProps {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  condition?: "New" | "Like New" | "Good" | "Fair" | "Poor";
  seller?: {
    name: string;
    avatar: string;
  };
  likes?: number;
  messages?: number;
  onLike?: (id: string) => void;
  onMessage?: (id: string) => void;
  isLiked?: boolean;
}

const ItemCard = ({
  id = "1",
  title = "Vintage Camera",
  price = 299.99,
  image = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  condition = "Good",
  seller = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  likes = 12,
  messages = 3,
  onLike = () => {},
  onMessage = () => {},
  isLiked = false,
}: ItemCardProps) => {
  const handleClick = () => {
    window.location.href = `/product/${id}`;
  };

  return (
    <Card
      className="w-full max-w-[350px] h-[400px] overflow-hidden backdrop-blur-xl bg-white/80 hover:bg-white/90 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer rounded-2xl"
      onClick={handleClick}
    >
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105 rounded-t-xl"
        />
        <Badge
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-black font-medium text-xs px-3 py-1.5 rounded-full shadow-sm"
          variant="secondary"
        >
          {condition}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg truncate tracking-tight">
            {title}
          </h3>
          <span className="font-semibold text-lg tracking-tight">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={seller.avatar} />
            <AvatarFallback>{seller.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 hover:underline cursor-pointer">
            {seller.name}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(id);
          }}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onMessage(id);
          }}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{messages}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
