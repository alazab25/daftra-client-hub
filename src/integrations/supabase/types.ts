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
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          contact_type: string
          created_at: string
          display_name: string | null
          email: string | null
          external_id: string | null
          id: string
          is_blocked: boolean
          metadata: Json | null
          opt_in: boolean
          phone_number: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          contact_type: string
          created_at?: string
          display_name?: string | null
          email?: string | null
          external_id?: string | null
          id?: string
          is_blocked?: boolean
          metadata?: Json | null
          opt_in?: boolean
          phone_number: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          contact_type?: string
          created_at?: string
          display_name?: string | null
          email?: string | null
          external_id?: string | null
          id?: string
          is_blocked?: boolean
          metadata?: Json | null
          opt_in?: boolean
          phone_number?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      delivery_logs: {
        Row: {
          id: string
          logged_at: string
          outgoing_message_id: string
          status_after: Database["public"]["Enums"]["message_status"]
          status_before: Database["public"]["Enums"]["message_status"]
          status_reason: string | null
          webhook_data: Json | null
        }
        Insert: {
          id?: string
          logged_at?: string
          outgoing_message_id: string
          status_after: Database["public"]["Enums"]["message_status"]
          status_before: Database["public"]["Enums"]["message_status"]
          status_reason?: string | null
          webhook_data?: Json | null
        }
        Update: {
          id?: string
          logged_at?: string
          outgoing_message_id?: string
          status_after?: Database["public"]["Enums"]["message_status"]
          status_before?: Database["public"]["Enums"]["message_status"]
          status_reason?: string | null
          webhook_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_logs_outgoing_message_id_fkey"
            columns: ["outgoing_message_id"]
            isOneToOne: false
            referencedRelation: "outgoing_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          contact_id: string | null
          created_at: string
          event_data: Json
          event_type: Database["public"]["Enums"]["event_type"]
          external_event_id: string | null
          id: string
          source_system: string
          template_id: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          event_data: Json
          event_type: Database["public"]["Enums"]["event_type"]
          external_event_id?: string | null
          id?: string
          source_system: string
          template_id?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          event_data?: Json
          event_type?: Database["public"]["Enums"]["event_type"]
          external_event_id?: string | null
          id?: string
          source_system?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      incoming_messages: {
        Row: {
          contact_id: string | null
          created_at: string
          has_media: boolean
          id: string
          message_text: string | null
          received_at: string
          sender_phone: string
          whatsapp_account_id: string
          whatsapp_message_id: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          has_media?: boolean
          id?: string
          message_text?: string | null
          received_at: string
          sender_phone: string
          whatsapp_account_id: string
          whatsapp_message_id: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          has_media?: boolean
          id?: string
          message_text?: string | null
          received_at?: string
          sender_phone?: string
          whatsapp_account_id?: string
          whatsapp_message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "incoming_messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_messages_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_name: string
          created_at: string | null
          daftra_invoice_id: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string
          items: Json | null
          notes: string | null
          paid_amount: number
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          client_name: string
          created_at?: string | null
          daftra_invoice_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date: string
          items?: Json | null
          notes?: string | null
          paid_amount?: number
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          client_name?: string
          created_at?: string | null
          daftra_invoice_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          items?: Json | null
          notes?: string | null
          paid_amount?: number
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      media_files: {
        Row: {
          created_at: string
          download_url: string | null
          external_entity_id: string | null
          external_entity_type: string | null
          file_name: string | null
          file_size: number | null
          hash_sha256: string | null
          id: string
          incoming_message_id: string | null
          last_retry_at: string | null
          media_status: Database["public"]["Enums"]["media_status"]
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string | null
          retry_count: number
          status_message: string | null
          storage_path: string
          storage_provider: string
          tags: string[] | null
          updated_at: string
          whatsapp_media_id: string
        }
        Insert: {
          created_at?: string
          download_url?: string | null
          external_entity_id?: string | null
          external_entity_type?: string | null
          file_name?: string | null
          file_size?: number | null
          hash_sha256?: string | null
          id?: string
          incoming_message_id?: string | null
          last_retry_at?: string | null
          media_status?: Database["public"]["Enums"]["media_status"]
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          retry_count?: number
          status_message?: string | null
          storage_path: string
          storage_provider?: string
          tags?: string[] | null
          updated_at?: string
          whatsapp_media_id: string
        }
        Update: {
          created_at?: string
          download_url?: string | null
          external_entity_id?: string | null
          external_entity_type?: string | null
          file_name?: string | null
          file_size?: number | null
          hash_sha256?: string | null
          id?: string
          incoming_message_id?: string | null
          last_retry_at?: string | null
          media_status?: Database["public"]["Enums"]["media_status"]
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          retry_count?: number
          status_message?: string | null
          storage_path?: string
          storage_provider?: string
          tags?: string[] | null
          updated_at?: string
          whatsapp_media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_files_incoming_message_id_fkey"
            columns: ["incoming_message_id"]
            isOneToOne: false
            referencedRelation: "incoming_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          body_text: string
          buttons: Json
          created_at: string
          created_by: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          footer_text: string | null
          header_text: string | null
          id: string
          is_active: boolean
          language: string | null
          template_key: string
          template_name: string
          updated_at: string
          variables: Json
        }
        Insert: {
          body_text: string
          buttons?: Json
          created_at?: string
          created_by?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          template_key: string
          template_name: string
          updated_at?: string
          variables?: Json
        }
        Update: {
          body_text?: string
          buttons?: Json
          created_at?: string
          created_by?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          template_key?: string
          template_name?: string
          updated_at?: string
          variables?: Json
        }
        Relationships: [
          {
            foreignKeyName: "notification_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      outgoing_messages: {
        Row: {
          contact_id: string
          created_at: string
          created_by: string | null
          delivered_at: string | null
          error_reason: string | null
          event_id: string | null
          id: string
          max_retries: number
          message_status: Database["public"]["Enums"]["message_status"]
          next_retry_at: string | null
          read_at: string | null
          rendered_body: string
          rendered_buttons: Json | null
          retry_count: number
          status_changed_at: string | null
          template_id: string | null
          updated_at: string
          whatsapp_account_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          error_reason?: string | null
          event_id?: string | null
          id?: string
          max_retries?: number
          message_status?: Database["public"]["Enums"]["message_status"]
          next_retry_at?: string | null
          read_at?: string | null
          rendered_body: string
          rendered_buttons?: Json | null
          retry_count?: number
          status_changed_at?: string | null
          template_id?: string | null
          updated_at?: string
          whatsapp_account_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          error_reason?: string | null
          event_id?: string | null
          id?: string
          max_retries?: number
          message_status?: Database["public"]["Enums"]["message_status"]
          next_retry_at?: string | null
          read_at?: string | null
          rendered_body?: string
          rendered_buttons?: Json | null
          retry_count?: number
          status_changed_at?: string | null
          template_id?: string | null
          updated_at?: string
          whatsapp_account_id?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_messages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_messages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_messages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_messages_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          daftra_payment_id: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_method: string | null
          reference_number: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          daftra_payment_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          reference_number?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          daftra_payment_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          reference_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          daftra_client_id: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          daftra_client_id?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          daftra_client_id?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string | null
          daftra_project_id: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          progress: number | null
          start_date: string | null
          status: string
          tasks: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          daftra_project_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          progress?: number | null
          start_date?: string | null
          status?: string
          tasks?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          daftra_project_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          progress?: number | null
          start_date?: string | null
          status?: string
          tasks?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sync_logs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          records_synced: number | null
          started_at: string | null
          status: string
          sync_type: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          records_synced?: number | null
          started_at?: string | null
          status?: string
          sync_type: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          records_synced?: number | null
          started_at?: string | null
          status?: string
          sync_type?: string
        }
        Relationships: []
      }
      system_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string
          description: string | null
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_config_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_accounts: {
        Row: {
          access_token: string
          account_name: string
          business_account_id: string
          created_at: string
          id: string
          is_active: boolean
          phone_number: string
          phone_number_id: string
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          access_token: string
          account_name: string
          business_account_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          phone_number: string
          phone_number_id: string
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          access_token?: string
          account_name?: string
          business_account_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          phone_number?: string
          phone_number_id?: string
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      event_type:
        | "invoice_issued"
        | "order_status_changed"
        | "technician_assigned"
        | "payment_confirmed"
        | "appointment_scheduled"
      media_status: "received" | "fetched" | "stored" | "failed"
      media_type: "image" | "video" | "document" | "audio" | "file"
      message_status:
        | "created"
        | "queued"
        | "sent"
        | "delivered"
        | "read"
        | "failed"
      user_role: "owner" | "operator" | "viewer"
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
    Enums: {
      event_type: [
        "invoice_issued",
        "order_status_changed",
        "technician_assigned",
        "payment_confirmed",
        "appointment_scheduled",
      ],
      media_status: ["received", "fetched", "stored", "failed"],
      media_type: ["image", "video", "document", "audio", "file"],
      message_status: [
        "created",
        "queued",
        "sent",
        "delivered",
        "read",
        "failed",
      ],
      user_role: ["owner", "operator", "viewer"],
    },
  },
} as const
