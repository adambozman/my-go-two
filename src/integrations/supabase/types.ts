export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_generated_quizzes: {
        Row: {
          generated_at: string
          id: string
          quizzes: Json
          user_id: string
        }
        Insert: {
          generated_at?: string
          id?: string
          quizzes?: Json
          user_id: string
        }
        Update: {
          generated_at?: string
          id?: string
          quizzes?: Json
          user_id?: string
        }
        Relationships: []
      }
      card_templates: {
        Row: {
          category: string
          created_at: string
          default_fields: Json
          icon: string | null
          id: string
          is_system: boolean | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          default_fields?: Json
          icon?: string | null
          id?: string
          is_system?: boolean | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          default_fields?: Json
          icon?: string | null
          id?: string
          is_system?: boolean | null
          name?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          category: string | null
          created_at: string
          fields: Json
          id: string
          list_id: string
          template_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          fields?: Json
          id?: string
          list_id: string
          template_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          fields?: Json
          id?: string
          list_id?: string
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "card_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      couples: {
        Row: {
          created_at: string
          display_label: string | null
          id: string
          invitee_email: string | null
          invitee_id: string | null
          inviter_id: string
          photo_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_label?: string | null
          id?: string
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id: string
          photo_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_label?: string | null
          id?: string
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id?: string
          photo_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      custom_templates: {
        Row: {
          category: string
          created_at: string
          default_fields: Json
          id: string
          image_url: string | null
          name: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          default_fields?: Json
          id?: string
          image_url?: string | null
          name: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          default_fields?: Json
          id?: string
          image_url?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      image_blocklist: {
        Row: {
          created_at: string
          id: string
          path: string
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
        }
        Relationships: []
      }
      lists: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_shared: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_shared?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_shared?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          anniversary: string | null
          avatar_url: string | null
          birthday: string | null
          created_at: string
          display_name: string | null
          gender: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          anniversary?: string | null
          avatar_url?: string | null
          birthday?: string | null
          created_at?: string
          display_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          anniversary?: string | null
          avatar_url?: string | null
          birthday?: string | null
          created_at?: string
          display_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sharing_permissions: {
        Row: {
          brands: boolean
          couple_id: string
          created_at: string
          food_preferences: boolean
          gift_ideas: boolean
          id: string
          memories: boolean
          occasions: boolean
          partner_email: string
          partner_id: string
          saved_items: boolean
          sizes: boolean
          updated_at: string
          user_email: string
          user_id: string
          wish_list: boolean
        }
        Insert: {
          brands?: boolean
          couple_id: string
          created_at?: string
          food_preferences?: boolean
          gift_ideas?: boolean
          id?: string
          memories?: boolean
          occasions?: boolean
          partner_email: string
          partner_id: string
          saved_items?: boolean
          sizes?: boolean
          updated_at?: string
          user_email: string
          user_id: string
          wish_list?: boolean
        }
        Update: {
          brands?: boolean
          couple_id?: string
          created_at?: string
          food_preferences?: boolean
          gift_ideas?: boolean
          id?: string
          memories?: boolean
          occasions?: boolean
          partner_email?: string
          partner_id?: string
          saved_items?: boolean
          sizes?: boolean
          updated_at?: string
          user_email?: string
          user_id?: string
          wish_list?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sharing_permissions_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          ai_personalization: Json | null
          brands: Json | null
          created_at: string
          dislikes: Json | null
          favorites: Json | null
          id: string
          onboarding_complete: boolean | null
          places: Json | null
          profile_answers: Json | null
          style_preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_personalization?: Json | null
          brands?: Json | null
          created_at?: string
          dislikes?: Json | null
          favorites?: Json | null
          id?: string
          onboarding_complete?: boolean | null
          places?: Json | null
          profile_answers?: Json | null
          style_preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_personalization?: Json | null
          brands?: Json | null
          created_at?: string
          dislikes?: Json | null
          favorites?: Json | null
          id?: string
          onboarding_complete?: boolean | null
          places?: Json | null
          profile_answers?: Json | null
          style_preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          email_digests: boolean
          gift_reminders: boolean
          id: string
          partner_activity: boolean
          recommendations: boolean
          share_prefs: boolean
          share_wishlist: boolean
          updated_at: string
          user_id: string
          visible_profile: boolean
        }
        Insert: {
          created_at?: string
          email_digests?: boolean
          gift_reminders?: boolean
          id?: string
          partner_activity?: boolean
          recommendations?: boolean
          share_prefs?: boolean
          share_wishlist?: boolean
          updated_at?: string
          user_id: string
          visible_profile?: boolean
        }
        Update: {
          created_at?: string
          email_digests?: boolean
          gift_reminders?: boolean
          id?: string
          partner_activity?: boolean
          recommendations?: boolean
          share_prefs?: boolean
          share_wishlist?: boolean
          updated_at?: string
          user_id?: string
          visible_profile?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_shared_categories: {
        Args: { p_couple_id: string; p_viewer_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
