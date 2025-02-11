import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  nome_comercial: z
    .string()
    .min(2, "Nome muito curto")
    .max(50, "Nome muito longo"),
  slug: z.string().min(2, "Slug muito curto").max(50, "Slug muito longo"),
  descricao: z.string().max(500, "Descrição muito longa").optional(),
  msg_whatsapp: z.string().max(500, "Mensagem muito longa").optional(),
});

interface CreateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateStoreDialog({
  open,
  onOpenChange,
}: CreateStoreDialogProps) {
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_comercial: "",
      slug: "",
      descricao: "",
      msg_whatsapp: "Olá! Vi seu produto no MoraHub e gostaria de saber mais.",
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "logo") {
        setLogoFile(file);
      } else {
        setBannerFile(file);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "logo") {
          setLogoPreview(reader.result as string);
        } else {
          setBannerPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Upload logo if exists
      let logoUrl = null;
      if (logoFile) {
        const { data: logoData, error: logoError } = await supabase.storage
          .from("store-images")
          .upload(`logos/${user.id}/${values.slug}`, logoFile);
        if (logoError) throw logoError;
        logoUrl = logoData.path;
      }

      // Upload banner if exists
      let bannerUrl = null;
      if (bannerFile) {
        const { data: bannerData, error: bannerError } = await supabase.storage
          .from("store-images")
          .upload(`banners/${user.id}/${values.slug}`, bannerFile);
        if (bannerError) throw bannerError;
        bannerUrl = bannerData.path;
      }

      // Create store
      const { error: storeError } = await supabase.from("lojas").insert({
        nome_comercial: values.nome_comercial,
        slug: values.slug,
        descricao: values.descricao,
        msg_whatsapp: values.msg_whatsapp,
        url_logo: logoUrl,
        banner_url: bannerUrl,
        usuario_id: user.id,
        status: "ATIVA",
      });

      if (storeError) throw storeError;

      toast({
        title: "Loja criada com sucesso!",
        description: "Sua loja já está disponível para todos.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating store:", error);
      toast({
        title: "Erro ao criar loja",
        description: "Ocorreu um erro ao criar sua loja. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Loja</DialogTitle>
          <DialogDescription>
            Crie sua loja para começar a vender seus produtos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Logo Upload */}
            <FormItem>
              <FormLabel>Logo da Loja</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <div className="relative h-32 w-32 border-2 border-dashed rounded-full flex items-center justify-center bg-muted/20">
                    {logoPreview ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, "logo")}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload uma imagem para ser a logo da sua loja.
              </FormDescription>
            </FormItem>

            {/* Banner Upload */}
            <FormItem>
              <FormLabel>Banner da Loja</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <div className="relative w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/20">
                    {bannerPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setBannerFile(null);
                            setBannerPreview("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, "banner")}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload uma imagem para ser o banner da sua loja.
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="nome_comercial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Loja</FormLabel>
                  <FormControl>
                    <Input placeholder="Minha Loja" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este é o nome que será exibido para os clientes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Loja</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        morahub.com/
                      </span>
                      <Input placeholder="minha-loja" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Este será o endereço da sua loja. Use apenas letras
                    minúsculas, números e hífens.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua loja em poucas palavras..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição da sua loja e dos produtos que você
                    vende.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="msg_whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem padrão do WhatsApp</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mensagem que será enviada quando um cliente clicar em 'Contatar'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta mensagem será usada como template quando alguém quiser
                    entrar em contato pelo WhatsApp.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Criar Loja
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
