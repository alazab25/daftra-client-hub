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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string | null
          description: string
          id: string
          new_value: string | null
          old_value: string | null
          project_id: string | null
          task_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          project_id?: string | null
          task_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          project_id?: string | null
          task_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_log_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_keys: {
        Row: {
          created_at: string | null
          deepseek_api_key: string | null
          github_token: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          deepseek_api_key?: string | null
          github_token?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          deepseek_api_key?: string | null
          github_token?: string | null
          id?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          assigned_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          description: string | null
          file_url: string
          id: string
          is_deleted: boolean | null
          request_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          description?: string | null
          file_url: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          description?: string | null
          file_url?: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_id: string
          id: number
          interests: string[] | null
          is_returning: boolean | null
          reward_preferences: Json | null
        }
        Insert: {
          client_id: string
          id?: number
          interests?: string[] | null
          is_returning?: boolean | null
          reward_preferences?: Json | null
        }
        Update: {
          client_id?: string
          id?: number
          interests?: string[] | null
          is_returning?: boolean | null
          reward_preferences?: Json | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          request_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coverage_cities: {
        Row: {
          city: string
          country: string
          id: number
          state: string | null
        }
        Insert: {
          city: string
          country: string
          id?: number
          state?: string | null
        }
        Update: {
          city?: string
          country?: string
          id?: number
          state?: string | null
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          created_at: string | null
          id: string
          token: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          token: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          token?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: never
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      history: {
        Row: {
          action: string | null
          details: string | null
          id: string
          request_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          details?: string | null
          id?: string
          request_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          details?: string | null
          id?: string
          request_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          discount: number | null
          grand_total: number | null
          id: string
          issued_by: string | null
          request_id: string | null
          tax: number | null
          total_cost: number | null
        }
        Insert: {
          created_at?: string | null
          discount?: number | null
          grand_total?: number | null
          id?: string
          issued_by?: string | null
          request_id?: string | null
          tax?: number | null
          total_cost?: number | null
        }
        Update: {
          created_at?: string | null
          discount?: number | null
          grand_total?: number | null
          id?: string
          issued_by?: string | null
          request_id?: string | null
          tax?: number | null
          total_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kv_store_2fc8ebc4: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      kv_store_cf418985: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          attachments: string[] | null
          building_type: string | null
          category: string | null
          change_log: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          daftera_invoice_id: string | null
          description: string | null
          id: string
          is_deleted: boolean | null
          issue_type: string | null
          location: string | null
          preferred_time: string | null
          primary_service_id: string | null
          priority: string | null
          requester_email: string | null
          requester_name: string | null
          requester_phone: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          technical_details: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          building_type?: string | null
          category?: string | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          daftera_invoice_id?: string | null
          description?: string | null
          id?: string
          is_deleted?: boolean | null
          issue_type?: string | null
          location?: string | null
          preferred_time?: string | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          technical_details?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          building_type?: string | null
          category?: string | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          daftera_invoice_id?: string | null
          description?: string | null
          id?: string
          is_deleted?: boolean | null
          issue_type?: string | null
          location?: string | null
          preferred_time?: string | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          technical_details?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_requests_archive: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_deleted: boolean | null
          primary_service_id: string | null
          priority: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_archive_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_primary_service_id_fkey"
            columns: ["primary_service_id"]
            isOneToOne: false
            referencedRelation: "maintenance_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_services: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          estimated_time: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_works: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_deleted: boolean | null
          notes: string | null
          price: number | null
          quantity: number | null
          request_date: string | null
          request_id: string | null
          start_date: string | null
          status: string | null
          technician_id: string | null
          title: string
          total: number | null
          updated_at: string | null
          work_type: string | null
          year: number | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title?: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_works_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_works_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      malls: {
        Row: {
          id: number
          location: string | null
          name: string
          type: string | null
        }
        Insert: {
          id: number
          location?: string | null
          name: string
          type?: string | null
        }
        Update: {
          id?: number
          location?: string | null
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      material_prices: {
        Row: {
          created_at: string | null
          currency: string | null
          effective_at: string | null
          id: string
          is_active: boolean | null
          market_status: string | null
          material_code: string
          name_ar: string
          name_en: string | null
          price_from: number | null
          price_to: number | null
          source: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          effective_at?: string | null
          id?: string
          is_active?: boolean | null
          market_status?: string | null
          material_code: string
          name_ar: string
          name_en?: string | null
          price_from?: number | null
          price_to?: number | null
          source?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          effective_at?: string | null
          id?: string
          is_active?: boolean | null
          market_status?: string | null
          material_code?: string
          name_ar?: string
          name_en?: string | null
          price_from?: number | null
          price_to?: number | null
          source?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      material_prices_backup_20251202: {
        Row: {
          created_at: string | null
          currency: string | null
          effective_at: string | null
          id: string | null
          is_active: boolean | null
          market_status: string | null
          material_code: string | null
          name_ar: string | null
          name_en: string | null
          price: number | null
          source: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          effective_at?: string | null
          id?: string | null
          is_active?: boolean | null
          market_status?: string | null
          material_code?: string | null
          name_ar?: string | null
          name_en?: string | null
          price?: number | null
          source?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          effective_at?: string | null
          id?: string | null
          is_active?: boolean | null
          market_status?: string | null
          material_code?: string | null
          name_ar?: string | null
          name_en?: string | null
          price?: number | null
          source?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      materials_markup_rules: {
        Row: {
          id: number
          percent: number
          position: number
          rate_card_id: string
          threshold_upper: number | null
        }
        Insert: {
          id?: number
          percent: number
          position: number
          rate_card_id: string
          threshold_upper?: number | null
        }
        Update: {
          id?: number
          percent?: number
          position?: number
          rate_card_id?: string
          threshold_upper?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "materials_markup_rules_rate_card_id_fkey"
            columns: ["rate_card_id"]
            isOneToOne: false
            referencedRelation: "rate_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          related_id: string | null
          related_type: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          created_by: string | null
          department_id: string | null
          email: string
          id: string
          is_deleted: boolean | null
          name: string
          position: string | null
          reports_to: string | null
          role: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          email: string
          id?: string
          is_deleted?: boolean | null
          name: string
          position?: string | null
          reports_to?: string | null
          role: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          email?: string
          id?: string
          is_deleted?: boolean | null
          name?: string
          position?: string | null
          reports_to?: string | null
          role?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      progress_updates: {
        Row: {
          id: string
          item_id: string
          item_type: string
          note: string | null
          progress: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          item_id: string
          item_type: string
          note?: string | null
          progress?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: string
          note?: string | null
          progress?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          file_url: string
          id: string
          name: string
          project_id: string
          size: number
          type: string
          uploaded_at: string
        }
        Insert: {
          file_url: string
          id?: string
          name: string
          project_id: string
          size: number
          type: string
          uploaded_at?: string
        }
        Update: {
          file_url?: string
          id?: string
          name?: string
          project_id?: string
          size?: number
          type?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_photos: {
        Row: {
          created_at: string | null
          file_name: string
          file_url: string
          id: string
          location: Json | null
          project_code: string
          uploaded_by: string | null
          work_type: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_url: string
          id?: string
          location?: Json | null
          project_code: string
          uploaded_by?: string | null
          work_type: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_url?: string
          id?: string
          location?: Json | null
          project_code?: string
          uploaded_by?: string | null
          work_type?: string
        }
        Relationships: []
      }
      project_progress: {
        Row: {
          completed_tasks: number | null
          created_at: string | null
          date: string | null
          id: string
          notes: string | null
          overall_progress: number | null
          project_id: string
          total_tasks: number | null
          updated_by: string | null
        }
        Insert: {
          completed_tasks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          overall_progress?: number | null
          project_id: string
          total_tasks?: number | null
          updated_by?: string | null
        }
        Update: {
          completed_tasks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          overall_progress?: number | null
          project_id?: string
          total_tasks?: number | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_progress_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_progress_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          area: string | null
          assigned_to: string | null
          budget: number | null
          category: string | null
          client_name: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          engineer_name: string | null
          gallery_images: string[] | null
          id: string
          image: string | null
          location: string | null
          main_image: string | null
          model3d_url: string | null
          name: string
          notes: string | null
          order_number: string | null
          overview_ar: string | null
          overview_en: string | null
          progress: number | null
          project_number: string | null
          slug: string | null
          specifications: Json | null
          start_date: string | null
          status: string | null
          tags: string | null
          title_ar: string | null
          title_en: string | null
          work_type: string | null
        }
        Insert: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          gallery_images?: string[] | null
          id?: string
          image?: string | null
          location?: string | null
          main_image?: string | null
          model3d_url?: string | null
          name: string
          notes?: string | null
          order_number?: string | null
          overview_ar?: string | null
          overview_en?: string | null
          progress?: number | null
          project_number?: string | null
          slug?: string | null
          specifications?: Json | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          title_ar?: string | null
          title_en?: string | null
          work_type?: string | null
        }
        Update: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          gallery_images?: string[] | null
          id?: string
          image?: string | null
          location?: string | null
          main_image?: string | null
          model3d_url?: string | null
          name?: string
          notes?: string | null
          order_number?: string | null
          overview_ar?: string | null
          overview_en?: string | null
          progress?: number | null
          project_number?: string | null
          slug?: string | null
          specifications?: Json | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          title_ar?: string | null
          title_en?: string | null
          work_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_cards: {
        Row: {
          created_at: string
          currency: string
          effective_from: string
          id: string
          materials_notes: string | null
          name: string
          vendor_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          effective_from?: string
          id?: string
          materials_notes?: string | null
          name: string
          vendor_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          effective_from?: string
          id?: string
          materials_notes?: string | null
          name?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_cards_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_items: {
        Row: {
          after_hours_hourly: number
          id: number
          min_billable_hours: number
          min_invoice: number | null
          normal_hourly: number
          notes: string | null
          rate_card_id: string
          trade_id: number
          trip_charge: number
        }
        Insert: {
          after_hours_hourly: number
          id?: number
          min_billable_hours: number
          min_invoice?: number | null
          normal_hourly: number
          notes?: string | null
          rate_card_id: string
          trade_id: number
          trip_charge?: number
        }
        Update: {
          after_hours_hourly?: number
          id?: number
          min_billable_hours?: number
          min_invoice?: number | null
          normal_hourly?: number
          notes?: string | null
          rate_card_id?: string
          trade_id?: number
          trip_charge?: number
        }
        Relationships: [
          {
            foreignKeyName: "rate_items_rate_card_id_fkey"
            columns: ["rate_card_id"]
            isOneToOne: false
            referencedRelation: "rate_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_items_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          request_id: string | null
          stars: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          stars?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          stars?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          code: string | null
          coordinates: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id: string
          is_active?: boolean | null
          level: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      request_status_log: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          is_deleted: boolean | null
          note: string | null
          request_id: string | null
          status: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_status_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          content: string
          created_at: string | null
          download_url: string | null
          expires_at: string | null
          id: number
          order_id: string
          reward_type: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          id?: number
          order_id: string
          reward_type: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          id?: number
          order_id?: string
          reward_type?: string
          title?: string
        }
        Relationships: []
      }
      service_assignments: {
        Row: {
          arrival_eta: string | null
          completed_at: string | null
          id: number
          notes: string | null
          request_id: string
          scheduled_at: string | null
          started_at: string | null
          technician_id: string | null
        }
        Insert: {
          arrival_eta?: string | null
          completed_at?: string | null
          id?: number
          notes?: string | null
          request_id: string
          scheduled_at?: string | null
          started_at?: string | null
          technician_id?: string | null
        }
        Update: {
          arrival_eta?: string | null
          completed_at?: string | null
          id?: number
          notes?: string | null
          request_id?: string
          scheduled_at?: string | null
          started_at?: string | null
          technician_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_assignments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_assignments_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          description_ar: string | null
          description_en: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string | null
          name_ar: string
          name_en: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          name_ar: string
          name_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          name_ar?: string
          name_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_request_trades: {
        Row: {
          id: number
          quantity: number
          request_id: string
          trade_id: number
        }
        Insert: {
          id?: number
          quantity?: number
          request_id: string
          trade_id: number
        }
        Update: {
          id?: number
          quantity?: number
          request_id?: string
          trade_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_request_trades_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_trades_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          attachment_urls: Json
          company_name: string | null
          created_at: string
          description: string
          email: string | null
          facilities_count: number | null
          id: string
          location_address: string | null
          location_id: string | null
          location_name: string | null
          location_phone: string | null
          phone: string | null
          priority: Database["public"]["Enums"]["priority_type"]
          requester_name: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          vendor_id: string | null
          website: string | null
        }
        Insert: {
          attachment_urls?: Json
          company_name?: string | null
          created_at?: string
          description: string
          email?: string | null
          facilities_count?: number | null
          id?: string
          location_address?: string | null
          location_id?: string | null
          location_name?: string | null
          location_phone?: string | null
          phone?: string | null
          priority?: Database["public"]["Enums"]["priority_type"]
          requester_name: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          vendor_id?: string | null
          website?: string | null
        }
        Update: {
          attachment_urls?: Json
          company_name?: string | null
          created_at?: string
          description?: string
          email?: string | null
          facilities_count?: number | null
          id?: string
          location_address?: string | null
          location_id?: string | null
          location_name?: string | null
          location_phone?: string | null
          phone?: string | null
          priority?: Database["public"]["Enums"]["priority_type"]
          requester_name?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          vendor_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      service_subcategories: {
        Row: {
          category_id: string
          code: string
          created_at: string | null
          description: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          is_active: boolean | null
          name: string | null
          name_ar: string
          name_en: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category_id: string
          code: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          name_ar: string
          name_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          code?: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          name_ar?: string
          name_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          estimated_cost: number | null
          estimated_duration: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          name_ar: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_duration?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_ar: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_duration?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_ar?: string
        }
        Relationships: []
      }
      sla_policies: {
        Row: {
          created_at: string
          onsite_hours: number
          priority: Database["public"]["Enums"]["priority_type"]
          response_hours: number
        }
        Insert: {
          created_at?: string
          onsite_hours: number
          priority: Database["public"]["Enums"]["priority_type"]
          response_hours: number
        }
        Update: {
          created_at?: string
          onsite_hours?: number
          priority?: Database["public"]["Enums"]["priority_type"]
          response_hours?: number
        }
        Relationships: []
      }
      spare_parts: {
        Row: {
          added_by: string | null
          created_at: string | null
          id: string
          part_name: string
          quantity: number | null
          request_id: string | null
          supplier: string | null
          total_price: number | null
          unit_price: number | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          id?: string
          part_name: string
          quantity?: number | null
          request_id?: string | null
          supplier?: string | null
          total_price?: number | null
          unit_price?: number | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          id?: string
          part_name?: string
          quantity?: number | null
          request_id?: string | null
          supplier?: string | null
          total_price?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "spare_parts_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      store_facades_gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_deleted: boolean | null
          phase: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_deleted?: boolean | null
          phase?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_deleted?: boolean | null
          phase?: string | null
        }
        Relationships: []
      }
      stores: {
        Row: {
          area: number | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_deleted: boolean | null
          location: string | null
          map_url: string | null
          name: string
          opening_date: string | null
          phone: string | null
          region_id: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name?: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      technician_schedule: {
        Row: {
          date: string
          id: string
          is_available: boolean | null
          request_id: string | null
          technician_id: string | null
          time_slot: string | null
        }
        Insert: {
          date: string
          id?: string
          is_available?: boolean | null
          request_id?: string | null
          technician_id?: string | null
          time_slot?: string | null
        }
        Update: {
          date?: string
          id?: string
          is_available?: boolean | null
          request_id?: string | null
          technician_id?: string | null
          time_slot?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_schedule_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_schedule_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      technicians: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_w2: boolean
          phone: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_w2?: boolean
          phone?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_w2?: boolean
          phone?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technicians_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          code: string
          id: number
          is_active: boolean
          name_ar: string | null
          name_en: string
          tier: Database["public"]["Enums"]["rate_tier"]
        }
        Insert: {
          code: string
          id?: number
          is_active?: boolean
          name_ar?: string | null
          name_en: string
          tier?: Database["public"]["Enums"]["rate_tier"]
        }
        Update: {
          code?: string
          id?: number
          is_active?: boolean
          name_ar?: string | null
          name_en?: string
          tier?: Database["public"]["Enums"]["rate_tier"]
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          image: string | null
          name: string | null
          provider: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
          provider?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
          provider?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vendor_contacts: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_primary: boolean
          phone: string | null
          role: Database["public"]["Enums"]["contact_role"]
          vendor_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_primary?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["contact_role"]
          vendor_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_primary?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["contact_role"]
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_contacts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_coverage: {
        Row: {
          city_id: number
          created_at: string
          vendor_id: string
        }
        Insert: {
          city_id: number
          created_at?: string
          vendor_id: string
        }
        Update: {
          city_id?: number
          created_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_coverage_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "coverage_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_coverage_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_insurance: {
        Row: {
          certificate_holder: string | null
          certificate_urls: Json
          created_at: string
          expires_at: string | null
          has_general_liability: boolean
          has_workers_comp: boolean
          id: string
          vendor_id: string
        }
        Insert: {
          certificate_holder?: string | null
          certificate_urls?: Json
          created_at?: string
          expires_at?: string | null
          has_general_liability?: boolean
          has_workers_comp?: boolean
          id?: string
          vendor_id: string
        }
        Update: {
          certificate_holder?: string | null
          certificate_urls?: Json
          created_at?: string
          expires_at?: string | null
          has_general_liability?: boolean
          has_workers_comp?: boolean
          id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_insurance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_members: {
        Row: {
          created_at: string
          role: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          role?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_members_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          city: string | null
          country: string
          created_at: string
          dba_name: string | null
          id: string
          is_active: boolean
          legal_name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          city?: string | null
          country?: string
          created_at?: string
          dba_name?: string | null
          id?: string
          is_active?: boolean
          legal_name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          city?: string | null
          country?: string
          created_at?: string
          dba_name?: string | null
          id?: string
          is_active?: boolean
          legal_name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      workflow_steps: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          notes: string | null
          request_id: string | null
          started_at: string | null
          status: string | null
          step_name: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: string | null
          step_name?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: string | null
          step_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_project_progress: {
        Args: { project_uuid: string }
        Returns: number
      }
      check_overdue_tasks: { Args: never; Returns: undefined }
      create_notification: {
        Args: {
          notification_message: string
          notification_title: string
          notification_type: string
          project_uuid: string
          task_uuid: string
          user_uuid: string
        }
        Returns: undefined
      }
      create_profile:
        | { Args: { profile_data: Json; user_id: number }; Returns: undefined }
        | {
            Args: { email: string; name: string; user_id: string }
            Returns: undefined
          }
      create_service_request_rpc: {
        Args: {
          p_company_name: string
          p_description: string
          p_email: string
          p_location_address: string
          p_location_name: string
          p_location_phone: string
          p_phone: string
          p_priority: Database["public"]["Enums"]["priority_type"]
          p_requester_name: string
          p_website?: string
        }
        Returns: string
      }
      get_archived_maintenance_dashboard: {
        Args: never
        Returns: {
          completed_requests: number
          high_priority_requests: number
          low_priority_requests: number
          medium_priority_requests: number
          pending_requests: number
          total_requests: number
        }[]
      }
      get_daily_summary: { Args: { report_date: string }; Returns: Json }
      insecure_function: { Args: never; Returns: string }
      is_admin_user: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      is_vendor_admin: { Args: { v: string }; Returns: boolean }
      is_vendor_member: { Args: { v: string }; Returns: boolean }
      log_activity: {
        Args: {
          action_description: string
          action_type: string
          new_val?: string
          old_val?: string
          project_uuid: string
          task_uuid: string
          user_uuid: string
        }
        Returns: undefined
      }
      secure_function: { Args: never; Returns: string }
    }
    Enums: {
      contact_role: "service" | "accounting" | "finance" | "owner"
      priority_type: "normal" | "emergency"
      rate_tier: "standard" | "specialty"
      request_status:
        | "new"
        | "triaged"
        | "scheduled"
        | "in_progress"
        | "done"
        | "cancelled"
      status_enum:
        | "active"
        | "inactive"
        | "new"
        | "in_progress"
        | "completed"
        | "pending"
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
      contact_role: ["service", "accounting", "finance", "owner"],
      priority_type: ["normal", "emergency"],
      rate_tier: ["standard", "specialty"],
      request_status: [
        "new",
        "triaged",
        "scheduled",
        "in_progress",
        "done",
        "cancelled",
      ],
      status_enum: [
        "active",
        "inactive",
        "new",
        "in_progress",
        "completed",
        "pending",
      ],
    },
  },
} as const
