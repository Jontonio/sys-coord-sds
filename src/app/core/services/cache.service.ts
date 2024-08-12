import { Injectable } from "@angular/core";
import { AcademicCalendar } from "../../features/interface/AcademicCalendar";
import { CacheAcademicProgram, CacheClassUnit, CachePageArea, CachePageTeacher } from "../../features/interface/Cache";
import { InstitutionTeacher } from "../../features/interface/InstitutionTeacher";
import { Institution } from "../../features/interface/Institutions";


@Injectable({
    providedIn:'root',
})
export class CacheService {

    private institution!: Institution;
    private currectAcademicCalendar!: AcademicCalendar;
    private code_modular_user: string | null;
    private id_ie_teacher: number | null;
    public cachePageTeacher: CachePageTeacher;
    public cachePageArea: CachePageArea;
    public cacheClassUnit: CacheClassUnit;
    public cacheAcademicProgram: CacheAcademicProgram;


    constructor(){

      this.code_modular_user = null;
      this.id_ie_teacher = null;

      this.cachePageTeacher = {
        currentPage: 1,
        startPage: 0,
        teachers: [],
      }

      this.cacheAcademicProgram = {
        currentPage: 1,
        startPage: 0,
        academicProgram: [],
      }

      this.cachePageArea = {
        currentPage: 1,
        startPage: 0,
        areas: [],
      }

      this.cacheClassUnit = {}
    }

    setInstitution(institution:Institution){
      this.institution = institution;
    }

    getInstitution(){
      return this.institution;
    }

    setIdIETeacher(id_ie_teacher:number){
      this.id_ie_teacher = id_ie_teacher;
    }

    getIdIETeacher(){
      return this.id_ie_teacher;
    }

    setCodeModularUser(code:string){
      this.code_modular_user = code;
    }

    getCodeModularUser(){
      return this.code_modular_user;
    }

    setCurrectAcademicCalendar(data: AcademicCalendar) {
      this.currectAcademicCalendar = data;
    }

    getAcademicCalendar() {
      return this.currectAcademicCalendar;
    }

    saveSessionStorage(key:string, data:string){
        sessionStorage.setItem(key, data);
    }

    removeSessionStorage(key:string){
        sessionStorage.removeItem(key);
    }

    getSessionStorage(key:string){
        return sessionStorage.getItem(key);
    }

    saveLocalStorage(key:string, data:string){
        localStorage.setItem(key, data);
    }

    removeLocalStorage(key:string){
        localStorage.removeItem(key);
    }

    getLocalStorage(key:string){
        return localStorage.getItem(key);
    }

}
