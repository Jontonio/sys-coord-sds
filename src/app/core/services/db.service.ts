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

@Injectable({
    providedIn: 'root'
})
export class DbService {

  public URL:string;

  constructor(private http:HttpClient) {
    this.URL = environment.URL_BASE;
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
  getAcademicProgramsFromIE({ modular_code, id_academic_calendar }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-academic-program-from-ie?modular_code=${modular_code}&id_academic_calendar=${id_academic_calendar}`)
  }

  // Endpoint areas
  addArea(data: Area) {
    return this.http.post<ResHttp>(`${this.URL}/register-area`, data)
  }
  getAreas() {
    return this.http.get<ResHttp>(`${this.URL}/get-areas`)
  }

  // Endpoint college
  addCollege(data: College) {
    return this.http.post<ResHttp>(`${this.URL}/register-college`, data)
  }

  getColleges() {
    return this.http.get<ResHttp>(`${this.URL}/get-colleges`)
  }

  //Enpoint Teacher
  addTeacher(data: Teacher) {
    return this.http.post<ResHttp>(`${this.URL}/register-teacher`, data)
  }

  //Enpoint Institution Teacher
  addInstitutionTeacher(data: InstitutionTeacher) {
    return this.http.post<ResHttp>(`${this.URL}/register-institution-teacher`, data)
  }

  getInstitutionTeachers({ modular_code }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-teachers-from-ie?modular_code=${modular_code}`)
  }

  //Endpoint teache area
  addTeacherArea(data: TeacherArea) {
    return this.http.post<ResHttp>(`${this.URL}/register-teacher-area`, data)
  }

  getTeacherAreasFromIE({ modular_code }:any) {
    return this.http.get<ResHttp>(`${this.URL}/get-teachers-from-ie-assign?modular_code=${modular_code}`)
  }


}
