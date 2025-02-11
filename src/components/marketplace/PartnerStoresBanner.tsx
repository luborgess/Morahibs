import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Store = Database["public"]["Tables"]["lojas"]["Row"];

export default function PartnerStoresBanner() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      const { data, error } = await supabase
        .from("lojas")
        .select("*")
        .eq("status", "ATIVA")
        .limit(10);

      if (!error && data) {
        setStores(data);
      }
      setLoading(false);
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-24 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-start gap-6 h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 animate-pulse"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="w-16 h-2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-24 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <ScrollArea className="w-full h-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center gap-6 h-full w-max py-2">
            {stores.map((store) => (
              <a
                key={store.id}
                href={`/store/${store.slug}`}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-105"
              >
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={store.url_logo as string}
                    alt={store.nome_comercial}
                  />
                  <AvatarFallback>{store.nome_comercial[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  {store.nome_comercial}
                </span>
              </a>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
