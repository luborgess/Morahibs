import React, { useState, useEffect } from "react";
import PartnerStoresBanner from "./marketplace/PartnerStoresBanner";
import CreateStoreDialog from "./store/CreateStoreDialog";
import NewItemDialog, { NewItemData } from "./marketplace/NewItemDialog";
import CategoryCarousel from "./marketplace/CategoryCarousel";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import ItemGrid from "./marketplace/ItemGrid";
import FloatingActionButton from "./marketplace/FloatingActionButton";

interface HomeProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
  onSort?: (sortBy: string) => void;
  onNewItem?: () => void;
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

const Home = ({
  onSearch = () => {},
  onFilter = () => {},
  onSort = () => {},
  onNewItem = () => {},
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
}: HomeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [isCreateStoreDialogOpen, setIsCreateStoreDialogOpen] = useState(false);

  const handleNewItem = (data: NewItemData) => {
    console.log("New item data:", data);
    // Here you would typically upload the image and save the item data
  };

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <MarketplaceHeader
        onSearch={onSearch}
        onFilter={onFilter}
        onSort={onSort}
      />
      <PartnerStoresBanner />
      <main className="container mx-auto py-6 px-4">
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ItemGrid items={items} isInitialLoading={isLoading} />
      </main>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <FloatingActionButton
          onClick={() => setIsCreateStoreDialogOpen(true)}
          label="Criar Loja"
          icon="Store"
        />
        <FloatingActionButton
          onClick={() => setIsNewItemDialogOpen(true)}
          label="Novo Anúncio"
          icon="Plus"
        />
      </div>
      <CreateStoreDialog
        open={isCreateStoreDialogOpen}
        onOpenChange={setIsCreateStoreDialogOpen}
      />
      <NewItemDialog
        open={isNewItemDialogOpen}
        onOpenChange={setIsNewItemDialogOpen}
        onSubmit={handleNewItem}
      />
    </div>
  );
};

export default Home;
