export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: number
          option1: string
          option2: string
          total: number | null
          votes1: number | null
          votes2: number | null
        }
        Insert: {
          id?: number
          option1: string
          option2: string
          total?: number | null
          votes1?: number | null
          votes2?: number | null
        }
        Update: {
          id?: number
          option1?: string
          option2?: string
          total?: number | null
          votes1?: number | null
          votes2?: number | null
        }
        Relationships: []
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
