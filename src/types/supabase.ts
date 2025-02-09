export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anuncios: {
        Row: {
          atualizado_em: string | null
          condicao: Database["public"]["Enums"]["condicao_listagem"]
          criado_em: string | null
          descricao: string | null
          disponibilidade: string | null
          excluido_em: string | null
          id: string
          imagens: Json | null
          loja_id: string | null
          preco: number | null
          status: Database["public"]["Enums"]["status_listagem"] | null
          subcategoria_id: string | null
          tipo: Database["public"]["Enums"]["tipo_listagem"]
          titulo: string
          vendido: boolean | null
          visualizacoes: number | null
        }
        Insert: {
          atualizado_em?: string | null
          condicao: Database["public"]["Enums"]["condicao_listagem"]
          criado_em?: string | null
          descricao?: string | null
          disponibilidade?: string | null
          excluido_em?: string | null
          id?: string
          imagens?: Json | null
          loja_id?: string | null
          preco?: number | null
          status?: Database["public"]["Enums"]["status_listagem"] | null
          subcategoria_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_listagem"]
          titulo: string
          vendido?: boolean | null
          visualizacoes?: number | null
        }
        Update: {
          atualizado_em?: string | null
          condicao?: Database["public"]["Enums"]["condicao_listagem"]
          criado_em?: string | null
          descricao?: string | null
          disponibilidade?: string | null
          excluido_em?: string | null
          id?: string
          imagens?: Json | null
          loja_id?: string | null
          preco?: number | null
          status?: Database["public"]["Enums"]["status_listagem"] | null
          subcategoria_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_listagem"]
          titulo?: string
          vendido?: boolean | null
          visualizacoes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "anuncios_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_subcategoria_id_fkey"
            columns: ["subcategoria_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          ativo: boolean
          atualizado_em: string | null
          criado_em: string | null
          descricao: string
          id: string
          ordem: number
          titulo: string
          url_imagem: string
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string | null
          criado_em?: string | null
          descricao: string
          id?: string
          ordem: number
          titulo: string
          url_imagem: string
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string | null
          criado_em?: string | null
          descricao?: string
          id?: string
          ordem?: number
          titulo?: string
          url_imagem?: string
        }
        Relationships: []
      }
      categorias: {
        Row: {
          ativo: boolean | null
          descricao: string | null
          ico: string | null
          id: string
          meta_descricao: string | null
          meta_titulo: string | null
          nome: string
          ordem: number | null
          palavras_chave: string[] | null
          slug: string
          tipo: Database["public"]["Enums"]["tipo_categoria"] | null
        }
        Insert: {
          ativo?: boolean | null
          descricao?: string | null
          ico?: string | null
          id?: string
          meta_descricao?: string | null
          meta_titulo?: string | null
          nome: string
          ordem?: number | null
          palavras_chave?: string[] | null
          slug: string
          tipo?: Database["public"]["Enums"]["tipo_categoria"] | null
        }
        Update: {
          ativo?: boolean | null
          descricao?: string | null
          ico?: string | null
          id?: string
          meta_descricao?: string | null
          meta_titulo?: string | null
          nome?: string
          ordem?: number | null
          palavras_chave?: string[] | null
          slug?: string
          tipo?: Database["public"]["Enums"]["tipo_categoria"] | null
        }
        Relationships: []
      }
      favoritos: {
        Row: {
          anuncio_id: string
          criado_em: string | null
          id: string
          usuario_id: string
        }
        Insert: {
          anuncio_id: string
          criado_em?: string | null
          id?: string
          usuario_id: string
        }
        Update: {
          anuncio_id?: string
          criado_em?: string | null
          id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      lojas: {
        Row: {
          atualizado_em: string | null
          banner_url: Json | null
          criado_em: string | null
          descricao: string | null
          excluido_em: string | null
          id: string
          msg_whatsapp: string | null
          nome_comercial: string
          slug: string
          status: Database["public"]["Enums"]["status_listagem"] | null
          url_logo: Json | null
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string | null
          banner_url?: Json | null
          criado_em?: string | null
          descricao?: string | null
          excluido_em?: string | null
          id?: string
          msg_whatsapp?: string | null
          nome_comercial: string
          slug: string
          status?: Database["public"]["Enums"]["status_listagem"] | null
          url_logo?: Json | null
          usuario_id: string
        }
        Update: {
          atualizado_em?: string | null
          banner_url?: Json | null
          criado_em?: string | null
          descricao?: string | null
          excluido_em?: string | null
          id?: string
          msg_whatsapp?: string | null
          nome_comercial?: string
          slug?: string
          status?: Database["public"]["Enums"]["status_listagem"] | null
          url_logo?: Json | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lojas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      moderacoes: {
        Row: {
          criado_em: string | null
          data_fim: string | null
          data_inicio: string | null
          id: string
          moderador_id: string | null
          motivo: string
          tipo: Database["public"]["Enums"]["tipo_listagem"]
          usuario_id: string | null
        }
        Insert: {
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          moderador_id?: string | null
          motivo: string
          tipo: Database["public"]["Enums"]["tipo_listagem"]
          usuario_id?: string | null
        }
        Update: {
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          moderador_id?: string | null
          motivo?: string
          tipo?: Database["public"]["Enums"]["tipo_listagem"]
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      moradia: {
        Row: {
          endereco: string
          id: string
          nome: string
        }
        Insert: {
          endereco: string
          id?: string
          nome: string
        }
        Update: {
          endereco?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      subcategorias: {
        Row: {
          ativo: boolean | null
          categoria_id: string | null
          descricao: string | null
          id: string
          meta_descricao: string | null
          meta_titulo: string | null
          nome: string
          palavras_chave: string[] | null
          slug: string
        }
        Insert: {
          ativo?: boolean | null
          categoria_id?: string | null
          descricao?: string | null
          id?: string
          meta_descricao?: string | null
          meta_titulo?: string | null
          nome: string
          palavras_chave?: string[] | null
          slug: string
        }
        Update: {
          ativo?: boolean | null
          categoria_id?: string | null
          descricao?: string | null
          id?: string
          meta_descricao?: string | null
          meta_titulo?: string | null
          nome?: string
          palavras_chave?: string[] | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategorias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          atualizado_em: string | null
          biografia: string | null
          celular: string | null
          cpf: string | null
          criado_em: string | null
          data_nascimento: string | null
          email: string
          excluido_em: string | null
          id: string
          moradia_id: string | null
          msg_whatsapp: string | null
          nome: string
          status: Database["public"]["Enums"]["tipo_usuario"]
          status_moradia: Database["public"]["Enums"]["status_listagem"] | null
          status_ufmg: Database["public"]["Enums"]["status_listagem"] | null
          url_imagem: Json | null
        }
        Insert: {
          atualizado_em?: string | null
          biografia?: string | null
          celular?: string | null
          cpf?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email: string
          excluido_em?: string | null
          id?: string
          moradia_id?: string | null
          msg_whatsapp?: string | null
          nome: string
          status: Database["public"]["Enums"]["tipo_usuario"]
          status_moradia?: Database["public"]["Enums"]["status_listagem"] | null
          status_ufmg?: Database["public"]["Enums"]["status_listagem"] | null
          url_imagem?: Json | null
        }
        Update: {
          atualizado_em?: string | null
          biografia?: string | null
          celular?: string | null
          cpf?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string
          excluido_em?: string | null
          id?: string
          moradia_id?: string | null
          msg_whatsapp?: string | null
          nome?: string
          status?: Database["public"]["Enums"]["tipo_usuario"]
          status_moradia?: Database["public"]["Enums"]["status_listagem"] | null
          status_ufmg?: Database["public"]["Enums"]["status_listagem"] | null
          url_imagem?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_moradia_id_fkey"
            columns: ["moradia_id"]
            isOneToOne: false
            referencedRelation: "moradia"
            referencedColumns: ["id"]
          },
        ]
      }
      validacoes: {
        Row: {
          analisado_em: string | null
          criado_em: string | null
          id: string
          mensagem: string | null
          status: Database["public"]["Enums"]["status_validacao"] | null
          tipo: Database["public"]["Enums"]["tipo_validacao"]
          url_documento: string
          usuario_id: string | null
        }
        Insert: {
          analisado_em?: string | null
          criado_em?: string | null
          id?: string
          mensagem?: string | null
          status?: Database["public"]["Enums"]["status_validacao"] | null
          tipo: Database["public"]["Enums"]["tipo_validacao"]
          url_documento: string
          usuario_id?: string | null
        }
        Update: {
          analisado_em?: string | null
          criado_em?: string | null
          id?: string
          mensagem?: string | null
          status?: Database["public"]["Enums"]["status_validacao"] | null
          tipo?: Database["public"]["Enums"]["tipo_validacao"]
          url_documento?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      condicao_listagem: "NOVO" | "SEMINOVO" | "USADO" | "DEFEITO"
      status_listagem: "ATIVA" | "INATIVA" | "DELETADA"
      status_validacao: "NENHUMA" | "PENDENTE" | "ATIVA" | "REJEITADA"
      tipo_categoria: "PRODUTO" | "SERVIÇO"
      tipo_listagem: "VENDA" | "ALUGUEL" | "DOACAO" | "TROCA"
      tipo_usuario: "EXTERNO" | "UFMG" | "RESIDENTE" | "ADMIN"
      tipo_validacao: "MORADIA" | "UFMG"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
