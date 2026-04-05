import type { Database as GeneratedDatabase, Json } from "./types";

type TableDefinition<Row, Insert = Row, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type ViewDefinition<Row> = {
  Row: Row;
  Relationships: [];
};

type RuntimeResponseRow = {
  id: string;
  user_id: string;
  question_key: string;
  response_value: Json;
  created_at: string;
  updated_at: string;
};

type RuntimeSavedProductCardRow = {
  id: string;
  user_id: string;
  product_card_key: string;
  subcategory_label: string;
  card_title: string;
  field_values: Json;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type RuntimeSharedSavedProductCardRow = {
  id: string;
  user_connection_id: string;
  owner_user_id: string;
  connection_user_id: string;
  saved_product_card_id: string;
  created_at: string;
};

type RuntimeUserConnectionRow = {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  invitee_email: string | null;
  display_label: string | null;
  photo_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

type RuntimeConnectionAccessSettingsRow = {
  id: string;
  owner_user_id: string;
  connection_user_id: string;
  user_connection_id: string;
  connection_kind: string;
  access_tier: string;
  feed_enabled: boolean;
  occasion_tracking_enabled: boolean;
  for_them_enabled: boolean;
  gifting_enabled: boolean;
  feature_gates: Json;
  created_at: string;
  updated_at: string;
};

type RuntimeSharedConnectionProfileFieldRow = {
  id: string;
  owner_user_id: string;
  connection_user_id: string;
  user_connection_id: string;
  field_key: string;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
};

type RuntimeSharedConnectionDerivationRow = {
  id: string;
  owner_user_id: string;
  connection_user_id: string;
  user_connection_id: string;
  feature_key: string;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
};

type RuntimeUserSettingsRow = {
  created_at: string;
  email_digests: boolean;
  gift_reminders: boolean;
  id: string;
  connection_activity: boolean;
  recommendations: boolean;
  share_prefs: boolean;
  share_wishlist: boolean;
  updated_at: string;
  user_id: string;
  visible_profile: boolean;
};

type RuntimeKnowledgeDerivationRow = {
  id: string;
  user_id: string;
  derivation_key: string;
  derivation_payload: Json;
  source_snapshot: Json | null;
  created_at: string;
  updated_at: string;
};

type RuntimeKnowledgeFactRow = {
  user_id: string;
  fact_source: string;
  fact_key: string;
  fact_value: Json;
  recorded_at: string;
};

type RuntimeKnowledgeSnapshotRow = {
  user_id: string;
  profile_core: Json;
  onboarding_responses: Json;
  know_me_responses: Json;
  saved_product_cards: Json;
  user_connections: Json;
  snapshot_payload: Json;
  updated_at: string;
};

type RuntimePublicTables = {
  connection_access_settings: TableDefinition<
    RuntimeConnectionAccessSettingsRow,
    Omit<RuntimeConnectionAccessSettingsRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  know_me_responses: TableDefinition<
    RuntimeResponseRow,
    Omit<RuntimeResponseRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  onboarding_responses: TableDefinition<
    RuntimeResponseRow,
    Omit<RuntimeResponseRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  saved_product_cards: TableDefinition<
    RuntimeSavedProductCardRow,
    Omit<RuntimeSavedProductCardRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  shared_connection_derivations: TableDefinition<
    RuntimeSharedConnectionDerivationRow,
    Omit<RuntimeSharedConnectionDerivationRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  shared_connection_profile_fields: TableDefinition<
    RuntimeSharedConnectionProfileFieldRow,
    Omit<RuntimeSharedConnectionProfileFieldRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  shared_saved_product_cards: TableDefinition<
    RuntimeSharedSavedProductCardRow,
    Omit<RuntimeSharedSavedProductCardRow, "id" | "created_at"> & {
      id?: string;
      created_at?: string;
    }
  >;
  user_connections: TableDefinition<
    RuntimeUserConnectionRow,
    Omit<RuntimeUserConnectionRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
  user_settings: TableDefinition<
    RuntimeUserSettingsRow,
    Omit<RuntimeUserSettingsRow, "id" | "created_at" | "updated_at"> & {
      id?: string;
      created_at?: string;
      updated_at?: string;
    }
  >;
};

type RuntimePublicViews = {
  user_knowledge_derivations: ViewDefinition<RuntimeKnowledgeDerivationRow>;
  user_knowledge_facts: ViewDefinition<RuntimeKnowledgeFactRow>;
  user_knowledge_snapshots: ViewDefinition<RuntimeKnowledgeSnapshotRow>;
};

type RuntimePublicFunctions = {
  create_connection_invite_from_token: {
    Args: { p_token: string };
    Returns: {
      user_connection_id: string;
      invitee_id: string;
      inviter_id: string;
      result: string;
    }[];
  };
  create_connection_request: {
    Args: { p_target_user_id: string };
    Returns: {
      user_connection_id: string;
      request_status: string;
    }[];
  };
  follow_public_creator: {
    Args: { p_creator_user_id: string };
    Returns: undefined;
  };
  get_connection_visible_saved_product_cards: {
    Args: {
      p_connection_user_id: string;
      p_owner_user_id: string;
      p_user_connection_id: string;
    };
    Returns: RuntimeSavedProductCardRow[];
  };
  share_all_saved_product_cards_with_connection: {
    Args: {
      p_connection_user_id: string;
      p_owner_user_id: string;
      p_user_connection_id: string;
    };
    Returns: number;
  };
  share_saved_product_card_with_connection: {
    Args: {
      p_connection_user_id: string;
      p_is_shared: boolean;
      p_saved_product_card_id: string;
      p_user_connection_id: string;
    };
    Returns: undefined;
  };
  toggle_public_entity_reaction: {
    Args: {
      p_published_entity_id: string;
      p_reaction_type: string;
    };
    Returns: undefined;
  };
  unfollow_public_creator: {
    Args: { p_creator_user_id: string };
    Returns: undefined;
  };
  unshare_all_saved_product_cards_with_connection: {
    Args: {
      p_connection_user_id: string;
      p_owner_user_id: string;
      p_user_connection_id: string;
    };
    Returns: number;
  };
  unshare_saved_product_card_with_connection: {
    Args: {
      p_connection_user_id: string;
      p_is_shared: boolean;
      p_saved_product_card_id: string;
      p_user_connection_id: string;
    };
    Returns: undefined;
  };
};

type RuntimePublicSchema = Omit<
  GeneratedDatabase["public"],
  "Tables" | "Views" | "Functions"
> & {
  Tables: Omit<GeneratedDatabase["public"]["Tables"], "user_settings"> & RuntimePublicTables;
  Views: GeneratedDatabase["public"]["Views"] & RuntimePublicViews;
  Functions: Omit<
    GeneratedDatabase["public"]["Functions"],
    "create_connection_invite_from_token" | "create_connection_request"
  > &
    RuntimePublicFunctions;
};

export type Database = Omit<GeneratedDatabase, "public"> & {
  public: RuntimePublicSchema;
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof DatabaseWithoutInternals, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer Row;
    }
    ? Row
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer Row;
      }
      ? Row
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer Insert;
    }
    ? Insert
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer Insert;
      }
      ? Insert
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer Update;
    }
    ? Update
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer Update;
      }
      ? Update
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export { Json };

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

// Codebase classification: runtime Supabase schema overlay for canonical Knowledge Center names.
