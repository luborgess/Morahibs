import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Share2, MessageSquare } from "lucide-react";
import ItemGrid from "../marketplace/ItemGrid";

type Store = Database["public"]["Tables"]["lojas"]["Row"];
type User = Database["public"]["Tables"]["usuarios"]["Row"];

export default function StorePage() {
  const { slug } = useParams<{ slug: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      if (!slug) return;

      // Fetch store data
      const { data: storeData, error: storeError } = await supabase
        .from("lojas")
        .select("*")
        .eq("slug", slug)
        .eq("status", "ATIVA")
        .single();

      if (storeError) {
        console.error("Error fetching store:", storeError);
        setLoading(false);
        return;
      }

      if (!storeData) {
        setLoading(false);
        return;
      }

      setStore(storeData);

      // Fetch store owner data
      const { data: ownerData } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", storeData.usuario_id)
        .single();

      if (ownerData) {
        setOwner(ownerData);
      }

      // Fetch store items
      const { data: itemsData } = await supabase
        .from("anuncios")
        .select("*")
        .eq("loja_id", storeData.id)
        .eq("status", "ATIVA")
        .order("criado_em", { ascending: false });

      if (itemsData) {
        setItems(itemsData);
      }

      setLoading(false);
    };

    fetchStore();
  }, [slug]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: store?.nome_comercial,
        text: store?.descricao,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleWhatsApp = () => {
    if (!store?.msg_whatsapp) return;
    const message = encodeURIComponent(store.msg_whatsapp);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="container mx-auto px-4 -mt-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-300" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-300 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loja não encontrada</h1>
          <p className="text-gray-500">Esta loja não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      {/* Banner */}
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${store.banner_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8"})`,
        }}
      />

      {/* Store Info */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                <AvatarImage src={store.url_logo as string} />
                <AvatarFallback>{store.nome_comercial[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{store.nome_comercial}</h1>
                <p className="text-gray-500">{owner?.nome}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={handleWhatsApp}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button className="w-full md:w-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Mensagem
              </Button>
            </div>
          </div>

          {store.descricao && (
            <p className="mt-4 text-gray-600">{store.descricao}</p>
          )}
        </div>

        {/* Store Content */}
        <div className="mt-6">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="w-full justify-start bg-white border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="items"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-3"
              >
                Produtos
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-3"
              >
                Sobre
              </TabsTrigger>
            </TabsList>
            <TabsContent value="items" className="mt-6">
              <ItemGrid items={items} />
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Sobre a Loja</h2>
                <div className="space-y-4">
                  <p>{store.descricao || "Nenhuma descrição disponível."}</p>
                  <div>
                    <h3 className="font-medium">Contato</h3>
                    <p className="text-gray-600">{owner?.email}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
