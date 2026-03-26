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
      ad_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          placement: string | null
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          placement?: string | null
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          placement?: string | null
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "sponsored_products"
            referencedColumns: ["id"]
          },
        ]
      }
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
      calendar_accounts: {
        Row: {
          access_token: string | null
          created_at: string
          id: string
          provider: string
          provider_account_email: string | null
          refresh_token: string | null
          scope: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          id?: string
          provider: string
          provider_account_email?: string | null
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          id?: string
          provider?: string
          provider_account_email?: string | null
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          connection_user_id: string | null
          created_at: string
          date: string
          description: string | null
          event_type: string
          id: string
          is_all_day: boolean
          source_type: string
          title: string
          user_id: string
        }
        Insert: {
          connection_user_id?: string | null
          created_at?: string
          date: string
          description?: string | null
          event_type?: string
          id?: string
          is_all_day?: boolean
          source_type?: string
          title: string
          user_id: string
        }
        Update: {
          connection_user_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          event_type?: string
          id?: string
          is_all_day?: boolean
          source_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      card_entries: {
        Row: {
          card_key: string
          created_at: string
          entry_name: string
          field_values: Json
          group_name: string
          id: string
          image_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          card_key: string
          created_at?: string
          entry_name: string
          field_values?: Json
          group_name: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          card_key?: string
          created_at?: string
          entry_name?: string
          field_values?: Json
          group_name?: string
          id?: string
          image_url?: string | null
          updated_at?: string
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
      category_bank_photos: {
        Row: {
          category_key: string
          created_at: string
          filename: string | null
          id: string
          image_url: string
        }
        Insert: {
          category_key: string
          created_at?: string
          filename?: string | null
          id?: string
          image_url: string
        }
        Update: {
          category_key?: string
          created_at?: string
          filename?: string | null
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      category_images: {
        Row: {
          category_key: string
          created_at: string
          gender: string
          id: string
          image_url: string
        }
        Insert: {
          category_key: string
          created_at?: string
          gender: string
          id?: string
          image_url: string
        }
        Update: {
          category_key?: string
          created_at?: string
          gender?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      category_registry: {
        Row: {
          created_at: string
          created_by: string | null
          fields: Json
          fill_in_fields: Json | null
          genders: string[]
          id: string
          image_prompt_female: string | null
          image_prompt_male: string | null
          image_prompt_nonbinary: string | null
          is_active: boolean
          is_shared: boolean
          is_system: boolean
          key: string
          label: string
          level: number
          page: string
          parent_key: string | null
          section: string
          shared_count: number
          sort_order: number
          subcategories: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          fields?: Json
          fill_in_fields?: Json | null
          genders: string[]
          id?: string
          image_prompt_female?: string | null
          image_prompt_male?: string | null
          image_prompt_nonbinary?: string | null
          is_active?: boolean
          is_shared?: boolean
          is_system?: boolean
          key: string
          label: string
          level?: number
          page: string
          parent_key?: string | null
          section: string
          shared_count?: number
          sort_order?: number
          subcategories?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          fields?: Json
          fill_in_fields?: Json | null
          genders?: string[]
          id?: string
          image_prompt_female?: string | null
          image_prompt_male?: string | null
          image_prompt_nonbinary?: string | null
          is_active?: boolean
          is_shared?: boolean
          is_system?: boolean
          key?: string
          label?: string
          level?: number
          page?: string
          parent_key?: string | null
          section?: string
          shared_count?: number
          sort_order?: number
          subcategories?: Json | null
        }
        Relationships: []
      }
      connection_context_preferences: {
        Row: {
          access_tier: string
          connection_kind: string
          connection_user_id: string
          couple_id: string
          created_at: string
          feature_gates: Json
          feed_enabled: boolean
          for_them_enabled: boolean
          gifting_enabled: boolean
          id: string
          occasion_tracking_enabled: boolean
          owner_user_id: string
          updated_at: string
        }
        Insert: {
          access_tier?: string
          connection_kind?: string
          connection_user_id: string
          couple_id: string
          created_at?: string
          feature_gates?: Json
          feed_enabled?: boolean
          for_them_enabled?: boolean
          gifting_enabled?: boolean
          id?: string
          occasion_tracking_enabled?: boolean
          owner_user_id: string
          updated_at?: string
        }
        Update: {
          access_tier?: string
          connection_kind?: string
          connection_user_id?: string
          couple_id?: string
          created_at?: string
          feature_gates?: Json
          feed_enabled?: boolean
          for_them_enabled?: boolean
          gifting_enabled?: boolean
          id?: string
          occasion_tracking_enabled?: boolean
          owner_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_context_preferences_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_recommendations: {
        Row: {
          access_tier: string
          connection_user_id: string
          couple_id: string
          created_at: string
          gate_key: string
          id: string
          occasion_date: string | null
          occasion_type: string | null
          recommendation_kind: string
          recommendation_scope: string
          recommendations: Json
          source_snapshot: Json
          status: string
          updated_at: string
          viewer_user_id: string
        }
        Insert: {
          access_tier?: string
          connection_user_id: string
          couple_id: string
          created_at?: string
          gate_key?: string
          id?: string
          occasion_date?: string | null
          occasion_type?: string | null
          recommendation_kind?: string
          recommendation_scope?: string
          recommendations?: Json
          source_snapshot?: Json
          status?: string
          updated_at?: string
          viewer_user_id: string
        }
        Update: {
          access_tier?: string
          connection_user_id?: string
          couple_id?: string
          created_at?: string
          gate_key?: string
          id?: string
          occasion_date?: string | null
          occasion_type?: string | null
          recommendation_kind?: string
          recommendation_scope?: string
          recommendations?: Json
          source_snapshot?: Json
          status?: string
          updated_at?: string
          viewer_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_recommendations_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_share_tokens: {
        Row: {
          channel: string
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
          owner_user_id: string
          token: string
          updated_at: string
          used_count: number
        }
        Insert: {
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          owner_user_id: string
          token?: string
          updated_at?: string
          used_count?: number
        }
        Update: {
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          owner_user_id?: string
          token?: string
          updated_at?: string
          used_count?: number
        }
        Relationships: []
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
      external_calendar_events: {
        Row: {
          calendar_account_id: string
          created_at: string
          description: string | null
          ends_at: string
          external_event_id: string
          id: string
          is_all_day: boolean
          last_synced_at: string
          location: string | null
          provider: string
          source_calendar_id: string | null
          source_calendar_name: string | null
          starts_at: string
          sync_status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calendar_account_id: string
          created_at?: string
          description?: string | null
          ends_at: string
          external_event_id: string
          id?: string
          is_all_day?: boolean
          last_synced_at?: string
          location?: string | null
          provider: string
          source_calendar_id?: string | null
          source_calendar_name?: string | null
          starts_at: string
          sync_status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calendar_account_id?: string
          created_at?: string
          description?: string | null
          ends_at?: string
          external_event_id?: string
          id?: string
          is_all_day?: boolean
          last_synced_at?: string
          location?: string | null
          provider?: string
          source_calendar_id?: string | null
          source_calendar_name?: string | null
          starts_at?: string
          sync_status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_calendar_events_calendar_account_id_fkey"
            columns: ["calendar_account_id"]
            isOneToOne: false
            referencedRelation: "calendar_accounts"
            referencedColumns: ["id"]
          },
        ]
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
      quiz_question_sets: {
        Row: {
          gender: string
          generated_at: string
          id: string
          questions: Json
        }
        Insert: {
          gender: string
          generated_at?: string
          id?: string
          questions?: Json
        }
        Update: {
          gender?: string
          generated_at?: string
          id?: string
          questions?: Json
        }
        Relationships: []
      }
      shared_card_entries: {
        Row: {
          card_entry_id: string
          connection_user_id: string
          couple_id: string
          created_at: string
          id: string
          owner_user_id: string
        }
        Insert: {
          card_entry_id: string
          connection_user_id: string
          couple_id: string
          created_at?: string
          id?: string
          owner_user_id: string
        }
        Update: {
          card_entry_id?: string
          connection_user_id?: string
          couple_id?: string
          created_at?: string
          id?: string
          owner_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_card_entries_card_entry_id_fkey"
            columns: ["card_entry_id"]
            isOneToOne: false
            referencedRelation: "card_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_card_entries_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_derived_features: {
        Row: {
          connection_user_id: string
          couple_id: string
          created_at: string
          feature_key: string
          id: string
          is_shared: boolean
          owner_user_id: string
          updated_at: string
        }
        Insert: {
          connection_user_id: string
          couple_id: string
          created_at?: string
          feature_key: string
          id?: string
          is_shared?: boolean
          owner_user_id: string
          updated_at?: string
        }
        Update: {
          connection_user_id?: string
          couple_id?: string
          created_at?: string
          feature_key?: string
          id?: string
          is_shared?: boolean
          owner_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_derived_features_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_profile_fields: {
        Row: {
          connection_user_id: string
          couple_id: string
          created_at: string
          field_key: string
          id: string
          is_shared: boolean
          owner_user_id: string
          updated_at: string
        }
        Insert: {
          connection_user_id: string
          couple_id: string
          created_at?: string
          field_key: string
          id?: string
          is_shared?: boolean
          owner_user_id: string
          updated_at?: string
        }
        Update: {
          connection_user_id?: string
          couple_id?: string
          created_at?: string
          field_key?: string
          id?: string
          is_shared?: boolean
          owner_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_profile_fields_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
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
      sponsored_products: {
        Row: {
          affiliate_url: string | null
          brand: string
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          hook: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          placement: string
          price: string | null
          priority: number
          start_date: string | null
          target_gender: string[] | null
          target_price_tiers: string[] | null
          target_style_keywords: string[] | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          why: string | null
        }
        Insert: {
          affiliate_url?: string | null
          brand: string
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          hook?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          placement?: string
          price?: string | null
          priority?: number
          start_date?: string | null
          target_gender?: string[] | null
          target_price_tiers?: string[] | null
          target_style_keywords?: string[] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          why?: string | null
        }
        Update: {
          affiliate_url?: string | null
          brand?: string
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          hook?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          placement?: string
          price?: string | null
          priority?: number
          start_date?: string | null
          target_gender?: string[] | null
          target_price_tiers?: string[] | null
          target_style_keywords?: string[] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          why?: string | null
        }
        Relationships: []
      }
      user_discovery_contacts: {
        Row: {
          created_at: string
          id: string
          phone_raw: string | null
          phone_search_normalized: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          phone_raw?: string | null
          phone_search_normalized?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          phone_raw?: string | null
          phone_search_normalized?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_discovery_settings: {
        Row: {
          allow_name_discovery: boolean
          allow_phone_discovery: boolean
          created_at: string
          id: string
          share_avatar_in_discovery: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          allow_name_discovery?: boolean
          allow_phone_discovery?: boolean
          created_at?: string
          id?: string
          share_avatar_in_discovery?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          allow_name_discovery?: boolean
          allow_phone_discovery?: boolean
          created_at?: string
          id?: string
          share_avatar_in_discovery?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      weekly_recommendations: {
        Row: {
          generated_at: string
          id: string
          products: Json
          updated_at: string
          user_id: string
          week_start: string
        }
        Insert: {
          generated_at?: string
          id?: string
          products?: Json
          updated_at?: string
          user_id: string
          week_start: string
        }
        Update: {
          generated_at?: string
          id?: string
          products?: Json
          updated_at?: string
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
        website_asset_assignments: {
          Row: {
            asset_key: string
            bank_photo_id: string
            created_at: string
            image_url: string
            id: string
            updated_at: string
            updated_by: string | null
          }
          Insert: {
            asset_key: string
            bank_photo_id: string
            created_at?: string
            image_url: string
            id?: string
            updated_at?: string
            updated_by?: string | null
          }
          Update: {
            asset_key?: string
            bank_photo_id?: string
            created_at?: string
            image_url?: string
            id?: string
            updated_at?: string
            updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_asset_assignments_bank_photo_id_fkey"
            columns: ["bank_photo_id"]
            isOneToOne: false
            referencedRelation: "category_bank_photos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      connection_can_view_card_entry: {
        Args: { p_card_entry_id: string; p_viewer_id: string }
        Returns: boolean
      }
      connection_can_view_derived_feature: {
        Args: {
          p_feature_key: string
          p_owner_user_id: string
          p_viewer_id: string
        }
        Returns: boolean
      }
      connection_can_view_profile_field: {
        Args: {
          p_field_key: string
          p_owner_user_id: string
          p_viewer_id: string
        }
        Returns: boolean
      }
      connection_kind_allows_occasion: {
        Args: { p_connection_kind: string; p_occasion_type: string }
        Returns: boolean
      }
      create_connection_invite_from_token: {
        Args: { p_token: string }
        Returns: {
          couple_id: string
          invitee_id: string
          inviter_id: string
          result: string
        }[]
      }
      create_connection_request: {
        Args: { p_target_user_id: string }
        Returns: {
          couple_id: string
          request_status: string
        }[]
      }
      get_connection_outgoing_sharing_state: {
        Args: { p_connection_user_id: string; p_couple_id: string }
        Returns: Json
      }
      get_connection_shared_profile: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: {
          anniversary: string
          avatar_url: string
          birthday: string
          display_name: string
        }[]
      }
      get_connection_shared_recommendations: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: {
          generated_at: string
          id: string
          products: Json
          week_start: string
        }[]
      }
      get_connection_shared_vibe: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: {
          persona_summary: string
        }[]
      }
      get_connection_visible_card_entries: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: {
          card_key: string
          entry_name: string
          field_values: Json
          group_name: string
          id: string
          image_url: string
          updated_at: string
          user_id: string
        }[]
      }
      get_shared_categories: {
        Args: { p_couple_id: string; p_viewer_id: string }
        Returns: Json
      }
      infer_card_entry_section: {
        Args: { p_card_key: string; p_entry_name: string; p_group_name: string }
        Returns: string
      }
      issue_connection_share_token: {
        Args: { p_channel?: string; p_days_valid?: number }
        Returns: {
          channel: string
          expires_at: string
          token: string
        }[]
      }
      next_annual_occurrence: {
        Args: { p_original_date: string }
        Returns: string
      }
      next_holiday_occurrence: {
        Args: { p_day: number; p_month: number }
        Returns: string
      }
      normalize_connection_kind: {
        Args: { p_connection_kind: string }
        Returns: string
      }
      search_discoverable_users: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          discovery_avatar_url: string
          display_name: string
          match_type: string
          user_id: string
        }[]
      }
      set_connection_card_share: {
        Args: {
          p_card_entry_id: string
          p_connection_user_id: string
          p_couple_id: string
          p_is_shared: boolean
        }
        Returns: undefined
      }
      set_connection_derived_feature_share: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_feature_key: string
          p_is_shared: boolean
        }
        Returns: undefined
      }
      set_connection_kind_preference: {
        Args: {
          p_connection_kind: string
          p_connection_user_id: string
          p_couple_id: string
        }
        Returns: undefined
      }
      set_connection_profile_field_share: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_field_key: string
          p_is_shared: boolean
        }
        Returns: undefined
      }
      share_all_card_entries_with_connection: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: number
      }
      unshare_all_card_entries_with_connection: {
        Args: {
          p_connection_user_id: string
          p_couple_id: string
          p_owner_user_id: string
        }
        Returns: number
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
