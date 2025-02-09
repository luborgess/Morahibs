import React, { useEffect, useRef, useCallback } from "react";
import ItemCard from "./ItemCard";
import ItemCardSkeleton from "./ItemCardSkeleton";
import { Loader2 } from "lucide-react";

interface ItemGridProps {
  isInitialLoading?: boolean;
  items?: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
    seller: {
      name: string;
      avatar: string;
    };
    likes: number;
    messages: number;
  }>;
}

import { useState } from "react";

const ItemGrid = ({
  isInitialLoading = false,
  items = [
    {
      id: "1",
      title: "Vintage Camera",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      condition: "Good",
      seller: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      likes: 12,
      messages: 3,
    },
    {
      id: "2",
      title: "Mechanical Keyboard",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6",
      condition: "New",
      seller: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      likes: 8,
      messages: 5,
    },
    {
      id: "3",
      title: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      condition: "Like New",
      seller: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      likes: 15,
      messages: 7,
    },
    {
      id: "4",
      title: "Tablet Stand",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      condition: "Good",
      seller: {
        name: "Sarah Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      likes: 6,
      messages: 2,
    },
  ],
}: ItemGridProps) => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [itemsState, setItemsState] = useState(items.slice(0, 7)); // Initially show 7 items
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startIndex = page * 7;
    const endIndex = startIndex + 7;
    const newItems = Array.from({ length: 7 }, (_, i) => ({
      id: `${startIndex + i + 1}`,
      title: `New Item ${startIndex + i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}`,
      condition: ["New", "Like New", "Good", "Fair", "Poor"][
        Math.floor(Math.random() * 5)
      ] as "New" | "Like New" | "Good" | "Fair" | "Poor",
      seller: {
        name: `Seller ${startIndex + i + 1}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${startIndex + i + 1}`,
      },
      likes: Math.floor(Math.random() * 20),
      messages: Math.floor(Math.random() * 10),
    }));

    setItemsState((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setHasMore(itemsState.length < 100); // Stop loading after 100 items
    setIsLoading(false);
  }, [page, isLoading, hasMore, itemsState.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 },
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreItems]);

  const handleLike = (id: string) => {
    setLikedItems((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });

    setItemsState((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: likedItems.has(id) ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      }),
    );
  };

  const handleMessage = (id: string) => {
    console.log(`Opening chat for item ${id}`);
  };

  return (
    <div className="w-full min-h-[850px] bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {isInitialLoading
          ? [...Array(7)].map((_, index) => (
              <ItemCardSkeleton key={`skeleton-${index}`} />
            ))
          : itemsState.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                condition={item.condition}
                seller={item.seller}
                likes={item.likes}
                messages={item.messages}
                onLike={handleLike}
                onMessage={handleMessage}
                isLiked={likedItems.has(item.id)}
              />
            ))}
      </div>
      {(isLoading || hasMore) && (
        <div
          ref={loaderRef}
          className="col-span-full flex justify-center items-center p-4"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading more items...</span>
            </div>
          ) : (
            <div className="h-10" /> // Spacer for intersection observer
          )}
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
