import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // This would come from your API/database
  const product = {
    id,
    title: "Vintage Camera",
    price: 299.99,
    description:
      "Professional vintage camera in excellent condition. Perfect for photography enthusiasts and collectors. Includes original leather case and manual.",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    seller: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      rating: 4.8,
      memberSince: "2023",
    },
    likes: 12,
    messages: 3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back button and actions */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-gray-100 ${isLiked ? "text-red-500" : ""}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <img
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {product.title}
              </h1>
              <Badge
                variant="secondary"
                className="mt-2 bg-white/80 backdrop-blur-sm text-black font-medium"
              >
                {product.condition}
              </Badge>
            </div>
            <span className="text-3xl font-semibold tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Seller info */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller.avatar} />
                  <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{product.seller.name}</h3>
                  <p className="text-sm text-gray-500">
                    Member since {product.seller.memberSince} ·{" "}
                    {product.seller.rating} ★
                  </p>
                </div>
              </div>
              <Button className="bg-black hover:bg-gray-900 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
