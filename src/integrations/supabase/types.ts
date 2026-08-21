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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          id: string
          metric: string
          threshold: number
          title: string
        }
        Insert: {
          description: string
          id: string
          metric: string
          threshold: number
          title: string
        }
        Update: {
          description?: string
          id?: string
          metric?: string
          threshold?: number
          title?: string
        }
        Relationships: []
      }
      concepts: {
        Row: {
          english: string
          id: string
          kannada: string
          kind: string
          lesson_id: number
          note: string
          order_index: number
          transliteration: string
          unit_id: number
        }
        Insert: {
          english: string
          id: string
          kannada: string
          kind?: string
          lesson_id: number
          note?: string
          order_index?: number
          transliteration: string
          unit_id: number
        }
        Update: {
          english?: string
          id?: string
          kannada?: string
          kind?: string
          lesson_id?: number
          note?: string
          order_index?: number
          transliteration?: string
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "concepts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concepts_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          id: number
          kind: string
          objective: string
          order_index: number
          title: string
          unit_id: number
        }
        Insert: {
          id: number
          kind?: string
          objective?: string
          order_index: number
          title: string
          unit_id: number
        }
        Update: {
          id?: number
          kind?: string
          objective?: string
          order_index?: number
          title?: string
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          daily_goal: number
          display_name: string
          goal: string
          id: string
          last_active_date: string | null
          level: string
          longest_streak: number
          onboarding_done: boolean
          script_mode: string
          streak: number
          support_level: string
          xp: number
        }
        Insert: {
          created_at?: string
          daily_goal?: number
          display_name?: string
          goal?: string
          id: string
          last_active_date?: string | null
          level?: string
          longest_streak?: number
          onboarding_done?: boolean
          script_mode?: string
          streak?: number
          support_level?: string
          xp?: number
        }
        Update: {
          created_at?: string
          daily_goal?: number
          display_name?: string
          goal?: string
          id?: string
          last_active_date?: string | null
          level?: string
          longest_streak?: number
          onboarding_done?: boolean
          script_mode?: string
          streak?: number
          support_level?: string
          xp?: number
        }
        Relationships: []
      }
      sections: {
        Row: {
          id: number
          order_index: number
          subtitle: string
          title: string
        }
        Insert: {
          id: number
          order_index: number
          subtitle?: string
          title: string
        }
        Update: {
          id?: number
          order_index?: number
          subtitle?: string
          title?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          id: number
          is_available: boolean
          order_index: number
          section_id: number
          subtitle: string
          title: string
        }
        Insert: {
          id: number
          is_available?: boolean
          order_index: number
          section_id: number
          subtitle?: string
          title: string
        }
        Update: {
          id?: number
          is_available?: boolean
          order_index?: number
          section_id?: number
          subtitle?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_attempts: {
        Row: {
          concept_id: string | null
          created_at: string
          exercise_type: string
          id: number
          result: string
          user_id: string
        }
        Insert: {
          concept_id?: string | null
          created_at?: string
          exercise_type: string
          id?: number
          result: string
          user_id: string
        }
        Update: {
          concept_id?: string | null
          created_at?: string
          exercise_type?: string
          id?: number
          result?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_attempts_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_concept_progress: {
        Row: {
          concept_id: string
          correct_count: number
          due_at: string
          incorrect_count: number
          last_seen_at: string
          mastery: number
          user_id: string
        }
        Insert: {
          concept_id: string
          correct_count?: number
          due_at?: string
          incorrect_count?: number
          last_seen_at?: string
          mastery?: number
          user_id: string
        }
        Update: {
          concept_id?: string
          correct_count?: number
          due_at?: string
          incorrect_count?: number
          last_seen_at?: string
          mastery?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_concept_progress_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_activity: {
        Row: {
          day: string
          exercises: number
          lessons: number
          user_id: string
          xp: number
        }
        Insert: {
          day: string
          exercises?: number
          lessons?: number
          user_id: string
          xp?: number
        }
        Update: {
          day?: string
          exercises?: number
          lessons?: number
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          best_accuracy: number
          last_completed_at: string
          lesson_id: number
          times_completed: number
          user_id: string
        }
        Insert: {
          best_accuracy?: number
          last_completed_at?: string
          lesson_id: number
          times_completed?: number
          user_id: string
        }
        Update: {
          best_accuracy?: number
          last_completed_at?: string
          lesson_id?: number
          times_completed?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mistakes: {
        Row: {
          concept_id: string
          created_at: string
          exercise_type: string
          resolved: boolean
          times: number
          user_id: string
        }
        Insert: {
          concept_id: string
          created_at?: string
          exercise_type?: string
          resolved?: boolean
          times?: number
          user_id: string
        }
        Update: {
          concept_id?: string
          created_at?: string
          exercise_type?: string
          resolved?: boolean
          times?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_mistakes_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
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
