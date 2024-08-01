import { Teacher } from "./Teacher";

export interface InstitutionTeacher {
  id_card: string;
  modular_code: string;
  updated_at: string;
  created_at: string;
  id_ie_teacher: number;
  teacher:Teacher;
}
