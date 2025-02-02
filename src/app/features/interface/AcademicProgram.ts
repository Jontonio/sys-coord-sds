import { AcademicCalendar } from "./AcademicCalendar";
import { Unit } from "./Unit";

export interface AcademicProgram {
  id_academic_program: number;
  academic_program_bim: string;
  academic_program_start: string;
  academic_program_finish: string;
  status: string;
  modular_code: string;
  id_academic_calendar: number;
  unit:Unit[],
  academic_calendar:AcademicCalendar;
  created_at: string;
  updated_at: string;
}
