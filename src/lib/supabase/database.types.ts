// Tipos manuales que reflejan supabase/migrations/*_create_androids_schema.sql.
// Una vez que el proyecto esté linkeado (`supabase link`), reemplazar por:
//   npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
import type { AndroidCategory, AndroidSpec } from "@/types/android";

type NoRelationships = { Relationships: [] };

type BelongsToAndroid = {
  Relationships: [
    {
      foreignKeyName: "android_id_fkey";
      columns: ["android_id"];
      isOneToOne: false;
      referencedRelation: "androids";
      referencedColumns: ["id"];
    },
  ];
};

export interface Database {
  public: {
    Tables: {
      androids: {
        Row: {
          id: string;
          code: string;
          name: string;
          model: string;
          slug: string;
          category: AndroidCategory;
          function_title: string;
          short_description: string;
          long_description: string;
          personality: string;
          quote: string | null;
          purchase_price: number;
          leasing_monthly: number | null;
          currency: string;
          purchase_available: boolean;
          leasing_available: boolean;
          stock: number;
          height_m: number | null;
          weight_kg: number | null;
          autonomy_hours: number | null;
          max_assistance_kg: number | null;
          voice_recognition: string | null;
          social_interaction: string | null;
          connectivity: string | null;
          sanitary_limit: string | null;
          requires_specialized_install: boolean;
          main_image_url: string | null;
          specs: AndroidSpec[];
          featured: boolean;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["androids"]["Row"]> & {
          code: string;
          name: string;
          model: string;
          slug: string;
          category: AndroidCategory;
          function_title: string;
          short_description: string;
          long_description: string;
          personality: string;
          purchase_price: number;
        };
        Update: Partial<Database["public"]["Tables"]["androids"]["Row"]>;
      } & NoRelationships;
      android_capabilities: {
        Row: {
          id: string;
          android_id: string;
          title: string;
          description: string;
          sort_order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["android_capabilities"]["Row"]> & {
          android_id: string;
          title: string;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["android_capabilities"]["Row"]>;
      } & BelongsToAndroid;
      android_gallery: {
        Row: {
          id: string;
          android_id: string;
          url: string;
          alt: string;
          sort_order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["android_gallery"]["Row"]> & {
          android_id: string;
          url: string;
        };
        Update: Partial<Database["public"]["Tables"]["android_gallery"]["Row"]>;
      } & BelongsToAndroid;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
