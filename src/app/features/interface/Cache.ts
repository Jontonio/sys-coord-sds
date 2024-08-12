import { AcademicProgram } from "./AcademicProgram";
import { ClassUnit } from "./ClassUnit";
import { InstitutionTeacher } from "./InstitutionTeacher";
import { Teacher } from "./Teacher";

interface CachePageTeacher {
  currentPage:number;
  startPage:number
  teachers:InstitutionTeacher[];
}

interface CachePageArea {
  currentPage:number;
  startPage:number
  areas:InstitutionTeacher[];
}

interface CacheAcademicProgram {
  currentPage: number;
  startPage: number
  academicProgram: AcademicProgram[];
}

interface CacheClassUnit {
  [key: string]: ClassUnit[];
}

export {
  CacheClassUnit,
  CachePageArea,
  CacheAcademicProgram,
  CachePageTeacher
}
