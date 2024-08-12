import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Section } from '../../features/interface/Section';
import { ResHttp } from '../../features/interface/ResHttp';
import { Grade } from '../../features/interface/Grade';
import { AcademicCalendar } from '../../features/interface/AcademicCalendar';
import { AcademicProgram } from '../../features/interface/AcademicProgram';
import { Area } from '../../features/interface/Area';
import { College } from '../../features/interface/College';
import { Teacher } from '../../features/interface/Teacher';
import { InstitutionTeacher } from '../../features/interface/InstitutionTeacher';
import { TeacherArea } from '../../features/interface/TeacherArea';
import { User } from '../../features/interface/User';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { ClassUnit } from '../../features/interface/ClassUnit';
import { Unit } from '../../features/interface/Unit';


@Injectable({
    providedIn: 'root'
})
export class DbService {

  private cacheService = inject(CacheService);
  private URL:string;

  constructor(private http:HttpClient) {
    this.URL = environment.URL_BASE;
  }

  // End point API RENIEC
  getRENIEC(id_card: string) {
    return this.http.post<ResHttp>(`${this.URL}/api-query-reniec`, {id_card})
  }

  // Enpoint user
  addUser(data: User) {
    return this.http.post<ResHttp>(`${this.URL}/register-user`, data)
  }

  AsingRolesAndPermissionUser(id_user:number, data: any) {
    return this.http.post<ResHttp>(`${this.URL}/assign-user-role/${id_user}`, data)
  }

  // Endpoint sections
  addSection(data: Section) {
    return this.http.post<ResHttp>(`${this.URL}/register-section`, data)
  }

  getSections() {
    return this.http.get<ResHttp>(`${this.URL}/get-sections`)
  }


  // Endpoint grades
  addGrade(data: Grade) {
    return this.http.post<ResHttp>(`${this.URL}/register-grade`, data)
  }

  getGrades() {
    return this.http.get<ResHttp>(`${this.URL}/get-grades`)
  }

  // Endpoint academic calendars
  addAcademicCalendar(data: AcademicCalendar) {
    return this.http.post<ResHttp>(`${this.URL}/register-academic-calendar`, data)
  }
  getAcademicCalendars() {
    return this.http.get<ResHttp>(`${this.URL}/get-academic-calendars`)
  }
  getCurrentAcademicCalendar() {
    return this.http.get<ResHttp>(`${this.URL}/get-current-calendar-academic`)
  }

  // Endpoint academic program
  addAcademicProgram(data: AcademicProgram) {
    return this.http.post<ResHttp>(`${this.URL}/register-academic-program-from-ie`, data)
  }

  updateAcademicProgram(id_academic_program:number, data: AcademicProgram) {
    return this.http.patch<ResHttp>(`${this.URL}/update-academic-program/${id_academic_program}`, data)
  }

  getAcademicProgramsFromIE({ modular_code, page }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-academic-program-from-ie?modular_code=${modular_code}&page=${page}`).pipe(
      tap(res => this.cacheService.cacheAcademicProgram.academicProgram = res.data.data )
    )
  }

  // Endpoint areas
  addArea(data: Area) {
    return this.http.post<ResHttp>(`${this.URL}/register-area`, data)
  }
  getAreas() {
    return this.http.get<ResHttp>(`${this.URL}/get-areas`)
  }

  getAreasWithTeacherAndClassUnit({id_ie_teacher, id_unit}:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-areas-with-teacher-and-class-unit?id_ie_teacher=${id_ie_teacher}&id_unit=${id_unit}`).pipe(
      map(res => {
        return this.parseTreeDataArea(res);
      }),
      tap(res => this.cacheService.cacheClassUnit[`id-${id_unit}`] = res )
    )
  }

  getAreasWithTeachersAndClassUnitAll({ id_unit }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-areas-with-teacher-and-class-unit?id_unit=${id_unit}`).pipe(
      map(res => {
        return this.parseTreeDataArea(res);
      }),
      tap(res => this.cacheService.cacheClassUnit[`id-${id_unit}`] = res )
    )
  }

  // Endpoint college
  addCollege(data: College) {
    return this.http.post<ResHttp>(`${this.URL}/register-college`, data)
  }

  getTeacherByDocument(id_card:string) {
    return this.http.get<ResHttp>(`${this.URL}/get-teacher-by-document/${id_card}`)
  }

  getColleges() {
    return this.http.get<ResHttp>(`${this.URL}/get-colleges`)
  }

  //Enpoint Teacher
  addTeacher(data: Teacher) {
    return this.http.post<ResHttp>(`${this.URL}/register-teacher`, data)
  }

  //Enpoint Institution
  getInstitution(modular_code: string) {
    return this.http.get<ResHttp>(`${this.URL}/get-institution/${modular_code}`)
  }

  //Enpoint Institution Teacher
  addInstitutionTeacher(data: InstitutionTeacher) {
    return this.http.post<ResHttp>(`${this.URL}/register-institution-teacher`, data)
  }

  getInstitutionTeachers({ modular_code, pageIndex }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-teachers-from-ie?modular_code=${modular_code}&page=${pageIndex}`).pipe(
      tap( res => this.cacheService.cachePageTeacher.teachers = res.data.data)
    )
  }

  //Endpoint teache area
  addTeacherArea(data: TeacherArea) {
    return this.http.post<ResHttp>(`${this.URL}/register-teacher-area`, data)
  }

  getTeacherAreasFromIE({ modular_code, pageIndex }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-teachers-from-ie-assign?modular_code=${modular_code}&page=${pageIndex}`).pipe(
      tap( res => this.cacheService.cachePageArea.areas = res.data.data)
    )
  }

  //Endpoint class unit
  addClassUnit(data: any) {
    return this.http.post<ResHttp>(`${this.URL}/register-class-unit`, data)
  }

  updateVerifiedClassUnit(id_class_unit:number, data: ClassUnit) {
    return this.http.patch<ResHttp>(`${this.URL}/update-verified-class-unit/${id_class_unit}`, data)
  }

  //Endpoint unit
  addUnit(data: Unit) {
    return this.http.post<ResHttp>(`${this.URL}/register-unit`, data)
  }

  updateUnit(id_unit:number, data: Unit) {
    return this.http.patch<ResHttp>(`${this.URL}/update-unit/${id_unit}`, data)
  }

  deleteUnit(id_unit:number) {
    return this.http.delete<ResHttp>(`${this.URL}/delete-unit/${id_unit}`)
  }

  parseTreeDataArea (res: any) {
    return res.data.data.map((area: any) => ({
      value: { label: area.area_name },
      children: area.teacher_area.map((itemTeacherArea: any) => ({
        value: {
          label: `${itemTeacherArea.institution_teacher.teacher.names} ${itemTeacherArea.institution_teacher.teacher.first_name} "${itemTeacherArea.grade.grade_name} - ${itemTeacherArea.section.section_name}"`,
          id_teacher_area: itemTeacherArea.id_teacher_area
        },
        children: itemTeacherArea.class_unit.length > 0 ?
          itemTeacherArea.class_unit.map((unit: any) => ({
            value: { label: null, class_unit: unit },
            children: []
          }))
          : [
            {
              value: { label: 'No hay unidades registradas', class_unit: null },
              children: []
            }
          ]
      }))
    }));
  }


}
